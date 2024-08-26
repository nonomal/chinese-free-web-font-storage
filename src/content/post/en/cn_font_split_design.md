---
index: 10
title: 【工具设计】cn-font-split 的运行原理
description: null
article:
  authors:
    - 江夏尧
  section: 技术内幕
  tags:
    - 设计流程
  pubDate: 2023-7-16
  image: ''
---
# Principles of Operation of cn-font-split

cn-font-split is a font packaging plugin for the Chinese character network plan, which can run in Node.js, Deno, and browsers, helping developers package font files.

## Operating Environment of cn-font-split

The source code of cn-font-split is written in TypeScript and is linked with a WASM functional file composed of C++ code using npm. Due to the powerful performance and cross-platform features of WebAssembly, cn-font-split can be directly run in the browser.

## Font File Packaging Process

The font file packaging process in cn-font-split mainly consists of the following steps, [this part of the code is concentrated here](https://github.com/KonghaYao/cn-font-split/blob/0aba77d4093068c1c1d543745bfae47ecb5fc73d/packages/subsets/src/main.ts#L1):

1. Read the binary font file
   1. The font file is mainly of the popular otf or ttf font file types. Other types of fonts will be converted to the otf type for operation.
2. Parse the basic information of the font
   1. This includes the font's name, size, authorization information, etc.
3. Generate SVG files
   1. The font stores the point information of the glyph, allowing it to be vector described.
   2. SVG is more space and performance efficient than PNG.
4. Collect feature relationships
   1. Collect the mapping relationship between the glyph encoding information and glyph features in the font.
   2. This step is mainly for maintaining font feature requirements.
5. Pre-subsetting (PreSubset)
   1. Prioritize the subsetting of the user-selected forced subsetting collection.
   2. Obtain the unicode character set for each subset.
   3. Exclude the forced subsetting collection.
   4. Perform interval subsetting, such as separately processing the Latin character set and the Chinese character set at this stage.
   5. Estimate the subset size through uniform sampling.
   6. Limit the maximum number of characters in each subset to prevent extreme values.
   7. Obtain the initial subsetting result.
   8. Clean up small fragment values in the initial subsetting result to ensure the appropriate size of each subset.
6. otf subsetting construction
   1. Perform subsetting construction based on the pre-subsetting information.
   2. The font subsetting completed at this step is in binary otf format.
   3. Subsetting is already completed at this step, and the subsequent steps are for optimization.
7. woff2 compression
   1. Send the otf binary to the woff2 compression thread in multi-threaded mode for format conversion.
   2. The speed boost from multi-threading is very significant, but it requires multiple CPUs.
   3. The Node.js and Bun environments use native dependencies, resulting in significantly higher speed than the WASM version.
   4. The Deno and browser versions use the WASM version for compression core, providing stronger compatibility.
8. Collect all process information during packaging, generate CSS files, report files, and other information.

