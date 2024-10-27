import { For, Show, createEffect } from 'solid-js';
import { DragDropButton } from '~/components/DragButton/index';
import { ArrayAtom, atom, classHelper, resource } from '@cn-ui/reactive';
import prettyBytes from 'pretty-bytes';
import { Notice } from '~/Notice';

export default () => {
    const file = atom<File | null>(null);
    const logMessage = ArrayAtom<string[]>([]);
    const resultList = atom<{ name: string; buffer: Uint8Array }[]>([]);
    /** 监控 cn-font-split 的加载状态并给予提示 */
    const fontSplitStatus = resource(preload);

    createEffect(() => {
        fontSplitStatus() &&
            logMessage((i) => [...i, $t('aeb45ab7295e7ff65ae9e6a2f5830dae', [PluginVersion()])]);
    });

    /** 监控 zip 压缩 */
    const createZip = useZip(() => {
        if (!file()) throw new Error($t('5987551a24989911faa849b2d2dae36d'));
        return file()!.name.replace(/\..*/, '');
    }, resultList);
    /** 启动字体分包进程 */
    const startSplit = resource(
        async () => {
            const cnFontSplit = fontSplitStatus();
            if (!file()) throw new Error($t('5987551a24989911faa849b2d2dae36d'));
            if (!cnFontSplit) throw new Error($t('1b3ade018797f859ab9130150ecc7837'));
            logMessage([]);
            resultList([]);
            const arrayBuffer = await file()!.arrayBuffer();
            return cnFontSplit({
                destFold: '',
                FontPath: new Uint8Array(arrayBuffer),
                previewImage: {},
                log(...args) {
                    logMessage((i) => [...i, args.join(' ')]);
                },
                // 生产的文件转存另一个分包
                async outputFile(path, file) {
                    const buffer =
                        file instanceof Uint8Array
                            ? file
                            : new Uint8Array(await new Blob([file]).arrayBuffer());
                    resultList((i) => [...i, { name: path, buffer }]);
                },
            }).then((res) => {
                Notice.success($t('c6e54d3220f071c30f4369084b2d44d9'));
                return res;
            });
        },
        {
            immediately: false,
        }
    );
    return (
        <section
            class={classHelper.base(
                'mx-auto my-8 grid aspect-video h-[80vh] w-full max-w-[96rem] grid-cols-2 gap-4 overflow-hidden rounded-xl border-2 bg-white transition-all shadow-2xl'
            )(
                startSplit.loading() && 'border-yellow-500 ',
                startSplit.error() && 'border-red-600',
                'border-gray-200'
            )}
        >
            <div class="flex flex-col p-4">
                <header class="flex items-center gap-8">
                    <button
                        class="w-full cursor-pointer transition-colors hover:bg-neutral-200"
                        onclick={() => {
                            getTestingFile().then((f) => file(() => f));
                        }}
                    >
                        {$t('1c539263dccc10f30ca442ebc4fb2a21')}
                    </button>
                </header>
                <Show
                    when={file()}
                    fallback={
                        <DragDropButton
                            class="text-gray-600"
                            accept=".ttf,.otf,.woff2"
                            onGetFile={(f) => {
                                file(() => f);
                                logMessage((i) => [...i, '请点击开始按钮']);
                            }}
                        >
                            <header class="pb-2 text-xl text-black">
                                {$t('00f458b17a23f0378a6ae15ec5ee507e')}
                                <br></br>
                                <aside class="text-md py-4 text-gray-400">
                                    {$t('fef64dd5baf2763e09dbc12bf1934419')}
                                </aside>
                                <aside class="flex justify-center gap-4 py-4">
                                    <span class="rounded-md bg-green-600 px-2 text-sm text-white">
                                        {$t('996cc32dc263344d05e5ac887f3a9f7d')}
                                        {PluginVersion()}
                                    </span>
                                    <a href="https://github.com/KonghaYao/cn-font-split">
                                        <img
                                            src="https://data.jsdelivr.com/v1/package/npm/cn-font-split/badge"
                                            alt={$t('5a88808ce6ff3ec470d1ee9cc3b896e1')}
                                        />
                                    </a>
                                </aside>
                            </header>
                        </DragDropButton>
                    }
                >
                    <div class="flex h-full flex-col items-center justify-center gap-4">
                        <h2 class="pb-2 text-xl">
                            {$t('0ab6a1f6452292c35e648ffcdfb3a0b9')}
                            {PluginVersion()}
                        </h2>
                        <div>
                            {file()!.name} | {prettyBytes(file()!.size)}
                        </div>
                        <div class="flex gap-2">
                            <Show
                                when={startSplit.isReady()}
                                fallback={
                                    <div class="text-red-600 ">
                                        {$t('47b95c8ae09a984890c99dcd41c307f5')}
                                    </div>
                                }
                            >
                                <button
                                    onclick={() => startSplit.refetch()}
                                    class="rounded-lg bg-green-600 p-1 text-white"
                                >
                                    {$t('97228acfdf267218e0903d557635d38c')}
                                </button>
                                <button
                                    onclick={() => file(null)}
                                    class="rounded-lg bg-yellow-500 p-1 text-white"
                                >
                                    {$t('41cfa99edafb170e2208bd63a1c067f9')}
                                </button>
                            </Show>
                        </div>
                    </div>
                </Show>
                <div class="px-4 text-xs text-rose-600">
                    <Show when={fontSplitStatus.isReady()}>
                        <a href="https://github.com/KonghaYao/cn-font-split">
                            {$t('d9d371a818a7ee85a223ade0fbd03465')}
                        </a>
                    </Show>
                    <Show when={fontSplitStatus.error()}>
                        {$t('ba0ece066a5653092c673c0c27b67ecf')}
                        {fontSplitStatus.error().message}
                        <br />
                        {$t('d6b6c2dee20c75a850a094e2473b7137')}
                    </Show>
                    <Show when={fontSplitStatus.loading()}>
                        {$t('94699956675393e2c4a3f14fc1cb21c2')}
                    </Show>
                </div>
            </div>
            <section class="flex h-full flex-col gap-4 overflow-hidden bg-gray-200 p-4 noise">
                <header class="flex justify-between ">
                    <span class="text-xl">{$t('6ba31a17e5537cd3d54b98cd426a050c')}</span>
                    <div class="flex-1"></div>
                    <a href="https://github.com/KonghaYao/cn-font-split/issues" target="_blank">
                        {$t('7274697def092e53a4818e0aa63a29d2')}
                    </a>
                    <a href="https://github.com/KonghaYao/cn-font-split" target="_blank">
                        Github
                    </a>
                </header>
                <Show when={startSplit.error()}>
                    <div class="text-red-600">
                        {$t('45e37669b96a47a4be2dc27ee85a5982')}
                        {startSplit.error().message}{' '}
                        <button onclick={() => startSplit.refetch()}>
                            {$t('21f2346a0958dee441903e53fd55b692')}
                        </button>
                    </div>
                </Show>
                <LogMessage logMessage={logMessage()}></LogMessage>
                <header class="text-xl">{$t('20e8a429657407cb252421edc8a98ed5')}</header>
                <section class="flex h-full  max-h-[100%] select-text overflow-hidden rounded-xl bg-gray-800 font-sans text-sm text-gray-100 ">
                    <FileList resultList={resultList()}></FileList>
                    <Show when={startSplit()}>
                        <div class="flex flex-col rounded-xl bg-gray-700 p-2">
                            <span>
                                {$t('e80b3422926906e494c9357d6946993d')}
                                {startSplit().css.family}
                            </span>
                            <span>
                                {$t('ca59f4e09960ee273dfd339877f74e34')}
                                {startSplit().css.weight}
                            </span>
                        </div>
                    </Show>
                </section>
                <span class="flex justify-end gap-4 text-xs text-green-600">
                    <span>{$t('b3231109cf631b1b4b8462d0b2ca0b99')}</span>
                    <div class="flex-1"></div>
                    <span>{resultList().length}</span>
                    <span>
                        {prettyBytes(resultList().reduce((col, i) => i.buffer.byteLength + col, 0))}
                    </span>

                    <button
                        class="rounded-lg bg-green-600 p-1 text-center  text-gray-100"
                        onclick={() => createZip.refetch()}
                    >
                        {$t('544fff8525a3f89dc42eb1911e7d5f05')}
                    </button>
                </span>
            </section>
        </section>
    );
};
// import { createAutoAnimate } from '@formkit/auto-animate/solid';
import { useZip } from './useZip';
import { preload, PluginVersion, getTestingFile } from './getVersions';

/** 右下角的文件列表 */
function FileList(props: {
    resultList: {
        name: string;
        buffer: Uint8Array;
    }[];
}) {
    return (
        <ul class="flex h-full max-h-[100%] flex-1 flex-col-reverse overflow-scroll  p-4 ">
            <For each={[...props.resultList].reverse()}>
                {(item) => {
                    return (
                        <li>
                            <span class="col-span-1 inline-block min-w-[8rem]">
                                {prettyBytes(item.buffer.byteLength)}
                            </span>
                            <span class="col-span-7">{item.name}</span>
                        </li>
                    );
                }}
            </For>
        </ul>
    );
}

/** 右上角的文件列表 */
function LogMessage(props: { logMessage: string[] }) {
    return (
        <ul class="flex h-full max-h-[100%] select-text flex-col-reverse overflow-scroll rounded-xl bg-gray-800  p-4 font-sans text-xs text-white">
            <For each={[...props.logMessage].reverse()}>
                {(item) => {
                    return <li innerHTML={ConsolePrint(item)}></li>;
                }}
            </For>
        </ul>
    );
}
/** 修饰文本为可见的颜色 */
export const ConsolePrint = (item: string) => {
    return item
        .replace(
            /\[97m\[1m(.*?)\[22m\[39m\[0m\[0m/g,
            // @i18n-ignore
            '<span style="color: green;font-weight: bold;" >$1</span>'
        )
        .replace(
            /\[34m\[1m(.*?)\[22m\[39m\[0m\[0m/g,
            // @i18n-ignore
            '<span style="color: blue;font-weight: bold;" >$1</span>'
        );
};
