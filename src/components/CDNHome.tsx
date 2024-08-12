import { DebounceAtom, NullAtom, atom, reflect } from '@cn-ui/reactive';
import { VModel } from '../utils/VModel';
import { CountUp } from 'countup.js/src/countUp';
import './CDNHome.less';

import Deno from '../assets/logo/Deno.svg?url';
import Netlify from '../assets/logo/Netlify.svg?url';
export function ServerLink() {
    return (
        <div class="mb-12 flex h-10  gap-6  col-span-12">
            <a href="https://deno.com/deploy" class="flex h-full flex-none " target="_blank">
                <img src={Deno} alt="deno logo"></img>
            </a>
            <a href="https://netlify.com/" class="flex h-full flex-none" target="_blank">
                <img src={Netlify} alt="netlify logo"></img>
            </a>
            <a href="https://imagekit.io" class="flex h-full flex-none" target="_blank">
                <img class="scale-75" src="/brand/imagekit.svg" alt="imagekit logo"></img>
            </a>
        </div>
    );
}

import data from '../../index.json';
import { __CDN__ } from '../global';
import { Show, onMount } from 'solid-js';
import copy from 'copy-to-clipboard';
import { Notice } from '../Notice';
import { sortFontListByRemoteCount } from '../api/fontListIndex';
export const SearchBox = () => {
    const search = atom('');
    const ListContainer = NullAtom(null);
    onMount(() => {
        sortFontListByRemoteCount(ListContainer()!);
    });
    const items = DebounceAtom(
        reflect(() =>
            Object.entries(data)
                .flatMap(([key, val]) => {
                    return {
                        name: val.name,
                        fonts: val.remotePath.map(({ path: remote, css }) => {
                            const [_, name] = remote.match(/dist\/(.*?)\/result/)!;
                            const pic = remote.replace('result.css', 'preview.svg');
                            return {
                                url: `https://chinese-font.netlify.app/fonts/${key}/${name}`,
                                cdn: remote,
                                name: val.name,
                                subName: name,
                                css,
                                pic,
                                id: key,
                            };
                        }),
                    };
                })
                .reverse()
                .filter((i) => {
                    if (!search()) return true;
                    return i.name.includes(search());
                })
        )
    );
    return (
        <>
            <div class="sticky top-16 z-10 flex items-center rounded-md border border-solid border-gray-200 bg-white px-4  py-4 text-gray-600 shadow-lg transition-shadow">
                <i class="mr-2 h-5 w-5">
                    <svg
                        viewBox="64 64 896 896"
                        data-icon="search"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" />
                    </svg>
                </i>
                <input
                    type="text"
                    class="flex-1 appearance-none bg-transparent text-blue-400 outline-none"
                    {...VModel(search)}
                    placeholder="试着搜索你想要的字体"
                />
                <Show when={items().length}>
                    <span class="flex-none text-xs text-gray-400">
                        为你找到 {items().length} 份字体
                    </span>
                </Show>
            </div>

            <ul
                ref={ListContainer}
                id="cdn-font-list"
                class="grid grid-cols-1 gap-4 py-8  sm:grid-cols-2  md:grid-cols-3 xl:grid-cols-5"
            >
                {items().map((i) => {
                    return i.fonts.map((font) => {
                        const copied = atom(false);
                        return (
                            <>
                                <li
                                    class=" z-0 flex justify-between rounded border bg-white p-2 transition-all hover:z-10 hover:shadow-md hover:backdrop-blur-sm"
                                    classList={{
                                        'col-span-2': copied()
                                    }}
                                    data-id={font.id}
                                >
                                    <section class='flex-1 flex flex-col justify-between'>
                                        <span class="mb-2 border-b pb-2 text-2xl text-rose-400">
                                            {font.name}
                                        </span>
                                        <img loading="lazy" src={`${__CDN__}/${font.pic}`} alt="" />
                                        <span
                                            title={`https://chinese-fonts-cdn.deno.dev/${font.cdn}`}
                                            class="flex justify-evenly border-t pt-1 text-xs text-blue-400"
                                        >
                                            <span>{font.subName}</span>
                                            <span>·</span>
                                            <span
                                                class="cursor-pointer text-blue-600 transition-colors"
                                                onclick={() => {
                                                    copy(`https://chinese-fonts-cdn.deno.dev/${font.cdn}`);
                                                    Notice.success('复制 CDN 地址成功');
                                                    copied(true)
                                                }}
                                            >
                                                复制 CSS
                                            </span>
                                            <span>·</span>
                                            <a
                                                href={font.url}
                                                class="cursor-pointer transition-colors hover:text-green-600"
                                            >
                                                详情
                                            </a>

                                        </span>
                                    </section>
                                    <Show when={copied()}>
                                        <div class='flex-1 overflow-hidden flex flex-col text-xs text-left gap-1 text-neutral-600 px-2 bg-gray-100' >

                                            <h4>1. 请使用 Link 标签导入 CSS 文件</h4>
                                            <pre class=' text-wrap select-all bg-gray-200 rounded-md p-1' >
                                                <code>
                                                    &lt;{`link rel='stylesheet' href='https://chinese-fonts-cdn.deno.dev/${font.cdn}' /`}&gt;

                                                </code>
                                            </pre>
                                            <h4>2. 请为元素添加 css</h4>
                                            <pre class='w-full select-all bg-gray-200 rounded-md p-1'>
                                                <code class='select-all'>
                                                    {`body {
    font-family: '${font.css.family}';
    font-weight: ${font.css.weight};
};`}
                                                </code>
                                            </pre>
                                        </div>
                                    </Show>
                                </li>

                            </>
                        );
                    });
                })}
            </ul>
        </>
    );
};
