---
index: 31
title: "2024 Free Static Resource Deployment Summary"
description: "Acquire free static resource deployment services offered by multiple vendors."
article:
    authors:
        - "KonghaYao"
    section: "Maintenance Log"
    pubDate: "2024-06-16"
    image: ""
---

# 2024 Free Static Web Resource Deployment Summary

The Chinese Web Font Project focused on solving the issue of font CDN service provision throughout last year. Since font deployment is purely a static resource, many free static website deployment services can effectively serve external CDN functionalities.

To create such a static CDN resource site, we require vendors to meet the following criteria:

Basic Requirements:

1. Allow the deployment of static resources and automatically provide domain name and HTTPS services.
2. A generous free quota of around 100GB/month would be ideal; the more, the better.
3. Ideally accessible from Mainland China (a must for targeting domestic users).
4. Support for direct continuous deployment from GitHub.

Additional Points:

1. Support for Edge Workers.
2. Allow projects to define headers for deployment files (primarily to address CORS-related cross-domain issues).
3. Provide website traffic data charts.
4. Offer SSR services for frameworks like Nest.js and Astro.

## No.1 Netlify – Undoubtedly the King of Free Services

### Advantages

1. 100GB free quota each month.
   1. (You can inquire with customer service if there are discounts for GitHub open-source projects, and then place Netlify-related links on one of your front-end open-source projects, as this can grant you a super user quota of 1TB per month.)
2. Accessible in Mainland China, with robust edge nodes and fast speed. The Chinese Web Font Project has been using it for a year and it's quite stable.
3. Supports automatic continuous deployment, directly linked to GitHub projects, making it stress-free and enjoyable.
4. Supports Edge Worker deployment connecting to other applications.
5. Supports deployment of SSR frameworks.

### Disadvantages

1. Documentation is extremely lengthy, filled with unnecessary descriptions; it's quicker to just register and get started.
2. Website traffic data analytics is available only for members.

## No.2 Cloudflare Pages

### Advantages:

1. 100K requests per day (calculated by count, surprisingly).
2. Accessible in Mainland China; although it has edge node support, it can be slightly laggy.
3. Supports Edge Worker deployment servers.
4. Provides additional free integrated services from Cloudflare, such as Stream and R2.
5. Supports frameworks like Astro and Nuxt.
6. Offers simple access data statistics.

### Disadvantages

1. Service is somewhat unstable; automatic edge nodes are not particularly friendly for domestic users.

## No.3 Render

### Advantages

1. 100GB static site bandwidth per month, with basic access data statistics.
2. Can deploy not only front-end but also servers, although performance may be lower.
3. Allows easy header setting through a visual interface.

### Disadvantages

1. The performance of the build server is relatively poor, leading to longer packaging times.
2. It appears to not support Edge Workers; using SSR would require a dedicated server, which has a different billing scheme.

## No.4 Vercel

### Advantages

1. Free 100GB.
2. Highly compatible with the React ecosystem, offering significant SSR support.
3. Integrates features like databases, Blob, and KV.
4. Supports direct continuous deployment from GitHub projects.

### Disadvantages

1. Blocked in Mainland China, making it unusable.
2. Team mode incurs additional costs.

## No.5 Kinsta

### Advantages

1. Supports WordPress and static deployments.
2. 100GB provided, but with limits on site size and number (generally, it's hard to reach the cap).

### Disadvantages

1. Free accounts cannot modify headers.
2. Additional costs required for services like databases.
3. Claims to use Cloudflare's CDN, so... why not just use Cloudflare instead?

## No.6 Surge

### Advantages

1. No limits on the number of sites you can publish.
2. Basic SSL provided.

### Disadvantages

1. Does not allow deployment of large resources.
2. Lacks a graphical interface.
3. Requires writing an Action for GitHub projects, which can be a bit of a hassle.

