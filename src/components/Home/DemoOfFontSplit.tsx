import viteLogo from '../../assets/viteLogo.svg';
import nextLogo from '../../assets/nextLogo.svg';
import nuxtLogo from '../../assets/nuxtLogo.svg';
import rspackLogo from '../../assets/rspackLogo.svg';
import astroLogo from '../../assets/astroLogo.svg';
import svelteLogo from '../../assets/svelteLogo.svg';
export const DemoOfFontSplit = () => {
    const linker = [
        null,
        null,
        {
            name: 'Vite',
            href: 'https://github.com/KonghaYao/cn-font-bundler-demo/tree/vite',
            pic: viteLogo,
        },
        {
            name: 'Next.js',
            href: 'https://github.com/KonghaYao/cn-font-bundler-demo/tree/nest',
            pic: nextLogo,
        },
        {
            name: 'Nuxt',
            href: 'https://github.com/KonghaYao/cn-font-bundler-demo/tree/nuxt',
            pic: nuxtLogo,
        },
        {
            name: 'Astro',
            href: 'https://github.com/KonghaYao/cn-font-bundler-demo/tree/astro',
            pic: astroLogo,
        },
        {
            name: 'SvelteKit',
            href: 'https://github.com/KonghaYao/cn-font-bundler-demo/tree/svelte-kit',
            pic: svelteLogo,
        },
        {
            name: 'Rspack',
            href: 'https://github.com/KonghaYao/cn-font-bundler-demo/tree/rspack',
            pic: rspackLogo,
        },
    ];
    return (
        <nav class="grid w-full max-w-7xl grid-cols-6 md:grid-cols-12 items-center gap-4 py-12 px-4 transition-colors">
            <div class="col-span-4 ">
                <span class="font-sans text-xl font-bold transition-colors hover:text-green-600">
                    <a href="https://www.npmjs.com/package/vite-plugin-font" target="_blank">
                        ⚡ vite-plugin-font ⚡
                    </a>
                </span>
                <br />
                <span class="text-md mt-4 text-gray-600">
                    简单的中文字体前端工具链支持
                    <br />✅ 缓存 | ✅ 分包 | ✅ 自动构建
                     
                </span>
                <br />
                <a
                    href="https://www.npmjs.com/package/vite-plugin-font"
                    class="text-rose-700"
                    target="_blank"
                >
                    NPM 文档 
                   <img height={20} width={138} src='https://img.shields.io/npm/dw/vite-plugin-font' loading='lazy'  alt='download count in npm' fetchpriority='low'></img>
                </a>
            </div>
            {linker.map((item) => {
                if (!item) return <div></div>;
                return (
                    <a
                        href={item.href}
                        target="_blank"
                        class="flex cursor-pointer flex-col items-center p-2 transition-colors  hover:bg-gray-200"
                    >
                        <img src={item.pic.src} alt={item.name} fetchpriority="low" loading='lazy' />
                        <div>{item.name}</div>
                        <div>Demo</div>
                    </a>
                );
            })}
        </nav>
    );
};
