import { SearchBox } from './_cdn/SearchBox';
import { ServerLink } from './_cdn/CDNHome';
import Hero from '~/assets/eirc-shi-pxfrGGnHVYA-unsplash.jpg?url';
import Layout from '~/layouts/HomeLayout';
import './_index/FontList.css';
import { Suspense } from 'solid-js';

export default () => {
    return (
        <Layout
            title={$t('2b14604c5ebebb21aa2fc5b812ceb6a5')}
            description={$t('617986ce63a9626b958ee85ed30b0cd4')}
            keywords={$t('ff8b08b31211b82e88b1da36d0886c6c')}
        >
            <main class="w-full  p-8 text-center ">
                <section class="py-8 grid grid-cols-12 px-12 gap-12 bg-gradient-circle">
                    <div class=" text-left col-span-5 col-start-2">
                        <h1 class="pb-8 pt-12 text-6xl ">
                            {$t('e7091d9aaf03260ce2874438c20136ae')}
                        </h1>
                        <p class="mb-8 text-xl text-gray-500">
                            {$t('dc208e9641b92a5874c1238106ebd3bf')}
                        </p>
                        <div class="text-left mb-8 mt-8 text-gray-500">
                            <span>{$t('f19212594a7b8ea20fce413f934ee362')}</span>
                            <A href={'/message/cdn'}>{$t('c1dd18c0d62427cd06a2974105c4c364')}</A>
                        </div>
                        <ServerLink></ServerLink>
                        <A
                            href={'/'}
                            class=" py-2 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100/80 rounded-full dark:bg-gray-800 transition-all dark:text-white hover:bg-gray-300/80 dark:hover:bg-gray-700"
                            role="alert"
                        >
                            <span class="bg-rose-600 rounded-full text-white px-4 py-1.5 mr-3">
                                {$t('d48fdf306ce5b7eca8e902c19eaf2ba2')}
                            </span>
                            <span class="font-medium">
                                {$t('b327a3146fb6579a9364be3c0bd05c1d')}
                                {'>'}
                            </span>
                        </A>
                    </div>
                    <div class="col-span-5 bg-white shadow-md rounded-xl p-2">
                        <div
                            class="rounded-md h-full bg-cover bg-center bg-no-repeat"
                            style={{
                                'background-image': `url(${Hero})`,
                            }}
                        >
                            <span class="text-xs text-white/10 float-end">
                                {$t('8d2990b588a2d402be15f9f964f82fa2')}
                                <A href="https://unsplash.com/@wwolf5566?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
                                    {$t('adf8185456ec0b78e01185fff377e8c3')}
                                </A>
                                on
                                <a href="https://unsplash.com/photos/a-picture-frame-with-asian-writing-on-it-pxfrGGnHVYA?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
                                    Unsplash
                                </a>
                            </span>
                        </div>
                    </div>

                    <ul class="mb-4 flex justify-between rounded-md text-left col-span-10 col-start-2 divide-x">
                        <li class=" py-4 px-6 rounded-xl max-w-md">
                            <div class="mb-4 text-xl">{$t('cecdf4cde8306fd987da28d639a4dcda')}</div>
                            <div class="text-gray-400 text-md">
                                {$t('95e2bd2d0c64b30731ee92b8bdf760a6')}
                                <span itemprop="duration">
                                    {$t('5c83b1cd6af4da9824f9aab49962f4fe')}
                                </span>
                                {$t('b0a747444c4054ca435a68a627f76a6a')}
                                <b class="text-gray-600 mx-2">300,000</b>
                                {$t('02368b5c85694ce6b7db95609c0db274')}
                            </div>
                        </li>
                        <li class=" py-4 px-6 rounded-xl max-w-md">
                            <div class="mb-4 text-xl">{$t('e1bcbc09d3b90540e99a0d878e1f8d49')}</div>
                            <div class="text-gray-400 text-md">
                                {$t('10f094cc1d61c82db6aa67b635640953')}
                            </div>
                        </li>
                        <li class=" py-4 px-6 rounded-xl max-w-md">
                            <div class="mb-4 text-xl">{$t('d52b0f47067d2c85a2ea23088caec47f')}</div>
                            <div class="text-gray-400 text-md">
                                {$t('568155ffa4b65fb5c5631da5ee249858')}
                                <A
                                    href="https://github.com/KonghaYao/chinese-free-web-font-storage"
                                    class="text-gray-600 mx-2"
                                >
                                    GitHub
                                </A>
                                {$t('1b06f9935f5b8ff950ce49cafeaf5503')}
                            </div>
                        </li>
                    </ul>
                    <p class="flex justify-center gap-4 col-span-12 border-b border-gray-300 pb-4 my-8">
                        <span>{$t('51cd6bb6a7f0ba553951b2f52a074882')}</span>
                        <A
                            href="https://github.com/KonghaYao/chinese-free-web-font-storage"
                            target="_blank"
                            class="text-yellow-500"
                        >
                            {$t('f6bc6bf2cef3072f521be7cfeb1c4918')}
                        </A>
                        <span class="text-emerald-600">
                            {$t('d0233601390402301f9fc75bec45be5a')}
                        </span>
                        <A
                            href="https://chinese-font.netlify.app"
                            target="_blank"
                            class="text-purple-500"
                        >
                            {$t('cbadea75ba6c0efc817ee7354edcc4d6')}
                        </A>
                        😀
                    </p>
                </section>
                <Suspense>
                    <SearchBox />
                </Suspense>
            </main>
        </Layout>
    );
};
