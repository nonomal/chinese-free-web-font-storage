---
index: 20
title: 字体分包性能优化：多线程与 WebAssembly 的完美结合
description: >-
  在 4.0 版本中，cn-font-split 通过多线程和 WebAssembly 技术将字体分包时间从 19s 缩短至
  5s，实现了跨平台兼容。了解我们如何利用 Harfbuzz（WASM）和多线程优化提升性能，探索 Nodejs、Deno、Browser 的兼容性解决方案。
article:
  authors:
    - 江夏尧
  section: 技术内幕
  tags:
    - 性能优化
  pubDate: 2023-5-23
  image: >-
    https://ik.imagekit.io/chinesefonts/tr:w-1200/image/photo-1508804185872-d7badad00f7d.jfif
---
# Font Subsetting Performance Optimization: The Perfect Combination of Multithreading and WebAssembly

In version 4.0, we have implemented multithreading and WebAssembly-based plugins, reducing our subsetting time from the original 19s to 5s. Additionally, we have achieved cross-platform universality through some special operations. So, how did we achieve these functionalities?

## Harfbuzz (WASM) for Font Subsetting

In version 3.0, we used the JavaScript plugin fonteditor-core for font file parsing, which was a slow process. The parsing process encountered special font situations, leading to certain bugs. Therefore, we searched for a solution in the GitHub community that possessed performance, professionalism, and compatibility.

After a long search, we found the Harfbuzz project, an open-source repository written in C++ for parsing font files and rendering them across various platforms. The Wasm version of Harfbuzz played a crucial role in cn-font-split by parsing font files, obtaining the Unicode coverage range within the font, and directly generating subset files.

The project provided a Wasm packaged product with subset functionality, but the JS binding was manually written, and there were many missing TS types. Therefore, we performed secondary encapsulation, integrating the APIs exported by Wasm into an object-oriented library, making it easy to call in our project. Additionally, because we needed to read certain font properties that were not exported during subset functionality, we directly modified the original project to make it compatible with more functionalities, despite the headache-inducing C++ code 😂.

## Multithreading Optimization

By leveraging the advantages of multiple CPU cores, we transformed the slowest steps into multithreaded operations, resulting in extremely fast parallel packaging!

### Why is Multithreading so Fast?

JS multithreading consists of multiple Workers, generated, operated, and destroyed by a thread pool in the main thread.

1. Each Worker holds the same code and can also use WebAssembly.
2. Each thread runs independently without blocking the main thread.
3. Each thread is allocated to a separate CPU for computation, maximizing the advantages of multiple cores.

With these advantages, simply allocating long, computationally intensive functions to Worker threads in a multi-core scenario significantly reduces the overall time.

### Which Part of the Project Did Multithreading Optimize?

Firstly, in the single-threaded version, we observed that the woff2 library's compression of TTF fonts into woff2 fonts was very slow, taking about 500ms each time, while the subset parsing only took 5ms each time 😂. Therefore, a significant amount of time was consumed in this serial process. By leveraging the multi-core capabilities of the CPU, the speed could be greatly improved.

So, we directly embedded this part of the code in the Worker thread and, through the encapsulation of the workerpool library, simplified the logic into a function for use by the main thread. In the main thread, a single call is made and the binary data is passed to achieve multithreaded calling. The workerpool handles automatic thread allocation, communication data encapsulation, and automatic thread destruction, allowing for some well-deserved rest 🍻.

In the code, we used the transferable method to **transfer binary** instead of the default **copying binary**. This is because the data of the TTF file is no longer needed in the main thread and can be transferred. Similarly, the resulting binary data generated in the thread is also not needed internally and can be transferred. Transferring binary data directly can save some memory and avoid the embarrassment of running out of memory in extreme cases.

```ts
const transferred: Uint8Array = await service.pool.exec('convert', [buffer, targetType], {
    transfer: [buffer.buffer], // transfer buffer
});
```

### Interesting Aspects of Multithreading

1. Multithreading is not necessarily faster than single-threading: I once encapsulated the 5ms function into multithreading and found that the total time for creating threads and transferring thread data reached 1.5s each time 😂. For non-computationally intensive functions, the main thread is sufficient.
2. Data returned to the main thread from multithreading will block: Multithreading does not block, but the returned data will. Your main thread is only one, so if a large amount of data is returned in a very short time, it still needs to be processed serially, which can make multithreading even more time-consuming than single-threading.
3. Javascript's memory sharing solution, SharedArrayBuffer, requires special cross-origin settings and is not supported by some browsers. For compatibility reasons, we did not use it.
4. Creating workers in the browser requires strict same-origin policies and does not allow worker scripts to be cross-origin. However, the `importScripts` and `import` of workers can import cross-origin scripts, so we added an extra layer of encapsulation for browser compatibility 😂.

## Powerful Compatibility

cn-font-split achieves compatibility across Node.js, Deno, and the browser platforms, with no significant performance degradation!

### Considerations for Each Platform

Considering that the focus of front-end engineering is on the Node.js side, developers naturally have the option to quickly install cn-font-split via npm. On the browser side, developers can use it anywhere. When you only need to subset a font file, you certainly don't want to write a long string of code. Deno, on the other hand, is an emerging runtime that is slightly faster than Node.js and follows browser standards, making it convenient for porting, so we made it compatible as well.

### File System Compatibility

The usage of the file system varies across different platforms, with Node using fs, Deno using Deno fileSystem API, and the browser only having the option of fetching remote files. Additionally, there are some special considerations when requesting files. WebAssembly projects generally automatically generate loading files, requiring the use of the file system to obtain the wasm file, which also needs to be compatible. Therefore, we directly encapsulated the loading process that needs to be adapted to ensure that the same API can be used to load and store data in the project.

1. Determining the Runtime Environment

Determining the runtime environment is the basis for compatibility. By distinguishing between Node.js and Deno and then making calls to their respective file systems, a lot of unnecessary overhead can be saved. File system paths and URLs are two ways of representing resource storage locations, but the browser only supports URLs, so conversion is necessary based on the environment.

2. Using AssetsMap for Unified File Retrieval

AssetsMap retrieves the actual path based on the proxy name, combines compatibility APIs to perform file retrieval and storage operations, and discards the logic of representing files using lengthy path strings, simplifying the path representation with an alias. This, combined with TypeScript type declarations, ensures the correctness of the paths.

In terms of adaptation, by exposing the modified mapping relationships externally, the program can replace files with network paths using the HTTP protocol in the browser, achieving compatibility with the browser.

```ts
/** Asynchronously import local data */
class AssetsMap {
    //...
    async loadFileAsync(token: K | string): Promise<Uint8Array> {
        const targetPath = this.ensureGet(token);
        if (isNode) {
            const {
                promises: { readFile },
            } = await import('fs');
            return readFile(await resolveNodeModule(targetPath)).then((res) => {
                return new Uint8Array(res.buffer);
            });
        } else if (
            isBrowser ||
            isInWorker ||
            ['https://', 'http://'].some((i) => targetPath.startsWith(i))
        ) {
            return this.loadFileResponse(token)
                .then((res) => res.arrayBuffer())
                .then((res) => new Uint8Array(res));
        } else if (isDeno) {
            return Deno.readFile(targetPath);
        }
        throw new Error('loadFileAsync adaptation failed');
    }
    //...
}
// Assets is an instance of AssetsMap, and the following directly modifies the corresponding configuration
Assets.redefine({
    'hb-subset.wasm': root + '/dist/browser/hb-subset.wasm',
    'cn_char_rank.dat': root + '/dist/browser/cn_char_rank.dat',
    'unicodes_contours.dat': root + '/dist/browser/unicodes_contours.dat',
});
```

### Adapting for Special APIs

Node.js lacks a lot of Web APIs such as fetch and location, while Deno lacks support for XHR and classic worker, and the browser, although more comprehensive, lacks crypto encryption. These situations require developers to polyfill to ensure normal operation across multiple platforms.

For example, to address the inconsistency of workers, cn-font-split used the workerpool plugin and performed a conversion from classic worker to module worker during packaging. For missing APIs like fetch and XHR, we exported objects from the modules and assigned them to globalThis to resolve the issue. For the lack of crypto, we used alternative algorithm implementation libraries.

Overall, compatibility is a troublesome matter that requires a lot of operations to achieve good results. Throughout this process, a skilled awareness and rich experience with environments and library applications are necessary to avoid causing bugs in the entire program.

## Conclusion

The process of exploring performance optimization is arduous, but it has also been the fastest-growing journey for me. This journey has given me the opportunity to explore the complete JavaScript ecosystem, delve into unfamiliar multithreading programming, and enter the field of font optimization. This article does not cover the entire optimization history of 4.0, and more details about the 4.0 optimizations can be savored in the source code.

