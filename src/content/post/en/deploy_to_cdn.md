---
index: 30
title: "Detailed Guide on Font Sub-Package Deployment and Usage"
description: "Learn how to sub-package fonts using online tools and deploy them to ImageKit OSS or other CDN services. This article provides detailed steps and visual tutorials to help developers optimize web page loading speed."
article:
    authors:
        - "KonghaYao"
    section: "How to Use"
    tags:
        - "Usage Guide"
    pubDate: 2023-07-16
    image: ""
---

# Detailed Guide on Font Sub-Package Deployment and Usage

> Due to the misuse of the Chinese Web Font Project's CDN by multiple platforms, we will reduce the corresponding traffic for public CDN links in the future and no longer guarantee link stability. Therefore, developers need to deploy fonts to their own CDN to accelerate their web pages.

There are many ways to quickly load font files online, but the logic of deploying these static files remains consistent.

First, you need a link to place static files, then use a CDN to protect it. You can purchase any domestic object storage service to upload files and then overlay a layer of CDN service; you can also use free services provided by overseas LightCDN and Netlify to extend your website globally.

## Build Phase

After a font has gone through [**online font sub-packaging**](/online-split) or **code tool sub-packaging**, you will receive a final product folder, which contains subdivided woff2 files, CSS index files, reporter.json, and other static files.

### Online Font Sub-Packaging (Recommended)

Go to the [**Online Font Sub-Packaging Page**](/online-split), upload your font source file, click to start packaging, then wait for it to complete, after which you can download the files.

## Deployment of Static Files

### Deploying to ImageKit OSS (Recommended)

Since OSS file uploads are quite similar across services, we choose [ImageKit](https://imagekit.io/) for teaching, which comes with a CDN. However, it only has a quota of 20GB/month, which is sufficient for small to medium-sized websites to use directly.

After registration, you can upload the entire folder directly according to the image below (be careful to save it in the appropriate location).

![image_folder_upload_guide](/assets/image_folder_upload_guide.png)

After uploading, find your CSS file, right-click and copy the link for future use. There might be many files; if you find it cumbersome, you can copy the file path of the same folder and rename the file to `result.css`.

![how_to_get_image_url](/assets/how_to_get_image_url.png)

### Deploying to a Website System

In fact, all packaged fonts are static files, so you can follow the same rules as deploying a static website by treating all font files as a website and using the links obtained.

Many font deployments for the Chinese Web Font Project are done using this method, and Netlify generously provides free bandwidth of 100GB per month, which is more than enough for our use.

Deployment methods vary among service providers, but you can usually just upload the folder and pay attention to its path.

## Setting Up the CDN Environment

The role of the CDN is to set file caching on multiple servers around the globe, ensuring that the nearest point to the user can quickly respond to static files. By wrapping the OSS with a CDN, it can reduce the download pressure on OSS and also provide edge data acceleration.

### Default CDN from Service Providers

Some service providers offer a CDN setup option when you purchase object storage or website deployment services, so you only need to operate on their interface without any special configurations.

### ~~LightCDN~~ no longer offers monthly free quotas, so it is not recommended for use.

