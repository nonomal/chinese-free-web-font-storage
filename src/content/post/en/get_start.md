---
index: 10
title: "Overview of the Chinese Web Font Project"
description: "The Chinese Web Font Project aims to provide a more convenient and practical full character set Chinese rendering solution for the internet. By employing a cleverly designed font packaging method, large font files are divided into multiple small static packages deployed in the cloud, ensuring fast and stable loading across the web. We are committed to enhancing the circulation experience of Chinese fonts online!"
article:
    authors:
        - "KonghaYao"
    section: "How to Use"
    tags:
        - "Project Overview"
    pubDate: 2023-05-23
    image: "https://ik.imagekit.io/chinesefonts/tr:w-1200/image/photo-1508804185872-d7badad00f7d.jfif"
---

# 📖 Chinese Web Font Project

The Chinese Web Font Project is dedicated to providing a more convenient and practical full character set Chinese rendering solution for the internet. By utilizing a cleverly designed font packaging method, large font files are divided into multiple small static packages deployed in the cloud, allowing for rapid and stable loading across the web. We strive to enhance the experience of using Chinese fonts online!

## 🤔 Why Use Unique Chinese Fonts on the Web?

### 🎨 Enhancing Artistic Expression

The front-end field is one of the most diverse and flexible technical areas for information presentation. It encompasses various text-based news, blogs, and forum websites, as well as dynamic data visualization sites and uniquely styled web games. In many detail-oriented websites, the role of Chinese fonts cannot be underestimated. For example, pixel art games use pixel fonts to fit the overall game world view, data visualization websites employ decorative fonts to convey emotions, and personal blogs often use elegant fonts to reflect personal artistic pursuits. Choosing the right font is a key factor in giving a webpage a unique style.

![Dark Phantom](/assets/pokemon_example.png)

For us developers, code is the most fundamental material, yet what we aim to build and create, and what people remember, are often these more emotional products.

### 🔔 Increasing Product Style Recognition and International Consistency

Chinese fonts can effectively present brand images, enhance product recognition, and help communicate a product's philosophy and values more effectively. Chinese fonts also have unique applications in different design elements.

For instance, in the game Genshin Impact developed by miHoYo, the [Hanyi Wenhei font](https://www.hanyi.com.cn/productdetail?id=986) is used, which exhibits a consistent artistic style and textual expressiveness across Chinese, Japanese, Korean, and English environments. Even when presented together in the same image, there is no sense of incongruity, greatly enhancing the visual experience and user experience for players of different languages.

![Consistency of Four Languages in Genshin Impact](/assets/genshin_example.png)

In the context of ancient Chinese texts, aesthetic beauty is fully represented in the characters. Using a beautifully styled ancient font can vividly express the essence of poetry and prose. For example, the website "Chinese Poetry Anthology" employs the Huiwen Ming Dynasty font as its theme text. This font adopts ancient writing styles along with a "stele rubbing" UI design, allowing texts to be presented in a distinctive manner, better showcasing the essence of ancient literature.

![Application of Huiwen Ming Dynasty in Chinese Poetry Anthology](/assets/chinese_poetry_example.png)

## 🚀 How to Achieve Font Acceleration on the Web?

In the current internet environment, the use of English fonts is already very common. Given the smaller number of English characters, loading an entire font package usually does not impact webpage performance. However, in contrast, Chinese characters are more numerous and complex in outline. Consequently, the size of Chinese font files is often significantly larger than that of English fonts, and loading Chinese fonts tends to consume substantial bandwidth. While native applications can address this issue through built-in font packages, such a drawback can be fatal for web loading.

Currently, one method of using Chinese fonts on the web involves analyzing the Chinese characters contained within a webpage, extracting the required fonts, and storing them in separate packages on the server. This slicing approach greatly reduces the impact of font size on bandwidth, making it suitable for personal blogs and similar sites. However, as a project expands, the need for more sliced text increases, which may cause different articles to involve distinct characters, leading to varied character ranges in packaged fonts, thus affecting server cache and resource utilization.

![Google Fonts](/assets/google_fonts_example.png)

On the Google Fonts website, Google employs the latest CSS feature, `unicode-range`, to achieve on-demand loading of CJK (Chinese, Japanese, and Korean) fonts while successfully implementing comprehensive on-demand loading of Chinese fonts for web use. They also showcase effects of various fonts such as the Zcool and Noto series. Technically, all loaded files are static files that can be distributed via CDN and accessed anywhere, ensuring reliable speed and stability. Even for websites focused on long texts, such as blogs and forums, this method can be utilized.

Building on the slicing approach from Google Fonts, the Chinese Web Font Project has categorized the order of font usage, optimized the packaging intervals for various characters, and employed faster global CDN services to achieve an almost perfect implementation of the Chinese character rendering solution. Additionally, the open-source development tool stream in the project can now seamlessly integrate into front-end development, providing both theoretical and technical support for the use of Chinese fonts on the web.

## 🎉 The Challenging Development Process of the Chinese Web Font Project

The arduous journey of the Chinese Web Font Project began with initial technical research. I reviewed numerous solutions for loading Chinese fonts and studied the technologies present on Google Fonts and FontSource sites, learning their design methodologies and formulating some of my own ideas. I planned to utilize existing technologies to create a Chinese font slicing tool, and through this tool and other free commercial fonts, achieve a remarkable design for my website projects. Subsequently, I wrote my first line of code on GitHub 📖. A few days later, the first version of cn-font-split was complete.

However, having such a great tool led me to wonder why not use it more frequently? 😂 So, I established a repository for the finished font packages, meticulously packaging the collected free commercial fonts and hosting them on my own CDN as a centralized management program. Seeing beautifully rendered fonts on web pages was truly fantastic!

Later on, I considered learning about web performance optimization, using the homepage as a testing ground. While studying the performance metrics, I tried out new programming approaches. This practical experience improved the LightHouse metrics of the Chinese Web Font Project's official website to excellence, with font loading speeds completing within 3 seconds, confirming that my direction was correct; this method of using web fonts is entirely feasible and performs admirably 🎉.

Afterwards, I was introduced to the powerful capabilities that Web Workers and WebAssembly offer for JavaScript. Although I was unfamiliar with languages like C++ and Rust, with the help of the GitHub community, I attempted to refactor its packaging logic and JavaScript shell code, which improved compatibility and smoothly integrated it into cn-font-split. At the same time, I learned about multi-threaded programming best practices with Web Workers, distributing the slow compression logic across cores, remarkably doubling the overall efficiency of cn-font-split!

Now, I am documenting all of this to leave my experiences, return to the essence of technology, and continue to optimize the effectiveness of the web font solution. While I'm unsure of what my next project will be, I believe the experience from the Chinese Web Font Project has elevated my skills, and my efforts have not been in vain. 🎇🌌

## ⌨️ Related Technical Resources

![Chinese Web Font Project - Related Technical Resources](/assets/how_we_deploy_font.png)

### 📦 [cn-font-split](https://www.npmjs.com/package/cn-font-split)

cn-font-split is a Node.js-based font splitter that can divide source font files into multiple packages while providing preview results and data analysis features 📊. The Chinese Web Font Project uses cn-font-split as its core tool, creating a series of finished font packages. If you need to perform simple packaging and static deployment of private fonts, it is the perfect choice.

### 🏪 [Chinese Web Font Project Font Repository](https://github.com/KonghaYao/chinese-free-web-font-storage)

The Chinese Web Font Project has conducted practical testing by deploying free commercial font packages. On the homepage of the project, you can see many fonts that have been put into practical use, and detailed font pages provide relevant font data analysis!

### ✒️ [Chinese Web Font Project Front-End Project](https://github.com/KonghaYao/chinese-free-web-font-storage/tree/feature/docs)

The front end of the Chinese Web Font Project showcases data from the font repository through constructed pages, demonstrating practical effects of the fonts. Additionally, we plan to launch a section dedicated to showcasing open-source project articles to help users delve deeper into fonts, design, and front-end technology. This front-end project is not just a data display platform; it is a community gathering resources to provide technical interaction for font enthusiasts and front-end professionals.

### 🍕 [Online Font Splitter](/online-split)

Thanks to the magical code refactoring, cn-font-split is now operable in any standard Node.js or Web environment. This means that nearly all modern browsers can directly use the online font packaging feature, allowing developers to split fonts without writing any code for a one-time package.

### 🤖 [Font Management System](https://github.com/KonghaYao/font-server)

The font management system is a back-end program designed for font management, packaging, and deployment in medium to large scale projects. It automates the management of font files, helping developers carry out font-related tasks more efficiently. You can upload font files in the visual interface, click a button for automatic slicing, and upload them to private cloud storage for convenient deployment.

### 📊 [Online Font Analyzer](/analyze)

The online font analyzer is an ongoing development project aimed at enabling users to view specific font details on web pages, analyzing character coverage and other functionalities.

