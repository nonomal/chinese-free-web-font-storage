import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import solidJs from '@astrojs/solid-js';
import tailwind from '@astrojs/tailwind';
import robotsTxt from 'astro-robots-txt';
import compress from 'astro-compress';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { loadEnv } from 'vite';
import netlify from '@astrojs/netlify'
import font from 'vite-plugin-font';
import AutoImport from 'unplugin-auto-import/astro'
import path from 'path'
const env = loadEnv(import.meta.env.MODE, process.cwd(), '');
// https://astro.build/config
export default defineConfig({
    site: 'https://chinese-font.netlify.app',

    integrations: [
        AutoImport({
            include: [
                /\.[tj]sx?$/,
                /\.astro$/,
            ],
            imports: [
                {
                    [path.resolve('./src/i18n')]: [
                        // default imports
                        ['$t'], // import { default as axios } from 'axios',
                    ],
                },
            ],
            dts: './auto-imports.d.ts',
        }), sitemap(), solidJs(), tailwind(), robotsTxt(), compress()],
    output: 'server',
    adapter: netlify({
    }),
    i18n: {
        defaultLocale: "zh-cn",
        prefixDefaultLocale: true,
        locales: ["zh-cn", "en"],
    },
    vite: {
        optimizeDeps: {
            exclude: ['cn-font-split'],
            include: ['dayjs/esm/index.js'],
        },
        build: { sourcemap: true },
        plugins: [
            viteStaticCopy({
                targets: [
                    {
                        src: 'assets',
                        dest: '',
                    },
                ],
            }),
            font.vite({
                scanFiles: {
                    // ?subsets will match default
                    home: [
                        'src/pages/[lang]/index.astro',
                        'src/components/AllFooter.astro',
                        'src/components/TechSupport.astro',
                        'src/components/GlobalHeader.astro',
                        'src/components/Home/*.tsx',
                        'src/components/Home/*.astro',
                        'src/i18n/*.json',
                        'index.json',
                    ],
                    fontExample: [
                        'src/components/PerformanceOfTool.astro',
                        'src/components/FontsList.astro',
                    ],
                },
            }),
        ],
    },
    markdown: {
        shikiConfig: {
            // Choose from Shiki's built-in themes (or add your own)
            // https://github.com/shikijs/shiki/blob/main/docs/themes.md
            theme: 'vitesse-light',
            // Enable word wrap to prevent horizontal scrolling
            wrap: true,
        },
        render: [
            {
                rehypePlugins: [
                    'rehype-slug',
                    ['rehype-autolink-headings', { behavior: 'append' }],
                    ['rehype-toc', { headings: ['h1', 'h2'] }],
                ],
            },
        ],
    },
});
