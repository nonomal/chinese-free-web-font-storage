---
index: 30
title: 字体分包部署与使用
description: 如何部署使用分包完成的字体。
article:
    authors:
        - 江夏尧
    section: 使用教程
    tags:
        - 使用指南
    pubDate: 2023-7-16
    image: ''
---

# 字体分包部署与使用

> 由于中文网字计划的 CDN 被多个平台盗用，故未来将缩减提供公共 CDN 链接的相应流量，并且不再保证链接稳定性。所以各位开发者需要自行将字体部署至 CDN 中，为各位的网页加速。

我们有非常多的途径可以在网络中快速的加载字体文件，但是部署这些静态文件的逻辑是一致的。

首先你需要一个放置静态文件的链接，然后使用 CDN 保护它。你可以购买国内任何一个对象存储服务上传文件，然后套上一层 CDN 服务；你也可以使用国外 LightCDN、Netlify 提供的免费服务将你的网站扩展到全球范围。

## 构建环节

一个字体在经过 [**在线字体分包**](/online-split) 或者 **代码工具分包** 后，会得到成品文件夹，里面包含了细分 woff2 文件、CSS 索引文件、reporter.json 等静态文件。

### 在线字体分包（推荐）

进入 [**在线字体分包页面**](/online-split)，上传你的字体源文件，点击开始打包，然后等待完成，完成之后下载文件即可。

## 部署静态文件环节

### 部署到 ImageKit OSS（推荐）

由于 OSS 文件上传大同小异，我们选择有免费额度的 [ImageKit](https://imagekit.io/) 进行教学。ImageKit 本身自带了一套 CDN，但是额度只有 20G/月，对于中小型网站可以直接使用其链接。

注册完成之后，根据下图可以直接上传整个文件夹（注意保存到合适的位置）。

![image_folder_upload_guide](/assets/image_folder_upload_guide.png)

上传完成之后，找到你的 CSS 文件，并右键复制链接留以待用。文件可能有点多，如果你嫌麻烦，可以复制同文件夹的文件路径，然后修改文件名为 `result.css`

![how_to_get_image_url](/assets/how_to_get_image_url.png)

### 部署到网站系统

其实，所有的打包后的字体都是静态文件，所以可以遵循部署静态网站的规律，把所有的字体文件当成一个网站部署，然后取其链接使用。

中文网字计划的大量字体部署都是使用该方式部署的，Nelify 大方提供了免费的每月 100G 带宽，完全够我们使用。

对于部署网站的方式，各大服务提供商不同，但是部署静态文件都可以直接把文件夹丢上去，注意其路径即可。

## 设置 CDN 环境

CDN 的作用是在全球的多个服务器上设置文件缓存，保证离用户最近的点能够快速响应静态文件。通过 CDN 将 OSS 包裹一层，既可以减少对 OSS 下载压力，也可以获得边缘数据加速的功能。

### 服务提供商的默认 CDN

有些服务提供商，在你买了对象存储或者网站部署服务的时候，就给你一个设置 CDN 的操作，这样你只需要在他们的界面上操作一下就好了，不需要特别的设置。

### 通过 LightCDN 加速 OSS 中的文件

> 注意：在 LightCDN 的新策略中，不能同时存在相同的来源网站，所以我们需要将 imagekit.io 服务器封装一层。放心，所有的东西都是免费且强大的。
> 
> 嘟嘟，2024 年 4 月，LightCDN 会针对 Deno Deploy 的服务，然后进行 307 跳转。
> 
> 但是 Cloudflare 没限制，[请先查看这里，然后继续](./transport_imagekit)

在这里，我们也使用有免费额度的 [LightCDN](https://www.lightcdn.com/) 进行演示。

首先注册一个 LightCDN 账号，然后设置你的 CDN 配置项，如下图填写。(如果转接了服务，那么填写你的服务器的域名)

![lightCDN_init](/assets/lightCDN_init.png)

你的 CDN 就配置好了，通过 CDN 提供的 URL 转换一下你的字体 CSS 文件的 URL 即可。（其实就是把域名给替换成为 LightCDN 给你的 CDN 域名 😂)

> 现在 LightCDN 更新了来源网站的策略，不能对同一个来源设置多个 CDN 了。

```diff
-https://ik.imagekit.io/chinesefonts1/packages/jxzk/dist/江西拙楷/result.css
+https://901557678.r.cdn36.com/chinesefonts1/packages/jxzk/dist/江西拙楷/result.css
```

#### 高级设置

1. 更改 CDN 服务器位置为下图

![cdn_area_setting](/assets/cdn_area_setting.png)

## 在网页中加载 CSS 文件

1. 导入 CSS 文件，link 标签或者 css import 皆可以。 可以添加一个 preconnect 来加速你的链接

```html
<link rel="preconnect" href="https://901557678.r.cdn36.com/" crossorigin />
<link
    href="https://901557678.r.cdn36.com/chinesefonts1/packages/jxzk/dist/江西拙楷/result.css"
    rel="stylesheet"
/>
```

1. 构建一个 CSS 类名使用字体名称

```css
.use-my-font {
    font-family: 'Name'; // 这个名称你需要到`result.css`文件中查看
}
```
