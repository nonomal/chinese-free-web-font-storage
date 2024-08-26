---
index: 10
title: 中文网字计划概述
description: >-
  中文网字计划致力于在互联网中提供更加便捷实用的全字符集中文渲染方案。中文网字计划通过精巧设计的字体分包方式，将庞大的字体文件切割为多个小型静态分包部署于云端，在全网领域内都可快捷、稳定地进行加载。我们为提高中文字体在网络中的流通体验而努力！
article:
  authors:
    - 江夏尧
  section: 使用教程
  tags:
    - 计划概述
  pubDate: 2023-5-23
  image: >-
    https://ik.imagekit.io/chinesefonts/tr:w-1200/image/photo-1508804185872-d7badad00f7d.jfif
---
# 📖 Chinese Web Font Project

The Chinese Web Font Project aims to provide a more convenient and practical full-character Chinese rendering solution on the internet. By ingeniously packaging fonts into smaller static bundles deployed on the cloud, the project enables quick and stable loading across the entire web. We strive to enhance the circulation experience of Chinese fonts on the web!

## 🤔 Why Use Unique Chinese Fonts Extensively on the Web?

### 🎨 Enhancing Artistic Expression

The frontend domain is a technical field where information is presented in the most diverse and flexible manner. It encompasses various text-based websites like news, blogs, and forums, as well as dynamic data visualization websites and stylish web games. In many detail-oriented websites, the role of Chinese fonts is significant. For example, in pixel games, pixel fonts are used to match the game's visual world; special decorative fonts are used in data visualization websites to convey the emotions of the theme; and light and elegant fonts are used in personal blogs to showcase artistic pursuits. Choosing the right font is a key element in giving a webpage a unique style.

![Example of Dark Shadow](/assets/pokemon_example.png)

For us coders, code is the most basic material, but what we want to build, produce, and be remembered for are these more emotional products.

### 🔔 Improving Product Recognition and Global Standardization

Chinese fonts effectively represent brand images, enhance product recognition, and help products better convey their philosophy and values. Chinese fonts also have unique applications in different design elements.

For example, in the game Genshin Impact developed by miHoYo, they use the [Han Yi Wen Hei font](https://www.hanyi.com.cn/productdetail?id=986), which exhibits a consistent artistic style and textual expression in Chinese, Japanese, Korean, and English languages. Even when presented in the same image, there is no sense of discordance. This greatly enhances the visual effects and user experience of players from different language backgrounds in the game.

![Consistency in Genshin Impact across Four Languages](/assets/genshin_example.png)

For Chinese classical texts, aesthetics are fully displayed in the characters. Using a beautifully styled ancient Chinese font can bring out the essence of poems and literary works. For example, in the website "Chinese Poetry Dictionary," Ming Dynasty fonts are used as the main thematic text. This font style uses ancient writing styles combined with a "rubbings" UI style to present text in a unique way, better showcasing the essence of ancient literature.

![Application of Ming Dynasty Font in Chinese Poetry Dictionary](/assets/chinese_poetry_example.png)

## 🚀 How to Implement Font Acceleration on the Web?

In the current internet environment, English fonts are widely used. Due to the smaller number of English characters, loading the entire font package does not have a significant impact on web pages. However, compared to English characters, Chinese characters have a higher quantity and complexity. Therefore, Chinese fonts are much larger than English fonts in size, and loading Chinese fonts often consumes a large amount of network bandwidth. For native applications, this issue can be addressed through built-in font packages, but for web loading, it is a fatal weakness.

One current method for using Chinese fonts on web pages is to analyze the Chinese characters contained in the page, extract the font, package it separately, and store it on a server. This segmentation method significantly reduces the impact of font size on bandwidth and is suitable for websites like personal blogs. However, as a project grows, the need for segmenting text increases. Using this non-full-scale loading approach may result in different articles involving different characters, causing variations in the packaged character ranges and affecting server caching and resource utilization.

![Google Fonts](/assets/google_fonts_example.png)

On the Google Fonts website, Google utilizes the latest CSS feature `unicode-range` to achieve on-demand loading of CJK (Chinese, Japanese, Korean) fonts and successfully implements full-scale on-demand loading of Chinese fonts on web pages. They also provide demonstrations of fonts like the ZCOOL series and Noto series. Technically, all loaded files are static files that can be published once via CDN for widespread loading, offering reliable speed and stability. Even websites like blogs and forums that focus on lengthy texts can use this method.

Building on Google Fonts' segmentation solution, the Chinese Web Font Project categorizes font usage sequences, optimizes the packaging intervals for various characters, and employs faster global CDN services, achieving a nearly perfect solution for Chinese font implementation. The open-source development toolchain in the project seamlessly integrates into frontend development, providing theoretical and technical support for using Chinese fonts on the web.

## 🎉 The Challenging Development Journey of the Chinese Web Font Project

The hardships of the Chinese Web Font Project began with initial technical research. I studied numerous solutions for loading Chinese fonts and the technology behind Google Fonts and FontSource websites, learning their design methods and forming my own ideas. I planned to create a font segmentation tool using existing technologies and to use this tool along with other free commercial fonts to create remarkable design effects for my web projects. Following that, I started coding the first line of code 📖 on Github. A few days later, the first version of cn-font-split was completed.

However, since we had such a good tool, why not use it more? 😂 Therefore, I established a repository for packaged fonts, perfected the packaging of collected free commercial fonts, placed them on my own CDN as a centralized management program, and presented them through a frontend page I developed. Seeing the beautiful fonts rendered on web pages was truly amazing!

Later on, I decided to learn about web performance optimization and used the homepage as a testing ground. While studying web performance metrics and exploring new programming approaches, I optimized the performance of the Chinese Web Font Project's website to achieve exceptional LightHouse scores and ensured that all font loading completed within 3 seconds. This confirmed that my direction was right, and this method of using web fonts is entirely feasible and performs well 🎉.

I then delved into the powerful performance capabilities that Web Worker's multithreading and WebAssembly bring to JavaScript. Although I do not understand other languages like C++ and Rust, through the power of the GitHub community, I attempted to refactor the packaging logic and JavaScript shell code, enhancing compatibility and smoothly integrating them into cn-font-split. Additionally, I gained experience in multithread programming with Web Workers, distributing slow compression logic across multiple cores, which surprisingly doubled the efficiency of the entire cn-font-split process!

Now, as I document all these experiences, I hope to leave behind my knowledge, return to the essence of technology, and continue optimizing the effects of web fonts. Although I do not know what my next project will be, I believe that the experience gained from the Chinese Web Font Project has elevated me to a higher level, and my efforts have not been in vain. 🎇🌌

## ⌨️ Relevant Technical Resources

![Chinese Web Font Project—Related Technical Resources](/assets/how_we_deploy_font.png)

### 📦 [cn-font-split](https://www.npmjs.com/package/cn-font-split)

cn-font-split is a font packaging tool based on Node.js that can split source font files into multiple packages and provides preview results and data analysis functionality 📊. The Chinese Web Font Project uses cn-font-split as its core to build a range of packaged fonts. If you need to easily segment and statically deploy private fonts, this tool is perfect for you.

### 🏪 [Chinese Web Font Project Font Repository](https://github.com/KonghaYao/chinese-free-web-font-storage)

The Chinese Web Font Project has tested the practical effects of deploying packages of free commercial fonts. On the project's homepage, you can view numerous font files already set up for practical use. Each detailed font page also offers corresponding font data analysis!

### ✒️ [Chinese Web Font Project Frontend Project](https://github.com/KonghaYao/chinese-free-web-font-storage/tree/feature/docs)

The Chinese Web Font Project's frontend project showcases data from the font repository and provides practical font effects. Additionally, the project plans to establish a section specifically for showcasing articles on open-source achievements to help users gain a deeper understanding of fonts, design, and frontend technology. This frontend project is not just a data display platform but also a community that aggregates resources, offering technical interaction for font enthusiasts and frontend professionals.

### 🍕 [Online Font Packager](/online-split)

cn-font-split has undergone magical code refactoring, enabling it to run in any standard Node.js or web environment. This means that almost all modern browsers can directly package fonts online, making it easy for developers who only need to package fonts once without writing any code.

### 🤖 [Font Management System](https://github.com/KonghaYao/font-server)

The font management system is a backend program suitable for managing, packaging, and deploying fonts in medium to large projects. It automates font file management, helping developers work more efficiently with fonts. You can upload font files in a visual interface, click a button to automatically segment and deploy fonts to private clouds, making font management quick and convenient.

### 📊 [Online Font Analyzer](/analyze)

The online font analyzer is a project currently in development, aiming to provide specific font details and analyze character coverage on web pages.

