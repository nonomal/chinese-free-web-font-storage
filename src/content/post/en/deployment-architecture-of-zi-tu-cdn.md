---
title: 【网站架构】打造极速体验：字图 CDN 部署架构全解析
description: >-
  了解字图 CDN
  的部署架构，探索如何通过全球分布的服务器节点、边缘计算网关、负载均衡和安全认证等技术，实现高效的文字和图片内容分发，提升网站性能和用户体验。
article:
  authors:
    - 江夏尧
  section: 技术内幕
  tags:
    - CDN
  pubDate: 2024-07-22
  image: ''
---
# Creating a High-Speed Experience: Fully Analyzing the Deployment Architecture of Font CDN

In today's internet era, Content Delivery Network (CDN) has become a key technology for improving website performance and user experience. As part of the Chinese Web Font Project, the Font CDN (Font Content Delivery Network) is a free font CDN that needs to provide nearly 150GB of bandwidth per month, yet it remains a free service. This article will provide a detailed overview of the deployment architecture of the Font CDN to help you better understand and replicate our technology.

## What is Font CDN, and What Problems Does It Solve?

Font CDN is not a traditional CDN; it is a solution for managing a large number of CDN clusters, with performance comparable to conventional CDNs.

1. **Global Distribution**: By caching and distributing text and image content across servers worldwide, it reduces user access latency, improves website loading speed, and enhances user experience.
2. **Gateway Control**: Advanced functions such as request forwarding, load balancing, and security authentication are provided through gateway servers.
3. **Origin Server Control**: Content distribution is controlled through origin servers, enabling robust cache policy control.

## Deployment Architecture of Font CDN

The deployment architecture of Font CDN mainly includes the following components:

### Edge Computing Gateway

The edge computing gateway plays a crucial role in the Font CDN, providing high availability, high-performance request forwarding, load balancing, and security authentication. We have chosen Deno Deploy as the platform, which not only offers outstanding performance and free quotas but also simplifies the deployment process. With just a few lines of code on the website and a click, deployment can be completed, and version changes and fixes can be made within minutes.

Users first enter our edge computing gateway through a URL, and the gateway assigns them to a specified sub-CDN based on various policies.

#### Request Forwarding

The links users use to access the CDN always remain consistent, avoiding user awareness of the existence of sub-CDNs, thereby reducing user experience issues caused by CDN failures. When a sub-CDN fails, we can quickly remove it from the code and complete the deployment within minutes. This design not only improves the robustness of the system but also ensures the continuity of user experience.

#### Load Balancing

We employ advanced load balancing algorithms to distribute requests to different CDN nodes based on the source IP, thereby improving CDN cache rates and utilization. By adjusting the load algorithm, we can provide a variety of strategies to adjust traffic distribution and restrictions on sub-CDNs, such as dynamically adjusting traffic distribution based on geographical location, network conditions, and server load to achieve optimal resource utilization and user experience.

#### Security Authentication

To prevent malicious attacks and abuse by unfriendly users, we have integrated multi-level security authentication mechanisms into the edge computing gateway. For unfriendly users, we can restrict their usage based on their origin, return error responses, and prevent their access to our sub-CDN. In the future, we can further enhance the security and controllability of the system by distributing tokens to control user usage limits.

### CDN Service Providers (Various Sub-CDNs)

CDN service providers are the core functional components of the Font CDN. Since the functionality of each CDN service provider may go offline at any time and be unstable, we need to use multiple CDN service providers to reduce the impact of a single CDN failure. Currently, we use ImageKit as our CDN service provider, which offers comprehensive CDN services and supports direct source setup, making it easy to deploy new CDNs in just a few minutes and scale up conveniently.

When combined with the edge computing gateway, CDN service providers can achieve dynamic CDN load balancing and traffic control, which is very convenient.

### Origin Server

The origin server stores the original font content. When users request content, the sub-CDN retrieves the content from the origin server and caches it locally, reducing the load on the origin server for subsequent requests. The origin server for the Chinese Web Font Project is deployed on Netlify, built automatically from [chinese-free-web-font-storage](https://github.com/KonghaYao/chinese-free-web-font-storage) through Netlify's 1TB monthly quota, which is almost never exhausted.

## Conclusion

The deployment architecture of Font CDN, through the collaborative work of the origin server, CDN nodes, DNS resolution, cache policies, and security, achieves efficient distribution of text and image content. By deploying Font CDN reasonably, enterprises and developers can significantly improve website performance and user experience, enhancing the availability and security of content.

