---
index: 30
title: 如何进行字体分包部署与使用：详细指南
description: 了解如何通过在线工具进行字体分包，并将其部署到 ImageKit OSS 或其他 CDN 服务中。本文提供详细步骤和图文教程，帮助开发者优化网页加载速度。
article:
  authors:
    - 江夏尧
  section: 使用教程
  tags:
    - 使用指南
  pubDate: 2023-07-16
  image: ''
---
# How to Deploy and Use Subfont: A Detailed Guide

> Due to the Chinese Font Project's CDN being stolen by multiple platforms, the corresponding traffic for providing public CDN links will be reduced in the future, and link stability will no longer be guaranteed. Therefore, developers need to deploy fonts to a CDN by themselves to speed up their web pages.

There are many ways to quickly load font files on the web, but the logic for deploying these static files remains the same.

First, you need a link to place the static files and then protect it using a CDN. You can purchase any object storage service in China to upload the files and then add a layer of CDN service to it. You can also use free services provided by LightCDN and Netlify to expand your website globally.

## Deployment Process

After font files go through online subfont or code tool subfont, you will get a finished folder containing segmented woff2 files, CSS index files, reporter.json, and other static files.

### Online Subfont (Recommended)

Go to the [**online subfont page**](/online-split), upload your font source file, click start packaging, and wait for it to complete. After completion, you can download the files.

## Deployment of Static Files

### Deployment to ImageKit OSS (Recommended)

Since uploading OSS files is similar, we will use ImageKit with free quotas for this tutorial. ImageKit itself comes with a CDN, but the quota is only 20GB per month. It can be directly used for small to medium-sized websites.

After registration, you can directly upload the entire folder (remember to save it in the appropriate location) as shown in the picture below.

![image_folder_upload_guide](/assets/image_folder_upload_guide.png)

After uploading, find your CSS file, right-click, and copy the link for later use. There may be multiple files, if you find it cumbersome, you can copy the file path of the same folder, then modify the file name to `result.css`.

![how_to_get_image_url](/assets/how_to_get_image_url.png)

### Deployment to Website System

In fact, all packaged fonts are static files, so you can follow the rules for deploying static websites, treating all font files as a website, and using their links.

The majority of font deployments by the Chinese Font Project use this method. Netlify generously offers 100GB of bandwidth for free every month, which is more than enough for our use.

Different service providers have different ways of deploying websites, but deploying static files can be as simple as uploading the folder and paying attention to its path.

## Setting Up the CDN Environment

The purpose of a CDN is to set file caching on multiple servers around the world, ensuring that static files can be quickly served from the nearest point to the user. By wrapping the OSS with a CDN, you can reduce the download pressure on the OSS and obtain edge data acceleration.

### Service Provider's Default CDN

Some service providers provide a CDN setup option when you purchase object storage or website deployment services. In this case, you just need to operate on their interface without any special settings.

### ~~LightCDN~~ No longer offers free monthly quotas, so it is not recommended to use.

