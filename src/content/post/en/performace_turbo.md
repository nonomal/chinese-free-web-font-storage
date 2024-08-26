---
index: 30
title: 中文网络字体优化最佳实践：提升网页加载速度与用户体验
description: >-
  了解如何通过中文网络字体的分包优化、使用 woff2 格式、合理的字体分包切割大小、高并发 CDN 服务、HTTP/2 和 HTTP/3
  协议、Preconnect 预链接、极小量级优化和布局偏移 CLS 优化等方法，提升网页加载速度与用户体验。详细教程与代码示例助你轻松实现中文字体优化。
article:
  authors:
    - 江夏尧
  section: 性能优化
  tags:
    - 性能优化
  pubDate: 2023-05-23
  image: >-
    https://ik.imagekit.io/chinesefonts/tr:w-1200/image/photo-1508804185872-d7badad00f7d.jfif
---
# Best Practices for Optimizing Chinese Web Fonts: Improving Web Page Loading Speed and User Experience

Learn how to improve web page loading speed and user experience through Chinese web font optimization, including methods such as font subsetting optimization, using the WOFF2 format, reasonable font subsetting size, high-concurrency CDN services, HTTP/2 and HTTP/3 protocols, Preconnect, minimal optimization, and layout shift (CLS) optimization. Detailed tutorials and code examples will help you easily achieve Chinese font optimization.

## Font Subsetting Optimization

Font subsetting can be easily configured and split using `cn-font-split`. The following optimizations are also performed using this plugin. If you are using frontend toolchains such as Vite, Rspack, Next.js, etc., it is recommended to use the super simple [vite-plugin-font](https://npmjs.com/package/vite-plugin-font), where most of the work has been done for you.

### Use the WOFF2 Format for Font Output

Chinese fonts are very large, with an OTF or TTF file ranging from 5 to 10 MB, which can cause network congestion when directly used. Therefore, these fonts can be split into smaller WOFF2 fonts, allowing for on-demand loading and support for all text.

`cn-font-split` now defaults to using WOFF2 as the font subsetting result, and you only need to run a command line or JavaScript code. Alternatively, you can also [use it directly online](/online-split)!

```js
import { fontSplit } from 'cn-font-split';
await fontSplit({
    FontPath: `./fonts/fonts.ttf`, // The plugin will automatically convert
    destFold: dest,
    targetType: 'woff2', // Configure WOFF2
    chunkSize: 70 * 1024,
    testHTML: true,
    threads: {},
    previewImage: {},
});
```

> In modern fonts, WOFF2 is the latest font format with the widest browser support and the best compression ratio. Using the Brotli algorithm, WOFF2 achieves a 30% better compression effect than the WOFF format, resulting in less data to download and therefore better performance. [Best Practices for Font Usage](https://web.dev/font-best-practices/#be-cautious-when-using-preload-to-load-fonts)

![WOFF2 Support Status](/assets/woff2_support_status.png)

### Reasonable Font Subsetting Size

> If using `cn-font-split` for font subsetting, it has already been optimized, so there is no need to worry about this.

When splitting fonts, it is recommended to divide the font into 70KB segments, suitable for general network conditions. When the font is divided into 70KB segments, the loading time is roughly around 1.5 seconds, and the complete loading time does not exceed 2 seconds, so there is no need to worry about speed issues.

![Loading Time Chart](/assets/performance_states.png)

## Font Download Optimization

### Use a High-Concurrency CDN Service!!!

The basis for fast and stable loading of Chinese fonts is a website with a high-concurrency CDN service. With a large number of Chinese font subsets, a single page has a high concurrency when loading. If the CDN service does not support high concurrency, it can lead to page lag. By using a free overseas CDN service, loading can be completed within 2 seconds; if using a domestic service provider, it can be stable within 1 second!

![High-Concurrency Download](/assets/performance_states.png)

### Adopt Advanced HTTP Protocols and Use Cache Headers Reasonably

[HTTP/2 and HTTP/3 protocols](https://web.dev/content-delivery-networks/#http2-and-http3) can greatly accelerate font downloads by enabling browsers to download files concurrently. It is recommended to enable them.

For the font subsetting folder, CDN file caching can be set to permanent caching. This allows users to load the font only once, and subsequently use browser caching when revisiting the page. Since the packaged font subsets use hashed names, there is no need to worry about cache not being updated due to font changes.

> Note: Set a reasonable cache time for CSS files, as CSS files are index files. If there are font updates, users may still be in a cached state. (If the font files will not be changed in the future, this can be ignored.)

![Cache Header Settings](/assets/status_cache.png)

## Frontend Code Optimization

### Preconnect

In general, CDNs are separate from the main site, and the main site obtains resources from the CDN site through cross-origin requests. Using `preconnect` in HTML can prompt the browser to connect to your CDN in advance, saving time when downloading fonts.

```html
<head>
    <link rel="preconnect" href="https://fonts.com" crossorigin />
</head>
```

#### ❗❗❗ Do Not Use Preload to Preload CSS Files

Preloading will fully download the corresponding files, causing on-demand font loading to fail. However, you can preload a few commonly used font file subsets, but this requires manual judgment and is not recommended due to its complexity.

> As a font loading strategy, the use of preload also needs to be used with caution, as it bypasses certain browser built-in content negotiation policies. For example, preload ignores the "unicode-range" declaration and should only be used to load a single font format if used wisely. [Best Practices for Font Usage](https://web.dev/font-best-practices/)

## First Screen Font Optimization

### Minimal Optimization

[Minimal optimization](https://github.com/KonghaYao/cn-font-split/blob/main/packages/vite/README_zh.md#%E6%9E%81%E5%B0%8F%E9%87%8F%E7%BA%A7%E4%BC%98%E5%8C%96) is suitable for scenarios with high demand for rapid rendering, such as official websites and major promotional web pages. It collects the characters used in your code and only loads these characters, providing excellent rendering performance. Here, we use [vite-plugin-font](https://npmjs.com/package/vite-plugin-font) for this operation.

> Add `scanFiles`, the way to do this in Nuxt and Webpack is slightly different, but both involve adding the scan files to the options.

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

> Add `?subsets` to your links

```diff
// Automatically inject CSS to import fonts and support font information tree shaking optimization!
- import { css } from '../../demo/public/SmileySans-Oblique.ttf';
+ import { css } from '../../demo/public/SmileySans-Oblique.ttf?subsets';
console.log(css.family, css.weight); // You can get CSS-related data from here

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

### Layout Shift (CLS) Optimization

Why does layout shift occur?

Because font loading generally has a delay, fallback fonts are displayed first, and fallback fonts generally have differences in basic metrics compared to your fonts, causing the browser to recalculate the size of certain elements, leading to layout shift.

How to reduce layout shift?

Browsers provide `ascent-override`, `descent-override`, and `line-gap-override` to manipulate the basic metrics of a `font-family`. We can create a fallback font linked to the local font and adjust the `override` related properties to make the display sizes of the two fonts as consistent as possible.

```js
@font-face {
  font-family: 'PingFang override';
  src: local('PingFang SC');
  ascent-override: 92.3432%;
  descent-override: 24.2222%;
  line-gap-override: 0%;
}
```

How to use in development?

[fontaine](https://www.npmjs.com/package/fontaine) is an excellent font fallback generation library, but it has minimal optimization for Chinese. Therefore, [vite-plugin-font](https://npmjs.com/package/vite-plugin-font) automatically calculates the font metrics for commonly used Chinese characters after version 1.2.0, and you only need to add the fallback name to your code.

## Further Reading

<https://web.dev/font-best-practices/>

<https://web.dev/reduce-webfont-size>

<https://web.dev/optimize-webfont-loading/>

[notes on calculating font metric overrides](https://docs.google.com/document/d/e/2PACX-1vRsazeNirATC7lIj2aErSHpK26hZ6dA9GsQ069GEbq5fyzXEhXbvByoftSfhG82aJXmrQ_sJCPBqcx_/pub)

