---
index: 20
title: "Font Subpack Performance Optimization: The Perfect Combination of Multithreading and WebAssembly"
description: "In version 4.0, cn-font-split reduced font subpack time from 19s to 5s using multithreading and WebAssembly technology, achieving cross-platform compatibility. Learn how we utilized Harfbuzz (WASM) and multithreading optimizations to enhance performance, and explore compatibility solutions for Nodejs, Deno, and Browser."
article:
    authors:
        - "KonghaYao"
    section: "Technical Insights"
    tags:
        - "Performance Optimization"
    pubDate: 2023-05-23
    image: "https://ik.imagekit.io/chinesefonts/tr:w-1200/image/photo-1508804185872-d7badad00f7d.jfif"
---

# Font Subpack Performance Optimization: The Perfect Combination of Multithreading and WebAssembly

In version 4.0, we adopted multithreading and WebAssembly-based plugins, reducing our packaging time from 19s to 5s while achieving cross-platform compatibility through special operations. So, how did we achieve these functionalities?

## Harfbuzz (WASM) for Font Subpacking

In version 3.0, we used the JavaScript plugin fonteditor-core to parse font files, a slow process that encountered bugs due to special font cases. Therefore, we searched the GitHub community for a solution that combined performance, professionalism, and compatibility.

After much effort, we found the Harfbuzz project, an open-source repository written in C++ that parses and renders font files across platforms. The Wasm version of Harfbuzz plays a crucial role in cn-font-split, handling font file parsing, retrieving the Unicode coverage within fonts, and directly generating subpack files.

This project provides a Wasm packaging product that includes subset functionality, but the JS binding was manually written, and many TS types were missing. So we implemented a secondary encapsulation, integrating the exported APIs from Wasm into an object-oriented library file for easy use in our project. Additionally, we needed to read certain properties of the font, which were not exported in the subset functionality, so we modified the original project (exploring the C++ code is quite a headache 😂) to be compatible with more features.

## Multithreading Optimization

By leveraging multiple CPU cores, we transformed the slowest steps into multithreaded operations, significantly speeding up the packaging process!

### Why is Multithreading So Fast?

JS multithreading consists of multiple Workers, generated, operated, and destroyed by a thread pool from the main thread.

1. Each Worker uses the same code and can also utilize WebAssembly;
2. Each thread runs independently without blocking the main thread;
3. Each thread will be assigned to an independent CPU for computation, maximizing the benefits of multi-core processors.

With these advantages, we can assign long-running, heavy computational functions to Worker threads, allowing multiple time-consuming tasks to proceed simultaneously in multicore scenarios, reducing total time.

### Which Parts of the Project Were Optimized with Multithreading?

Firstly, in the single-threaded version, we observed that the woff2 library took a very long time to compress ttf fonts into woff2 formats, about 500ms each time, while parsing subpacks only took 5ms 😂. Much time was consumed in this serial process, so we aimed to utilize the multi-core features of the CPU to boost speed.

We embedded this part of the code directly into Worker threads and simplified the logic to a single function for the main thread using the workerpool library. The main thread simply calls it once and passes binary data, achieving multithreading. The workerpool library automates thread allocation, data encapsulation, and thread destruction, freeing up time for a little rest 🍻.

In the code, we pay attention to small details; we use the transferable approach to **transfer binary data** rather than the default **copy binary** method. Since the ttf file’s data is no longer needed in the main thread, it can be transferred; the resulting binary produced in the thread is also no longer needed internally and can be transferred. This method saves some memory by directly transferring binary data, avoiding awkward situations with insufficient memory under extreme conditions.

```ts
const transferred: Uint8Array = await service.pool.exec('convert', [buffer, targetType], {
    transfer: [buffer.buffer], // Transfer buffer
});
```

### Interesting Points About Multithreading

1. Multithreading is not always faster than single-threading: I once wrapped that 5ms function in multithreading, only to find the total time for creating threads and transferring thread data reached 1.5s 😂. Non-heavy computation functions are better off using the main thread.
2. Data returned from multithreading can block the main thread: While multithreading itself does not block, the returned data can block. Since your main thread is singular, if it receives a large amount of data in a very short time, its concurrent processing isn't rapid; you’ll have to resolve everything in a serial manner, which can make multithreading slower than single-threading.
3. The memory sharing solution SharedArrayBuffer in JavaScript browsers requires special cross-origin settings, and some browsers do not support it. For compatibility, we did not use it.
4. Creating workers in the browser requires strict same-origin policies, preventing the worker script itself from being cross-origin; however, `importScripts` and `import` in workers can import cross-origin scripts, so we added another layer of encapsulation for browser compatibility 😂.

## Strong Compatibility

cn-font-split achieves compatibility across Nodejs, Deno, and Browsers, with no significant performance degradation!

### Considerations for Each Platform

Given that the focus of front-end engineering is on the Nodejs side, developers can rapidly install cn-font-split through npm. The browser side offers developers universal access—when you just need to subpackage a font file, you certainly don’t want to write lengthy code. Meanwhile, Deno is an emerging runtime that is slightly faster than Nodejs and adheres to browser standards. Therefore, we particularly made preparations for compatibility.

### File System Compatibility

The usage of the file system varies across platforms: Node uses fs, Deno uses Deno fileSystem API, and browsers only support fetching remote files. Additionally, the requests for files require certain specifics; WebAssembly projects often generate loading files automatically that need to access the file system to retrieve wasm files, necessitating compatibility. So we encapsulated the loading process into an adaptable layer, ensuring that the same API could load and store data throughout the project.

1. Determining the Runtime Environment

Determining the runtime environment is foundational for compatibility. By distinguishing between Nodejs and Deno and calling their respective file systems, we save unnecessary overhead. File system paths and URLs serve as two methods of denoting resource storage locations, but browsers only support URLs, so transformations based on the environment are necessary.

2. Using AssetsMap for Unified File Retrieval

AssetsMap retrieves actual paths through proxy names, combining a compatibility API for file fetching and storage operations. This also avoids lengthy path strings to represent files, simplifying path representations using aliases, and preserving correct paths through TypeScript type declarations.

For adaptation, we expose ways to modify the mapping, allowing the program to replace files with HTTP protocol network paths in the browser, achieving browser compatibility.

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
        throw new Error('loadFileAsync environment adaptation failure');
    }
    //...
}
// Assets is an instance of AssetsMap; below is the direct modification of the corresponding configuration
Assets.redefine({
    'hb-subset.wasm': root + '/dist/browser/hb-subset.wasm',
    'cn_char_rank.dat': root + '/dist/browser/cn_char_rank.dat',
    'unicodes_contours.dat': root + '/dist/browser/unicodes_contours.dat',
});
```

### Compatibility and Adaptation of Special APIs

The Nodejs side lacks many Web APIs like fetch and location, while Deno lacks support for XHR and classic workers. Although the browser side is relatively comprehensive, it lacks crypto encryption methods. These situations require developers to implement polyfills to ensure normal operation across different platforms.

For example, addressing inconsistencies in workers, cn-font-split utilizes the workerpool plugin and converts classic workers to module workers during packaging. For missing APIs like fetch and XHR, we provided solutions by exporting module objects and assigning them to globalThis. For crypto deficiencies, we leveraged some algorithm implementation libraries as substitutes.

Overall, compatibility can be challenging, requiring many operations to achieve favorable outcomes. A thorough understanding of the environment and libraries is essential to avoid introducing bugs throughout the entire program.

## Conclusion

The journey of exploring performance optimization is arduous but also my fastest path of growth. This experience offered me a chance to view the complete JavaScript ecosystem, acquaint myself with unfamiliar multithreading programming, and delve into the field of font optimization. This article does not cover the entire optimization history of version 4.0; more details on the 4.0 optimizations can be appreciated in the source code.

