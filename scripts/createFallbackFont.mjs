import { createChineseCrossPlatformFallbackCss } from 'cn-font-metrics';
const css = await createChineseCrossPlatformFallbackCss('./江西拙楷.ttf');

import fs from 'fs';
fs.writeFileSync('./fallback.css', css.css);
console.log(css.fontFamilyString);
