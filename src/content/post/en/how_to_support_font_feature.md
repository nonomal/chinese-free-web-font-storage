---
index: 40
title: 【字体分包】cn-font-split 4.5.0：支持复杂字形渲染的字体分包算法
description: >-
  了解 cn-font-split 4.5.0
  版本如何通过特殊分包算法支持复杂字形渲染。我们提供了简单的示例网页，详细介绍了网络字体在复杂字形渲染方面的困难、OpenType Features
  的存储方式以及如何单独汇集特性所需的 Unicode。
article:
  authors:
    - 江夏尧
  section: 技术内幕
  tags:
    - 性能优化
  pubDate: 2023-7-16
  image: ''
---
#【Font Subsetting】cn-font-split 4.5.0: Font subsetting algorithm supporting complex glyph rendering

Starting from version 4.5.0, cn-font-split supports rendering special glyphs through a special subsetting algorithm. We have created a simple example webpage showcasing the glyph features, [Feature Rendering Page](/feature/test).

## Challenges in complex glyph rendering with web fonts

When browsers render complex glyphs, they need to gather all the glyphs that make up the complex glyph into the same subset so that the browser can render them as the complex glyph in that subset.

The difficulty lies in extracting the triggering and final display glyphs from the original font file and grouping them into a subset. Therefore, when developing the subsetting algorithm, I decided to pre-calculate features and distribute them into separate subsets based on glyph characteristics to achieve rendering of complex glyph features.

## Storage method of OpenType Features

OpenType fonts store all glyphs in the glyf table, while font features are stored in the [GSUB table](https://learn.microsoft.com/zh-cn/typography/opentype/spec/gsub).

### GSUB

The storage method of the GSUB table is very complex, with various forms of storage that can represent many different types of glyph substitution methods. Due to the complexity and multitude of features, OpenType defines a Tag for each feature, along with usage instructions and binary storage declarations. Specific declarations for each Tag can be found [here](https://learn.microsoft.com/zh-cn/typography/opentype/spec/featurelist).

To simplify the retrieval of font features data, we use opentype.js to parse the GSUB table in the font and retrieve its processed features.

```ts
import { parse } from 'opentype.js';
const font = parse(ttfFile.buffer);
const substitution = font.substitution.getFeature('aalt');
// substitution is an object containing the original glyph and the replacement glyph, 'aalt' is a Feature Tag
```

### GPOS

Some font features are stored in the GPOS table of the font file, but opentype.js has poor support for this table. Therefore, our support for features related to GPOS is also limited.

## Collecting Unicode for individual features

The `substitution` obtained from opentype.js contains multiple `Glyphs`, each pointing to a specific unicode encoding. Next, we only need to extract the unicode values corresponding to the original and replacement glyphs of the feature and aggregate them into an array. These unicode values within the array need to be grouped into a subset during subsetting and then automatically made into a separate subset by the existing subsetting program, thereby enabling the final woff2 font file to support this feature within one subset.

