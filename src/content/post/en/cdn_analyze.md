---
title: "Data Analysis: Overview of CDN Performance Optimization and Distribution Gateway in 2024"
description: "Learn about the detailed situation of CDN performance optimization and distribution gateway design in July and June 2024, including the concurrency limit issues with Cloudflare Page and Render, architectural changes of the underlying CDN to ImageKit, horizontal expansion of CDN service accounts, requirements for a full-link monitoring system, as well as usage statistics and some service downtime issues with LightCDN. Analyze the usage and performance of CDN in various regions, especially the traffic distribution and transmission latency in East Asia and the United States."
article:
    authors:
        - "KonghaYao"
    section: "Maintenance Log"
    tags:
        - "CDN"
    pubDate: 2024-07-22
    image: "https://ik.imagekit.io/chinesefonts/tr:w-1200/image/photo-1508804185872-d7badad00f7d.jfif"
---

# Data Analysis: Overview of CDN Performance Optimization and Distribution Gateway in 2024

## July 2024 - CDN Distribution Gateway Optimization

1. The free static deployment of Cloudflare Page and Render has concurrency limits, making it easy to cause loading stalls when rendering fonts.
2. The underlying architectural CDN has been changed to ImageKit, whose service provider is AWS and has no concurrency limits.
3. Horizontally expanded the CDN service accounts, redirecting all CDN accounts through HTTP Proxy to the chinese-fonts-cdn origin station.
4. The gateway log usage from June 22 to July 22 is 135K, with two CDN services nearing capacity; expanded to 6 services.
5. The most used service remains Bilibili Comics and its various clones, 2333.
6. A more detailed full-link monitoring system is needed.

## June 2024 - CDN Distribution Gateway Design

1. Since LightCDN is no longer free, migration of the CDN is necessary.
2. The font files of the Chinese Web Font Project are all static files, so a frontend deployment approach can be used to deploy the code fully to various free websites, building and deploying each time, which works quite well.
3. The advantage is the dynamic forwarding of the CDN's host; even if the CDN goes down, it is not a problem. The downside is the lack of CDN analytics data to play with.
4. The total CDN capacity is absurdly high, around 220 GB; if we can still manage that, we'll add another 1T for continuity.

## Data Statistics for LightCDN in June 2024

The data statistics for the free service of LightCDN used by the Chinese Web Font Project are as follows:

| Visitor Country   | Total Traffic | Avg Latency | Avg Transfer Rate |
|-------------------|---------------|-------------|-------------------|
| China             | 7.59 GB       | 192 ms      | 68.39 KB          |
| Hong Kong-China   | 1.42 GB       | 30 ms       | 271.65 KB         |
| United States     | 1.38 GB       | 60 ms       | 289.81 KB         |
| Japan             | 850.52 MB     | 20 ms       | 436.83 KB         |
| Taiwan-China      | 487.91 MB     | 70 ms       | 211.49 KB         |

Based on the provided table, we can see that the usage of the CDN is mainly distributed in East Asia and the United States.

The usage in mainland China is significant; however, the node distribution in remote areas like Hong Kong and Tokyo means limited coverage inland, resulting in average transmission close to the default splitting size of our cn-font-split, so the results are just barely acceptable.

In regions close to edge servers, such as the United States, Singapore, and Japan, the transport latency and burden capacity are very strong, making them quite suitable for font loading.

> Note: During certain holidays and special periods, foreign nodes can be unstable; there is no solution to this.

## March 2024 - Partial Service Downtime Issues

![Alt text](../../../assets/202403_CDN.png)

One of the sub-CDNs experienced a traffic surge without a clear entry point, overwhelming 100G in just a week, resulting in service downtime. Fortunately, it was a free CDN, so no money was spent 😂.

After restarting, it was found that the traffic from France and Japan was tremendous, so we decided to shut down sites in Asia, except for Tokyo, Hong Kong, and Singapore, as our main audience is domestic.

| Edge Locations                         | Total Traffic |
|----------------------------------------|---------------|
| Tokyo, Japan                           | 53.31 GB      |
| **Frankfurt, Germany**                 | 46.87 GB      |
| Washington, America                    | 17.59 GB      |
| Singapore                              | 11.42 GB      |
| Dubai, The United Arab Emirates       | 1.62 GB       |
| Hong Kong, China                       | 943.4 MB      |
| Silicon Valley, America                | 720.65 MB     |
| Sao Paulo, Brazil                      | 16.7 MB       |

