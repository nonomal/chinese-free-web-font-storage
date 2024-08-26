---
title: 【数据分析】2024 年 CDN 性能优化与分发网关概况
description: >-
  了解 2024 年 7 月和 6 月 CDN 性能优化与分发网关设计的详细情况，包括 Cloudflare Page 和 Render
  的并发限制问题、架构底层 CDN 更改为 ImageKit、横向扩容 CDN 服务账号、全链路监控系统需求，以及 LightCDN
  的使用数据统计和部分服务挂机问题。分析各地区的 CDN 使用情况和性能表现，特别是东亚和美国地区的流量分布和传输延迟。
article:
  authors:
    - 江夏尧
  section: 维护日志
  tags:
    - CDN
  pubDate: 2024-07-22
  image: >-
    https://ik.imagekit.io/chinesefonts/tr:w-1200/image/photo-1508804185872-d7badad00f7d.jfif
---
# [Data Analysis] Overview of CDN Performance Optimization and Distribution Gateway in 2024

## July 2024 - CDN Distribution Gateway Optimization

1. Cloudflare Page and Render's free static deployment have concurrency limitations, leading to screen freezing when loading fonts.
2. The underlying architecture of CDN has been changed to ImageKit, a service provider by AWS, without concurrency limitations.
3. Horizontal scaling of CDN service accounts, with all CDN accounts pointing to the chinese-fonts-cdn origin via HTTP Proxy.
4. From 0622 to 0722, the gateway logs reached 135K usage, with two CDNs approaching their limits, and then scaled up to 6.
5. The most used is still that Bilibili Comics and its multiple shadow clones, 2333.
6. A more detailed end-to-end monitoring system is needed.

## June 2024 - CDN Distribution Gateway Design

1. Due to the discontinuation of LightCDN's free service, the CDN was migrated.
2. The font files for the Chinese Font Plan are all static files, so they can be deployed using a front-end deployment method, by deploying the code to various free websites each time and the effect is not bad.
3. The advantage is dynamically forwarding the CDN's host, not afraid even if the CDN goes down, but the downside is that there is no CDN analysis data for me to play with.
4. The total CDN quota is ridiculously high, totaling around 220 GB, and if it's still not enough, then connect another 1T for continued usage.

## LightCDN has been sent in June 2024

The data statistics of the Chinese Font Plan using LightCDN's free service are as follows:

| Visitor Country | Total traffic | Avg latency | Avg transfer rate |
| --------------- | ------------- | ----------- | ----------------- |
| China           | 7.59 GB       | 192 ms      | 68.39 KB          |
| Hong Kong-China | 1.42 GB       | 30 ms       | 271.65 KB         |
| United States   | 1.38 GB       | 60 ms       | 289.81 KB         |
| Japan           | 850.52 MB     | 20 ms       | 436.83 KB         |
| Taiwan-China    | 487.91 MB     | 70 ms       | 211.49 KB         |

According to the given table, we can see that the usage of this CDN is mainly distributed in East Asia and the United States.

The usage in mainland China is very high, but due to the nodes being located in remote areas such as Hong Kong and Tokyo, the coverage for the inland areas is small, resulting in the average transmission volume being almost the same as our cn-font-split's default segmentation size, so the effect is just passable.

In the United States, Singapore, and Japan, which are close to edge servers, their transport latency and capacity are very strong, making them very suitable for font loading.

> Note: During certain festivals and special periods, foreign nodes are all unstable, which is unavoidable.

## March 2024 - Partial Service Outage Issue

![Alt text](../../../assets/202403_CDN.png)

One of the CDN branches experienced a sudden surge in traffic within a week without a clear entry point, directly occupying 100G and causing the service to crash. Fortunately, it was a free CDN, so no money was spent 😂.

After restarting, it was discovered that there was a huge traffic from France and Japan, so we closed all sites except for those in Tokyo, Hong Kong, and Singapore, as they are mainly targeted at the domestic market.

| Edge locations                  | Total traffic |
| ------------------------------- | ------------- |
| Tokyo, Japan                    | 53.31 GB      |
| **Frankfurt, Germany**          | 46.87 GB      |
| Washington, America             | 17.59 GB      |
| Singapore                       | 11.42 GB      |
| Dubai, The United Arab Emirates | 1.62 GB       |
| Hong Kong, China                | 943.4 MB      |
| Silicon Valley, America         | 720.65 MB     |
| Sao Paulo, Brazil               | 16.7 MB       |

