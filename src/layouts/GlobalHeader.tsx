import { LanguageSwitcher } from '../routes/[lang]/_index/LanguageSwitcher';
import { MdiGithub } from '../components/icons/MdiGithub';
import { Popover } from '@cn-ui/core';
export default () => {
    return (
        (<header class="print:hidden sticky z-20 w-full top-0 left-0 h-16 flex items-center bg-white/70 gap-2 py-4 backdrop-blur-lg px-12 flex-wrap border-b">
            <A href={'/'}>
                <h1 class="text-black text-2xl">{$t('d48fdf306ce5b7eca8e902c19eaf2ba2')}</h1>
            </A>
            <span class="flex-1"></span>
            <nav class="text-sky-700 flex gap-4 md:gap-6">
                <A href={'/cdn'}>{$t('370b1608e64632e166a6cd16ef472560')}</A>
                <A href={'/online-split'} class="hidden sm:block">
                    {$t('a90f69ca6f4dc557d780fac6904591ea')}
                </A>
                <A href={'/article'}>{$t('c75625dccf148721245b46b1e3e6c79f')}</A>
                <A
                    href={'https://github.com/KonghaYao/chinese-free-web-font-storage/issues'}
                    class="hidden sm:block"
                >{$t("4e770040c7cf35fb587b2d0b99df2a32")}</A>
                <A href={'/showcase'} class="hidden sm:block">
                    {$t('1b467083c31ee80696dd477f7bd7530c')}
                </A>

                <Popover
                    trigger="hover"
                    content={
                        <ul class="w-64 bg-gray-50 border">
                            <li class="p-2 hover:bg-gray-100">
                                <A href={'/analyze'}>{$t('0a5741d8beeabccf7c7cc829f61eaf84')}</A>
                            </li>
                        </ul>
                    }
                >
                    <button>{$t('0ec9eaf9c3525eb110db58aae5912210')}</button>
                </Popover>

                <span class="w-px bg-gray-300"></span>
                {/* Github 相关地址  */}
                <Popover
                    trigger="hover"
                    content={
                        <ul class="w-64 bg-gray-50 border">
                            <li class="p-2 hover:bg-gray-100">
                                <A
                                    href="https://github.com/KonghaYao/chinese-free-web-font-storage"
                                    target="_blank"
                                >
                                    <div class="text-sm text-neutral-500">
                                        chinese-free-web-font-storage
                                    </div>
                                    <h3 class="text-xl">
                                        {$t('e26f7451c6262ee407dd01220cabc7b1')}
                                    </h3>
                                    <div>
                                        <img
                                            alt={$t('5c30ffa0bbcea21194c6d9073273a161')}
                                            loading="lazy"
                                            src="https://img.shields.io/github/stars/KonghaYao/chinese-free-web-font-storage?style=flat"
                                        />
                                    </div>
                                </A>
                            </li>
                            <li class="p-2 hover:bg-gray-100">
                                <A
                                    href="https://github.com/KonghaYao/cn-font-split"
                                    target="_blank"
                                >
                                    <div class="text-sm text-neutral-500">cn-font-split</div>
                                    <h3 class="text-xl">
                                        {$t('48928df0c05291cade11cc715c77f43d')}
                                    </h3>
                                    <div class="flex gap-2">
                                        <img
                                            alt={$t('5c30ffa0bbcea21194c6d9073273a161')}
                                            loading="lazy"
                                            src="https://img.shields.io/github/stars/KonghaYao/cn-font-split?style=flat"
                                        />
                                        <img
                                            alt={$t('5c30ffa0bbcea21194c6d9073273a161')}
                                            loading="lazy"
                                            src="https://data.jsdelivr.com/v1/package/npm/cn-font-split/badge?style=rounded"
                                        />
                                    </div>
                                </A>
                            </li>
                            <li class="p-2 hover:bg-gray-100">
                                <A href="https://github.com/KonghaYao/font-server" target="_blank">
                                    <div class="text-sm text-neutral-500">font-server</div>
                                    <h3 class="text-xl">
                                        {$t('0939794ddbc872708aa6a5ba70c44c83')}
                                    </h3>
                                    <div>
                                        <img
                                            alt={$t('5c30ffa0bbcea21194c6d9073273a161')}
                                            loading="lazy"
                                            src="https://img.shields.io/github/stars/KonghaYao/font-server?style=flat"
                                        />
                                    </div>
                                </A>
                            </li>
                        </ul>
                    }
                    title={$t('e1adbcbb92c622d0b3e619f9d0730abf')}
                >
                    <MdiGithub />
                </Popover>
                <LanguageSwitcher />
            </nav>
        </header>)
    );
};
