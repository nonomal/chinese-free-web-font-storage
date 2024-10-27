---
index: 20
title: "🧭 Guide to Using Chinese Fonts: How to Implement Chinese Fonts on Your Website"
description: "Learn how to use Chinese fonts on your website, including how to obtain font links via CDN, how to add styles to your webpage, and detailed steps and considerations for embedding Chinese fonts in front-end projects. Master these techniques to make your website more attractive and professional."
article:
    authors:
        - "KonghaYao"
    section: "How to Use"
    tags:
        - "Usage Guide"
    pubDate: 2023-05-31
    image: "https://ik.imagekit.io/chinesefonts/tr:w-1200/image/photo-1508804185872-d7badad00f7d.jfif"
---

# 🧭 Guide to Using Chinese Fonts

> The following instructions assume you have a basic understanding of HTML and CSS, and a certain level of familiarity with website development. This will make it much easier when working with web fonts.

## Recommended CDN Usage

### 🔗 Obtaining Chinese Font Links

The Chinese Web Font Project offers many fonts that can be used online. If you don’t want to spend time uploading font packages, you can directly use the pre-deployed links.

These Chinese fonts must be served from a remote server so that your website can utilize them. The main file of the entire font package folder is `result.css`, which links to many font sub-packages, effectively combining all the fonts together.

![use-url-link](/assets/use-url-link.png)

> 🔔 In many cases, you may need to deploy font packages to a CDN yourself for better service.
>
> Here, we recommend using the [Online Font Splitter](/en/online-split) to split and download the result files, and then manually upload them to the CDN to get the link. [Check the tutorial](/en/post/deploy_to_cdn/) for more details.

### Adding Styles to Your Webpage

After obtaining the recommended CSS file, add it to your webpage. You can then use CSS selectors to specify which elements should have the font applied, ensuring that the Chinese font rendering is limited to a specific range.

![](/assets/how_to_add_css_style_for_webfont.png?updatedAt=1685501397200)

```html
<!-- Import the CDN link obtained earlier -->
<link
    href="https://ik.imagekit.io/chinesefonts/packages/mkzyt/dist/猫啃珠圆体/result.css"
    rel="stylesheet"
/>
```

```css
/* Apply font only to article */
article {
    /* The font name can be found in the CSS file or on the font's homepage */
    font-family: 'MaokenZhuyuanTi';
    font-weight: 'normal';
}
```

## Embedding Chinese Fonts in Front-End Projects

> ❗ Note: The Chinese Web Font Project no longer recommends this approach as it is neither convenient nor does it avoid front-end packaging issues.
>
> ❗ Note: You can use NPM to directly utilize the fonts, but I do not recommend this method. Chinese fonts require high concurrency and efficient caching, which are not suitable for being mixed with front-end projects. If your website is purely static and hosted on a CDN, then this deployment method can be used.

### Importing Fonts from NPM

Search for @chinese-fonts on NPM, and you will see many fonts, but they will only have numeric identifiers.

You can also check the homepage for NPM download instructions before proceeding to download.

```sh
npm install @chinese-fonts/lxgwwenkai
```

Import the CSS file in your project files.

```ts
import '@chinese-fonts/lxgwwenkai/dist/LXGWWenKai-Bold/result.css';
```

Then add the rendering area in CSS.

```css
/* Apply font only to article */
article {
    /* The font name can be found in the CSS file or on the font's homepage */
    font-family: 'LXGW WenKai';
    font-weight: 'bold';
}
```

### Using CDN

If you don’t want to build fonts yourself, you can use online fonts, which will save you a lot of time. There are many stable and practical NPM CDNs available online for use. Refer to official documentation for specific usage methods. [Unpkg](https://www.unpkg.com/), [jsDelivr](https://www.jsdelivr.com), and [esm.sh](https://esm.sh) are all stable and useful CDNs. You can find the specific links on the font page.

Here’s sample code provided by [swift-fs](https://github.com/swift-fs).

```css
@import url('https://www.unpkg.com/@chinese-fonts/mkwtyt@1.4.0/dist/MaoKenTangYuan/result.css');

:root {
    --vp-font-family-base: 'MaoKenTangYuan (beta)';
    /* --vp-font-family-mono: 'jiangxizhuokai'; */
}
```

## How are Fonts Loaded into the Browser?

1. Add the font CSS index file to the HTML document, which is approximately 30~50KB in size.

2. When the browser parses the HTML text, it recognizes character ranges and requests the corresponding font files. This process is demand-driven and does not significantly affect download speed.

3. The CDN service returns the font package to the browser, and since this process is concurrent, the download speed is very fast.

4. The browser will cache the downloaded font files for later use, so that when the same font is needed on subsequent pages, it can directly use the cached files without re-downloading, improving efficiency.

5. When the font package returns to the browser, it will automatically render the corresponding areas, so the font rendering is partially completed until it is fully rendered.

