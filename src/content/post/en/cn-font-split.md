---
title: cn-font-split 使用指南
description: null
article:
  authors:
    - 江夏尧
  section: 使用教程
  tags:
    - 使用指南
  pubDate: 2023-12-30T00:00:00.000Z
  image: >-
    https://ik.imagekit.io/chinesefonts/tr:w-1200/image/photo-1508804185872-d7badad00f7d.jfif
---
# Guide to Using cn-font-split

cn-font-split is a key component of the Chinese Font Network Project for deploying Chinese fonts on the web. It divides large Chinese font packages into smaller, easily deployable packages that can be loaded on demand, creating a highly available web font solution.

cn-font-split has exceptional cross-platform capabilities. It can run in Node.js environments, Bun environments, Deno environments, command line interfaces, and even in browser environments, with a unified and simple usage pattern!

> Due to the similarities in syntax across JavaScript runtimes, Node.js environment code will be used as an example below.

## Simple Usage in Node.js

1. Install cn-font-split

```sh
npm i cn-font-split
npm i cn-font-split # or
```

2. Write a JavaScript script

```js
// index.mjs
import fs from 'fs-extra';
import { fontSplit } from '../dist/index.js';
fontSplit({
    // This is the destination directory after packaging
    destFold: './temp/node',
    // This is the original font package
    FontPath: '../demo/public/SmileySans-Oblique.ttf',
});
```

3. Run the script

```sh
node index.mjs
```

### Introduction to Generated Font Products

1. result.css
   1. Entry CSS file, directly referenced by frontend code
2. woff2 fonts
   1. Core product, optimized font package by cn-font-split
3. index.html
   1. Default test HTML file
   2. Early test webpage file, to see the effects of the package splitting through ports
4. preview\.svg
   1. Test font image, defaultly generated
   2. You can have a simple idea of what the font looks like through this image
5. reporter.json
   1. Report file of cn-font-split
   2. It includes analysis and reference data on woff2

### Custom Configuration Properties

Key operations for generating products can be achieved through corresponding configuration properties. Here are some examples based on specific needs.

1. Force to split only certain characters

By default, cn-font-split automatically splits all characters in the font. However, there are cases where you may want to split only specific characters.

```js
{
    // Turn off automatic splitting, only the characters specified in subsets will be packaged
    autoChunk: false,

    // Force splitting, takes precedence over automatic splitting
    subsets: [
        // This is a separate package containing only characters with Unicode 31105 and 8413
        [31105, 8413]
    ]
}
```

Of course, we generally prefer to operate with strings rather than Unicode characters, so the following approach is more appropriate.

```js
{
    subsets: [
        'Chinese Font Network Project'
            .split('')
            .filter(Boolean)
            .map((i) => i.charCodeAt(0))
    ]
}
```

2. Control the generated CSS file

```js
{
    css: {
        // Change the font name referenced in the CSS
        fontFamily: '823746343',

        // In some cases, fontWeight is not needed
        fontWeight: false

        // Do not declare local characters
        localFamily: false,

        // Do not generate comments
        comment: false,
        // comment: {
        //     base: false,
        //     nameTable: false,
        //     unicodes: true
        // }
    },
}
```

3. Change the naming of the output font after packaging

> Special thanks to [richex-cn](https://github.com/richex-cn) for the help

```js
{
    renameOutputFont: '[hash:10][ext]', // Automatically truncate hash length
    renameOutputFont: '[index][ext]', // Use index instead of hash
    // Implement custom naming
    renameOutputFont({ transferred, ext, index }) {
        const algorithm = 'sha256'
        const hash = crypto.createHash(algorithm).update(transferred).digest('hex')
        // return index.toString() + ext // index naming
        return hash.slice(0, 6) + ext // Short hash naming
    }
}
```

4. Customize the test image after packaging

```js
{
    previewImage: {
        /** Text to be displayed in the image */
        text: 'Excellent Chinese fonts';
        /** File name of the preview image, without extension */
        name: 'Example';
    },
    // Do not generate
    // previewImage: false
}
```

