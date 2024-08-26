---
index: 31
title: 2024 免费静态资源部署大汇总
description: 获取多个服务商提供的免费静态资源部署服务
article:
  authors:
    - 江夏尧
  section: 维护日志
  pubDate: 2024-6-16
  image: ''
---
# 2024 Free Static Web Resource Deployment Summary

The Chinese Web Font Plan has been focusing on solving the issues with font CDN services throughout last year. Since font deployment is purely a static resource, many free static website deployment services can effectively serve as external CDN. To implement such a static CDN resource website, we need the service provider to meet the following conditions:

Basic requirements:

1. Allow deployment of static resources and automatically provide domain and HTTPS-related services.
2. Free quota large enough, around 100GB/month, the more the better.
3. Preferably accessible in China (mandatory for targeting Chinese users).
4. Support direct continuous deployment from Github.

Bonus points:

1. Support Edge Worker.
2. Allow definition of headers for deployed files (mainly to solve cross-domain issues caused by CORS).
3. Provide website access data charts.
4. Provide SSR services for frameworks such as Nest.js and Astro.

## No.1 Netlify - Undoubtedly the King of Free

### Advantages

1. 100GB free quota per month
   1. (You can first inquire with customer service about any discounts for open-source projects on Github, and then put Netlify-related links in one of your open-source frontend projects to become a super user with a monthly 1TB quota)
2. Accessible in China, with powerful edge nodes and fast speed. The Chinese Web Font Plan has been using it for a year and it's quite stable.
3. Supports automatic continuous deployment, directly deploys from Github projects, making it worry-free and fast.
4. Supports Edge Worker for deploying server links to other applications.
5. Supports SSR framework deployment.

### Disadvantages

1. The documentation is very lengthy, and there's a lot of unnecessary introduction. It's faster to register and get started directly.
2. Website access data analysis is only available to members.

## No.2 Cloudflare Pages

### Advantages

1. 100K requests per day (surprisingly calculated on a per-request basis).
2. Accessible in China, although there is support for edge nodes, it's a bit laggy.
3. Supports Edge Worker for deploying servers.
4. Provides other free integrated services from Cloudflare, such as Stream, R2, etc.
5. Supports frameworks like Astro, Nuxt.
6. Provides simple access data statistics.

### Disadvantages

1. The service is not very stable, and the automatic edge nodes are not very friendly to China.

## No.3 Render

### Advantages

1. 100GB monthly bandwidth for static websites, with simple access data statistics.
2. Can deploy not only frontend but also servers, although with slightly lower performance.
3. Can directly set headers in the visual interface, very convenient.

### Disadvantages

1. Poor performance of the build server, takes a bit longer for packaging.
2. It seems to not support Edge Worker. If SSR is required, a server must be used, which is another billing plan.

## No.4 Vercel

### Advantages

1. Free 100GB.
2. Highly compatible with the React ecosystem, with high SSR support.
3. Integrated with features such as databases, Blob, KV, etc.
4. Supports direct continuous deployment from Github projects.

### Disadvantages

1. Blocked in China, directly unusable.
2. Team mode requires additional payment.

## No.5 Kinsta

### Advantages

1. Supports WordPress and static deployment.
2. 100GB, but with website size and quantity limitations (generally not reached).

### Disadvantages

1. Free accounts cannot change headers.
2. Additional payment required for using database and other services.
3. Claims to use Cloudflare's CDN, then... why not use Cloudflare?

## No.6 Surge

### Advantages

1. No limit on the number of websites to be published.
2. Basic SSL available.

### Disadvantages

1. Does not allow deployment of excessively large resources.
2. Lacks a graphical interface.
3. Github projects still require writing an Action, a bit troublesome.

