---
index: 30
title: 中文网络字体优化最佳实践：提升网页加载速度与用户体验
description: 了解如何通过中文网络字体的分包优化、使用 woff2 格式、合理的字体分包切割大小、高并发 CDN 服务、HTTP/2 和 HTTP/3 协议、Preconnect 预链接、极小量级优化和布局偏移 CLS 优化等方法，提升网页加载速度与用户体验。详细教程与代码示例助你轻松实现中文字体优化。
article:
    authors:
        - 江夏尧
    section: 性能优化
    tags:
        - 性能优化
    pubDate: 2023-5-23
    image: 'https://ik.imagekit.io/chinesefonts/tr:w-1200/image/photo-1508804185872-d7badad00f7d.jfif'
---

# 中文网络字体优化最佳实践：提升网页加载速度与用户体验

了解如何通过中文网络字体的分包优化、使用 woff2 格式、合理的字体分包切割大小、高并发 CDN 服务、HTTP/2 和 HTTP/3 协议、Preconnect 预链接、极小量级优化和布局偏移 CLS 优化等方法，提升网页加载速度与用户体验。详细教程与代码示例助你轻松实现中文字体优化。

## 字体分包优化

字体分包使用 `cn-font-split` 可以轻松配置并分包，下面的优化也是采用这个插件进行优化的。如果你在使用 Vite、Rspack、Next.js 等前端工具链，那么推荐使用超级简单的 [vite-plugin-font](https://npmjs.com/package/vite-plugin-font), 我们已经帮你完成了大部分的工作。

### 使用 woff2 格式的成品字体

中文字体包非常庞大，一个 OTF 或者 TTF 文件就能有 5 ～ 10 MB，直接使用将会导致网络卡顿。所以，我们可以将这些字体切割成小分的 woff2 字体，这样既可以按需加载，也可以支持所有文本。

`cn-font-split` 现在默认使用 woff2 作为字体分包结果，你只需要运行命令行或者 javascript 代码即可。又或者。。。[直接在线上使用](/online-split)！

```js
import { fontSplit } from 'cn-font-split';
await fontSplit({
    FontPath: `./fonts/fonts.ttf`, // 插件会自动转化
    destFold: dest,
    targetType: 'woff2', // 配置 woff2
    chunkSize: 70 * 1024,
    testHTML: true,
    threads: {},
    previewImage: {},
});
```

> 在现代字体中，WOFF2 是最新的字体格式，支持的浏览器最广，也提供了最好的压缩率。由于它使用 Brotli 算法，WOFF2 比 WOFF 格式的压缩效果提高了 30%，这意味着需要下载的数据更少，因此可以获得更快的性能表现。[字体使用最佳实践](https://web.dev/font-best-practices/#be-cautious-when-using-preload-to-load-fonts)

![woff2 支持情况](/assets/woff2_support_status.png)

### 合理的字体分包切割大小

> 如果使用 cn-font-split 进行字体分包切割，那么它自己已经优化过了，不需要担心这点。

在切割字体时，建议将字体切割为 70KB 大小一份，适合于网络情况较一般的情况。当字体分片过大时，会导致服务器响应时间过长，而且分片的字符命中率也可能较低。在 70KB 分包时，加载时间大致在 1.5 秒左右，完全加载也不会超过 2 秒中，所以不用担心速度问题。

![加载时间图](/assets/performance_states.png)

## 字体下载优化

### 使用支持高并发的 CDN 服务！！！

中文字体能够快速、稳定加载的基础是网站具有支持高并发的 CDN 服务。中文字体分片非常多，单一页面在加载时并发数非常高，如果 CDN 服务不支持高并发，则会导致页面卡顿问题。我这里使用了国外免费的 CDN 服务，就能够在 2 秒钟内完成加载；如果使用国内的服务提供商，则可以稳定在 1 秒以内！

![高并发下载](/assets/performance_states.png)

### 采用高级 HTTP 协议、合理使用缓存头部

[HTTP/2 协议和 HTTP/3 协议](https://web.dev/content-delivery-networks/#http2-and-http3) 都能够促使浏览器并发下载文件，极大地加速字体下载过程，建议开启。

对于字体分包文件夹，CDN 文件缓存可以设置为永久缓存。这样可以使得用户只需加载一次字体，再次进入页面时均使用浏览器缓存。由于打包成品字体分片使用了哈希名称，故不用担心更换字体导致的缓存不更新问题。

> 注意：CSS 文件设置合理的缓存时间，因为 CSS 文件是索引文件，如果发生字体更新的情况，那么用户有可能还在缓存状态。（如果将来不会更改字体文件，那么可以无视这一项）

![缓存头部设置](/assets/status_cache.png)

## 前端代码优化

### Preconnect 预链接

一般来说，CDN 都与主站分离，主站通过跨域获取到 CDN 站点的资源。在 HTML 中使用 `preconnect` 可以提前促使浏览器与你的 CDN 进行连接，这样需要下载字体的时候，可以节省一部分时间。

```html
<head>
    <link rel="preconnect" href="https://fonts.com" crossorigin />
</head>
```

#### ❗❗❗ 禁止使用 Preload 预下载 CSS 文件

Preload 预下载会全量下载对应文件，这样会导致字体按需下载失效。但是你可以预加载几个常用的字体文件分片，这个需要你手动去判断加载，流程较为复杂，非常不推荐。

> 作为一种字体加载策略，使用预加载（preload）也需要谨慎使用，因为它会绕过某些浏览器内置的内容协商策略。例如，预加载会忽略“unicode-range”声明，如果明智地使用，应该只用于加载单个字体格式。 [字体使用最佳实践](https://web.dev/font-best-practices/)


## 首屏字体优化


### 极小量级优化

[极小量级优化](https://github.com/KonghaYao/cn-font-split/blob/main/packages/vite/README_zh.md#%E6%9E%81%E5%B0%8F%E9%87%8F%E7%BA%A7%E4%BC%98%E5%8C%96)适合于官网、大促网页等快速渲染需求大的场景，它收集你的代码中使用的字符，并只加载这些字符，拥有非常好的渲染性能。这里我们使用 [vite-plugin-font](https://npmjs.com/package/vite-plugin-font) 进行操作。

> 添加 `scanFiles`，[Nuxt](#nuxt) 和 Webpack 的方式略有不同，但都是往 options 里面添加扫描文件

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

> 添加 `?subsets` 到你的链接中

```diff
// 自动注入 css 导入字体，并且支持字体信息的摇树优化！
- import { css } from '../../demo/public/SmileySans-Oblique.ttf';
+ import { css } from '../../demo/public/SmileySans-Oblique.ttf?subsets';
console.log(css.family, css.weight); // 你可以从这里得到 css 相关的数据

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


### 布局偏移 CLS 优化

为什么会产生布局偏移？

因为字体加载一般具有延迟，那么就会先显示 fallback 字体，而 fallback 字体一般与你的字体的基础度量单位有差距，这样就会导致浏览器重新计算某些标签的大小，从而导致布局偏移。

怎么减少布局偏移？ 

浏览器提供了 `ascent-override`、`descent-override`、`line-gap-override` 来操作一个 `font-family` 的基础度量。
我们可以创建一个 fallback 字体，链接到本地的字体上，然后调整  `override` 相关属性来将两种字体的显示大小尽量保持一致。

```js
@font-face {
  font-family: 'PingFang override';
  src: local('PingFang SC');
  ascent-override: 92.3432%;
  descent-override: 24.2222%;
  line-gap-override: 0%;
}
```


开发中如何使用？

[fontaine](https://www.npmjs.com/package/fontaine) 是一个优秀的字体 fallback 生成库，但是对中文的优化甚小。所以 [vite-plugin-font](https://npmjs.com/package/vite-plugin-font) 在 1.2.0 版本之后，自动帮你计算了常用中文的字体度量，你只需要把 fallback 名称加入到你的代码后面即可。


## 扩展阅读

https://web.dev/font-best-practices/

https://web.dev/reduce-webfont-size

https://web.dev/optimize-webfont-loading/

[notes on calculating font metric overrides](https://docs.google.com/document/d/e/2PACX-1vRsazeNirATC7lIj2aErSHpK26hZ6dA9GsQ069GEbq5fyzXEhXbvByoftSfhG82aJXmrQ_sJCPBqcx_/pub)
