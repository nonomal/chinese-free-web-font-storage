import { ThrottleAtom, atom } from '@cn-ui/reactive';
import { createEffect, onMount } from 'solid-js';
import { __CDN__ } from '../../global';
import anime from 'animejs';
const showAnime = () => {
    return anime({
        targets: '.showing-text span',
        translateY: [150, 0],
        opacity: [0, 1],
        easing: 'spring(1, 80, 10, 0)',
        duration: 300,
        delay: anime.stagger(100), // increase delay by 100ms for each elements.
    });
};
export const FontShow = () => {
    const originFont = atom({
        url: __CDN__ + '/packages/lxgwwenkai/dist/LXGWWenKai-Bold/result.css',
    });
    const font = ThrottleAtom(originFont, 2000);
    createEffect(() => {
        font();
        showAnime();
    });
    const text = $t("a1ffef8d4949668c487b88aa3958c026");
    onMount(() => {
        [...document.querySelectorAll<HTMLAnchorElement>('.display-font-show-hover')].forEach(
            (dom) => {
                dom.addEventListener('mouseover', (i) => {
                    originFont(() => ({ url: dom.dataset.src! }));
                    const el = [...document.getElementsByClassName('dynamic-font')]
                    el.forEach(el => {
                        (el as any).style = dom.dataset.style;
                    })
                });
            }
        );
    });
    return (
        (<div
            class="dynamic-font flex flex-1 select-text flex-col justify-center xl:flex-[2] "
        >
            <div class="text-sky-500">{$t("bb146219e6f7b28ccb2a8d278dbd14d0")}</div>
            <div class="showing-text my-6 text-6xl" style={'line-height:1.3;'} contentEditable>
                {text.split('').map((i) => {
                    if (i === '\n') return <br />;
                    return <span class="inline-block">{i}</span>;
                })}
            </div>
            <div class="text-purple-600">{$t("16e74966cddb65004bde0782e017fb43")}</div>
            <div class="text-gray-600">{$t("582124121fbf62c404b4b790d24d0347")}</div>
            <link rel="stylesheet" href={font().url} />
            <a
                href="https://github.com/KonghaYao/chinese-free-web-font-storage"
                class="text-rose-600"
            >{$t("372db3bb3828f23df3ae4048cad495ad")}{' '}
            </a>
        </div>)
    );
};
