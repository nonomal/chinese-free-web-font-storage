import { For, Suspense, lazy } from 'solid-js';
import { selectDefPreviewText } from './defPreviewLanguages';
import { type FontMetaData, getMetaData } from './useGoogleFontData';
import copy from 'copy-to-clipboard';
export const GoogleFontDetailed = () => {
    const packageName = new URLSearchParams(location.search).get('packageName');
    const A = lazy(async () => {
        const meta = await getMetaData(packageName!);
        return { default: () => _GoogleFontDetailed({ meta }) };
    });
    return (
        <Suspense>
            <A></A>
        </Suspense>
    );
};
const _GoogleFontDetailed = (props: { meta: FontMetaData }) => {
    const FontStore = props.meta;

    const transformFontData = (
        item: Record<string, Object>,
        lastName: string[] = []
    ): string[][] => {
        return Object.entries(item).flatMap(([name, value]) => {
            if (name === 'url') {
                return [lastName];
            } else {
                return transformFontData(value as Record<string, Object>, [...lastName, name]);
            }
        });
    };
    return (
        (<div class="m-auto flex h-screen w-full max-w-2xl flex-col gap-2 divide-y divide-gray-300 overflow-auto p-4 ">
            <header class="py-4 text-center text-2xl">{FontStore.id}</header>
            <a
                href={`https://npm.im/@fontsource/${FontStore.id}`}
                class="flex justify-between px-2 pt-2"
                target="_blank"
            >
                <div>{$t("d5580715fede33b9f12352c90f0eddc1")}</div>
                <div>
                {
                    // @i18n-ignore
                    `@fontsource/${FontStore.id}`
                }</div>
            </a>
            <a
                href={`https://cdn.jsdelivr.net/npm/@fontsource/${FontStore.id}/`}
                class="flex justify-between px-2 pt-2"
                target="_blank"
            >
                <div>{$t("4f188f1db39c0b8778008637519fce08")}</div>
                <div>
                    {/* @i18n-ignore */`@fontsource/${FontStore.id}`}
                </div>
            </a>
            <nav class="mt-2 flex h-full flex-col overflow-auto pt-2">
                <header class="text-2xl text-orange-500">{$t("f43bf5dec4eccf2bc9d44af37247e0d5")}</header>

                <div class=" flex-1 overflow-auto  py-4">
                    <link
                        rel="stylesheet"
                        href={`https://cdn.jsdelivr.net/npm/@fontsource/${FontStore.id}/index.css`}
                    />
                    <nav class="flex flex-col gap-2  divide-y divide-violet-300">
                        <For
                            each={transformFontData(FontStore.variants)}
                            fallback={<div>{$t("9d1fc3058e5a9cf6ff97c8d21e03ce91")}</div>}
                        >
                            {(item) => {
                                return (
                                    (<div
                                        class="pt-2"
                                        style={{
                                            'font-family': FontStore.family,
                                            'font-weight': item[0],
                                            'font-style': item[1],
                                        }}
                                    >
                                        <div class="flex-none text-xl">
                                            {item.join(' - ')}

                                            <span
                                                class="float-right  mr-4 cursor-pointer rounded bg-gray-200 px-4 py-2 text-sm transition-colors duration-300 hover:bg-lime-200"
                                                onclick={() => {
                                                    copy(
                                                        `https://cdn.jsdelivr.net/npm/@fontsource/${FontStore.id}/index.css`
                                                    );
                                                }}
                                            >{$t("a924ed94ccb29647b00f3af74d1d82e3")}</span>
                                        </div>
                                        <div class="py-2 text-lg text-gray-400">
                                            {selectDefPreviewText(FontStore.id, item[2])}
                                        </div>
                                    </div>)
                                );
                            }}
                        </For>
                    </nav>
                </div>
            </nav>
            <a href="/google/">
                <div class="w-full rounded-2xl bg-sky-400 py-2 text-center text-xl text-white">{$t("c6aca1ce336bcf319ce14df280b63604")}</div>
            </a>
        </div>)
    );
};
