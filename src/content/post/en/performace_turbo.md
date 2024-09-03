---
index: 30
title: "Best Practices for Optimizing Chinese Web Fonts: Enhancing Page Load Speed and User Experience"
description: "Learn how to enhance webpage loading speed and user experience through techniques such as subpackage optimization of Chinese web fonts, using the woff2 format, reasonable font subpackage chunk sizes, high-concurrency CDN services, HTTP/2 and HTTP/3 protocols, preconnect hints, minimal optimization, and CLS optimization. Detailed tutorials and code examples will help you easily achieve Chinese font optimization."
article:
    authors:
        - "KonghaYao"
    section: "Performance Optimization"
    tags:
        - "Performance Optimization"
    pubDate: 2023-05-23
    image: "https://ik.imagekit.io/chinesefonts/tr:w-1200/image/photo-1508804185872-d7badad00f7d.jfif"
---

# Best Practices for Optimizing Chinese Web Fonts: Enhancing Page Load Speed and User Experience

Learn how to enhance webpage loading speed and user experience through techniques such as subpackage optimization of Chinese web fonts, using the woff2 format, reasonable font subpackage chunk sizes, high-concurrency CDN services, HTTP/2 and HTTP/3 protocols, preconnect hints, minimal optimization, and CLS optimization. Detailed tutorials and code examples will help you easily achieve Chinese font optimization.

## Font Subpackage Optimization

Font subpackaging can be easily configured and executed using `cn-font-split`. The optimizations below also utilize this plugin. If you are using front-end toolchains like Vite, Rspack, or Next.js, we recommend using the super easy [vite-plugin-font](https://npmjs.com/package/vite-plugin-font), which has already handled most of the work for you.

### Using WOFF2 Format for Processed Fonts

Chinese font packages are quite large; a single OTF or TTF file can range from 5 to 10 MB, which can lead to network lags if used directly. Thus, we can split these fonts into smaller WOFF2 fonts, allowing for on-demand loading while supporting all text.

`cn-font-split` now defaults to using WOFF2 as the result for font subpackaging; you just need to run the command line or JavaScript code. Alternatively, you can... [use it online directly](/online-split)!

```js
import { fontSplit } from 'cn-font-split';
await fontSplit({
    FontPath: `../zh-cn/fonts/fonts.ttf`, // The plugin will automatically convert
    destFold: dest,
    targetType: 'woff2', // Configured for WOFF2
    chunkSize: 70 * 1024,
    testHTML: true,
    threads: {},
    previewImage: {},
});
```

> In modern font technology, WOFF2 is the latest font format with the widest browser support and the best compression rates. Utilizing the Brotli algorithm, WOFF2 offers 30% better compression compared to WOFF, which means less data to download, leading to faster performance. [Font Use Best Practices](https://web.dev/font-best-practices/#be-cautious-when-using-preload-to-load-fonts)

![WOFF2 Support Status](/assets/woff2_support_status.png)

### Reasonable Font Subpackage Chunk Size

> If using `cn-font-split` for font subpackaging, it has already been optimized, so there's no need to worry about this aspect.

When splitting fonts, it's recommended to chunk them into sizes of 70 KB, which is suitable for relatively average network conditions. Large font fragments can lead to excessive server response times and potentially low character hit rates for the fragments. When chunked at 70 KB, loading time is approximately 1.5 seconds, and full loading will not exceed 2 seconds, so speed concerns are minimal.

![Loading Time Chart](/assets/performance_states.png)

## Font Download Optimization

### Utilize a High-Concurrency CDN Service!!!

The foundation for the rapid and stable loading of Chinese fonts is a website that supports high-concurrency CDN services. With many Chinese font fragments, the concurrency while loading a single page can be very high. If the CDN service does not support high concurrency, it may lead to page lag. Here, I used a free foreign CDN service and achieved loading in under 2 seconds; if domestic service providers are used, stable loading can be achieved in under 1 second!

![High-Concurrency Download](/assets/performance_states.png)

### Adopt Advanced HTTP Protocols and Use Cache Headers Wisely

Both [HTTP/2 and HTTP/3 protocols](https://web.dev/content-delivery-networks/#http2-and-http3) can facilitate concurrent file downloads by the browser, significantly speeding up font download processes—it's recommended to enable them.

For font subpackage folders, the CDN file cache can be set to permanent. This allows users to load the fonts only once, with subsequent visits to the page using the browser cache. Since the packaged font fragments utilize hashed names, there is no need to worry about outdated caches when changing fonts.

> Note: Set a reasonable cache duration for CSS files, as they are index files; if a font update occurs, users may still be in a cached state. (This point can be ignored if font files will not be updated in the future.)

![Cache Header Configuration](/assets/status_cache.png)

## Frontend Code Optimization

### Preconnect Hints

Generally, CDNs are separated from the main site, and the main site retrieves resources from the CDN via cross-domain requests. Using `preconnect` in HTML can prompt the browser to connect to your CDN in advance, saving some time when it comes to downloading fonts.

```html
<head>
    <link rel="preconnect" href="https://fonts.com" crossorigin />
</head>
```

#### ❗❗❗ Avoid Using Preload for CSS File Downloads

Preload attempts to download an entire file, which can cause on-demand font loading to fail. However, you may pre-load a few commonly used font file fragments, but this requires manual assessment for loading and is quite complex; it is not recommended.

> As a font loading strategy, using preload must be approached with caution, as it bypasses built-in content negotiation strategies in some browsers. For example, preload ignores the "unicode-range" declaration; it should be wisely used only for loading a single font format. [Font Use Best Practices](https://web.dev/font-best-practices/)

## First Screen Font Optimization

### Minimal Optimization

[Minimal Optimization](https://github.com/KonghaYao/cn-font-split/blob/main/packages/vite/README_zh.md#%E6%9E%81%E5%B0%8F%E9%87%8F%E7%BA%A7%E4%BC%98%E5%8C%96) is suited for official websites, promotional pages, and other scenarios that require rapid rendering. It collects characters used in your code and only loads those characters, achieving excellent rendering performance. Here, we use [vite-plugin-font](https://npmjs.com/package/vite-plugin-font) for this task.

> Add `scanFiles`—the method differs slightly for Nuxt and Webpack, but both require adding the scanning files into options.

```js
// vite.config.js
import { defineConfig } from 'vite';
import viteFont from 'vite-plugin-font';
export default defineConfig({
    plugins: [
        viteFont({
            scanFiles: ['src/**/*.{vue,ts,tsx,js,jsx}'],
        }), 
    ],
});
```

> Add `?subsets` to your link

```diff
// Automatically inject CSS to import fonts and support tree-shaking optimization!
- import { css } from '../../demo/public/SmileySans-Oblique.ttf';
+ import { css } from '../../demo/public/SmileySans-Oblique.ttf?subsets';
console.log(css.family, css.weight); // You can retrieve CSS related data from here

export const App = () => {
    return (
        <div
            style={{
                fontFamily: css.family,
            }}
        ></div>
    );
};
```

### CLS Optimization of Layout Shifts

Why do layout shifts occur?

Layout shifts generally occur due to delays in font loading, leading to the fallback font being displayed initially. Since the fallback font often differs from the base measurement units of your font, this requires the browser to recalculate the size of certain elements, resulting in layout shifts.

How to reduce layout shifts?

The browser provides properties like `ascent-override`, `descent-override`, and `line-gap-override` to manipulate the basic measurements of a `font-family`. We can create a fallback font linked to a local font and adjust the `override` properties to keep the display sizes of both fonts as consistent as possible.

```js
@font-face {
  font-family: 'PingFang override';
  src: local('PingFang SC');
  ascent-override: 92.3432%;
  descent-override: 24.2222%;
  line-gap-override: 0%;
}
```

How to use this in development?

[fontaine](https://www.npmjs.com/package/fontaine) is an excellent font fallback generation library, but its optimization for Chinese fonts is limited. Therefore, after version 1.2.0, [vite-plugin-font](https://npmjs.com/package/vite-plugin-font) automatically calculates commonly used Chinese font metrics—just append the fallback names to your code.

## Further Reading

<https://web.dev/font-best-practices/>

<https://web.dev/reduce-webfont-size>

<https://web.dev/optimize-webfont-loading/>

[Notes on calculating font metric overrides](https://docs.google.com/document/d/e/2PACX-1vRsazeNirATC7lIj2aErSHpK26hZ6dA9GsQ069GEbq5fyzXEhXbvByoftSfhG82aJXmrQ_sJCPBqcx_/pub)

