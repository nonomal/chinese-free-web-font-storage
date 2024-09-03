---
index: 10
title: "Tool Design: The Operating Principle of cn-font-split"
description: ""
article:
    authors:
        - "KonghaYao"
    section: "Technical Insights"
    tags:
        - "Design Process"
    pubDate: 2023-07-16
    image: ""
---

# Tool Design: The Operating Principle of cn-font-split

cn-font-split is a font packaging plugin for the Chinese web character plan that can run in Node.js, Deno, and browsers, helping developers package font files.

## The Operating Environment of cn-font-split

The source code of cn-font-split is written in TypeScript, and it uses npm to link to C++ code-based WASM functionality. Thanks to the powerful performance and cross-platform characteristics of WebAssembly, cn-font-split can be run directly in the browser.

## The Process of Packaging Font Files

The process of packaging font files in cn-font-split is mainly divided into the following steps. [This part of the code is centralized here](https://github.com/KonghaYao/cn-font-split/blob/0aba77d4093068c1c1d543745bfae47ecb5fc73d/packages/subsets/src/main.ts#L1).

1. Read the binary font file  
   1. The main types of font files are mainstream OTF or TTF font files. Other types of fonts will be converted to OTF for processing.
2. Parse basic font information  
   1. This includes the font's name, size, licensing information, and more.
3. Generate SVG files  
   1. The font stores glyph point information, allowing for vector descriptions.  
   2. SVG is more space-efficient and performs better than PNG.
4. Collect feature relationships  
   1. Collect the encoding information of glyphs in the font and the mapping relationship of glyph features.  
   2. This step mainly supports font feature requirements.
5. Pre-subset  
   1. Prioritize the forced subsetting collection selected by the user.  
   2. Obtain all Unicode character sets within the package.  
   3. Exclude the forced subsetting collection.  
   4. Perform interval subsetting, such as processing the Latin character set and the Chinese character set separately at this stage.  
   5. Use uniform sampling to estimate the initial size of the subsets.  
   6. Limit the maximum number of characters per package to prevent extreme values.  
   7. Obtain the initial subsetting results.  
   8. Clean up small value fragments from the initial subsetting results to ensure each package size is appropriate.
6. OTF subsetting construction  
   1. Construct the subset based on the pre-subsetting information.  
   2. The font subset built after completion is of OTF binary type.  
   3. This step completes the subsetting; the following parts focus on optimization.
7. WOFF2 Compression  
   1. Send the OTF binary to WOFF2 compression threads via a multi-threaded mode for format conversion.  
   2. The speed increase brought by multi-threading is very noticeable but requires multiple CPUs.  
   3. The Node.js and Bun environments use native dependencies, significantly speeding up beyond the WASM version.  
   4. The Deno and browser versions use the WASM version for the compression core, offering stronger compatibility.
8. Collect all process information during the packaging process, generating CSS files, report files, and other information.

