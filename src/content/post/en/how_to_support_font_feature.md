---
index: 40
title: "[Font Splitting] cn-font-split 4.5.0: A Font Splitting Algorithm Supporting Complex Glyph Rendering"
description: "Learn how the cn-font-split 4.5.0 version supports complex glyph rendering through a special splitting algorithm. We provide a simple example webpage detailing the challenges of web fonts in complex glyph rendering, the storage method of OpenType Features, and how to gather the necessary Unicode for individual features."
article:
    authors:
        - "KonghaYao"
    section: "Technical Insights"
    tags:
        - "Performance Optimization"
    pubDate: "2023-07-16"
    image: ""
---

# [Font Splitting] cn-font-split 4.5.0: A Font Splitting Algorithm Supporting Complex Glyph Rendering

After version 4.5.0, cn-font-split supports rendering special glyphs through a special splitting algorithm. We created a relatively simple example webpage focused on glyph features, 
[Feature Rendering Page](/en/feature/test).

## Challenges of Web Fonts in Complex Glyph Rendering

When rendering complex glyphs, the browser requires all the glyphs that make up a complex glyph to be in the same package; only then does the browser render them as the complex glyphs within that package.

The challenge lies in extracting and grouping many complex glyph-triggering characters and the final displayed characters from the original files into a single package. Therefore, I decided to calculate the Features in advance during the splitting algorithm and distribute them into separate packages to achieve rendering of the complex glyph features.

## Storage Method of OpenType Features

OpenType fonts store all glyphs in the glyf table, while font features are stored via the [GSUB table](https://learn.microsoft.com/en-us/typography/opentype/spec/gsub).

### GSUB

The storage method of the GSUB table is quite complex and has many formats, representing numerous types of glyph substitution methods. 
Due to the abundance and complexity of Features, OpenType defines a Tag for each feature and provides corresponding usage instructions and binary storage method declarations. You can [view the specific declarations for each Tag here](https://learn.microsoft.com/en-us/typography/opentype/spec/featurelist).

To simplify the acquisition of font features data, we use opentype.js to parse the GSUB table in the font and retrieve its processed features.

```ts
import { parse } from 'opentype.js';
const font = parse(ttfFile.buffer);
const substitution = font.substitution.getFeature('aalt');
// substitution is an object containing the original glyph and the replacement glyph; aalt is a Feature Tag
```

### GPOS

Some font features are stored in the GPOS table of the font file, but opentype.js has poor support for this table, so we do not support features that rely on GPOS well.

## Unicode Needed for Gathering Features Separately

The `substitution` obtained from opentype.js contains multiple `Glyphs`, which point to the corresponding specific Unicode codes. Next, we only need to get the Unicode values of the original and replacement glyphs corresponding to the features and aggregate them into an array. The Unicode values within this array need to be divided into a single package during splitting, and then through the existing splitting program, the feature glyphs can be automatically separated into packages, allowing the resultant woff2 font file to support this feature within a single package.

