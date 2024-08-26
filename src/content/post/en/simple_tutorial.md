---
index: 20
title: "\U0001F9ED 中文字体使用指南：如何在网页中使用中文字体"
description: >-
  了解如何在网页中使用中文字体，包括通过 CDN
  获取字体链接、在网页中加入样式、以及在前端项目中嵌入中文字体的详细步骤和注意事项。掌握这些技巧，让您的网站更具吸引力和专业性。
article:
  authors:
    - 江夏尧
  section: 使用教程
  tags:
    - 使用指南
  pubDate: 2023-05-31
  image: >-
    https://ik.imagekit.io/chinesefonts/tr:w-1200/image/photo-1508804185872-d7badad00f7d.jfif
---
# 🧭 Guide to Using Chinese Fonts

> The following usage methods assume that you have already learned the basics of HTML and CSS and have a certain understanding of website development. This will make it much easier to use web fonts.

## CDN Usage (Recommended)

### 🔗 Obtain the link to the Chinese font

The Chinese Font Plan provides many fonts that can be used online. If you don't want to spend effort on uploading font packages, we can directly use the deployed links.

This Chinese font must be served on a remote server so that our website can use these fonts. The main file of the entire font package folder is `result.css`, which internally links to many font sub-packages, combining the entire font together in this way.

![use-url-link](/assets/use-url-link.png)

> 🔔 In many cases, we need to deploy the font sub-packages to a CDN ourselves, so that we can use better service.
>
> Here, I recommend using the [Online Font Subpackager](https://chinese-font.netlify.app/online-split) to package and download the result files, and then manually upload them to a CDN to obtain the links. [I recommend reading the tutorial](https://chinese-font.netlify.app/post/deploy_to_cdn/).

### Add styles to the web page

Add the recommended CSS file to the web page, and then you can use CSS selectors to select specific elements to add fonts, so that Chinese fonts are only rendered within a limited range.

![](/assets/how_to_add_css_style_for_webfont.png?updatedAt=1685501397200)

```html
<!-- Import the CDN link obtained earlier -->
<link
    href="https://ik.imagekit.io/chinesefonts/packages/mkzyt/dist/猫啃珠圆体/result.css"
    rel="stylesheet"
/>
```

```css
/* Add the font to the article element */
article {
    /* The font name can be found in the CSS file or on the font's homepage */
    font-family: 'MaokenZhuyuanTi';
    font-weight: 'normal';
}
```

## Embedding Chinese Fonts in Front-End Projects

> ❗ Note that the Chinese Font Plan no longer recommends this method, as it is not convenient and can cause front-end packaging issues.
>
> ❗ Note that you can use NPM to directly use fonts, but I do not recommend using them this way. Chinese fonts require high concurrency and efficient caching, and are not suitable for use together with front-end projects. If your website is purely static and the entire project is hosted under a CDN, then you can use this deployment method.

### Import fonts from NPM

Search for @chinese-fonts in NPM, and you will see many fonts, but they have only numeric identifiers.

You can also see the NPM download method on the homepage, and then proceed to download.

```sh
npm install @chinese-fonts/lxgwwenkai
```

Import the CSS file into your project file.

```ts
import '@chinese-fonts/lxgwwenkai/dist/LXGWWenKai-Bold/result.css';
```

Then add the rendering area in CSS.

```css
/* Add the font to the article element */
article {
    /* The font name can be found in the CSS file or on the font's homepage */
    font-family: 'LXGW WenKai';
    font-weight: 'bold';
}
```

### Use CDN

If you don't want to build the font yourself, you can use online fonts, which can save a lot of time. There are many NPM CDNs available on the internet for use. The specific usage methods can be found in the official documentation. [Unpkg](https://www.unpkg.com/), [jsDelivr](https://www.jsdelivr.com), and [esm.sh](https://esm.sh) are all stable and practical CDNs. The specific links can be found on the font page.

Here is an example provided by [swift-fs](https://github.com/swift-fs).

```css
@import url('https://www.unpkg.com/@chinese-fonts/mkwtyt@1.4.0/dist/MaoKenTangYuan/result.css');

:root {
    --vp-font-family-base: 'MaoKenTangYuan (beta)';
    /* --vp-font-family-mono: 'jiangxizhuokai'; */
}
```

## How are fonts loaded in the browser?

1. Add the font CSS index file to the HTML file, which is about 30~50KB in size.

2. When the browser parses the HTML text, it recognizes the character range and requests the corresponding font file. This process is on-demand and does not greatly affect download speed.

3. The CDN service returns the font sub-package to the browser. Due to the concurrent nature of this process, the download speed is very fast.

4. The browser caches the downloaded font file for subsequent use of the same font in other pages, avoiding re-downloading and improving efficiency.

5. When the font sub-package file is returned to the browser, the browser automatically renders the corresponding area, so the font rendering is done partially until completion.

