import { fetchEventSource } from '@microsoft/fetch-event-source';
import Index from '../../index.json';
import { getFontReporter } from '../utils/getFontReporter';

export const getFileListIndex = async () =>
    await Promise.all(
        Object.entries(Index)
            .map(([id, value]) => {
                return { ...value, id };
            })
            .reverse()
            .map(async (i) => {
                const remotePath = await Promise.all(
                    i.remotePath.map(async (remote) => {
                        const font_name = remote.match(/dist\/(.*?)\/result/)![1];
                        const fileName = font_name!
                            .replaceAll(' ', '_')
                            // 更换文件夹中的 . 为 _
                            .replace(/(?<=\/.*)\.(?=.*\/)/g, '_');
                        const reporter = await getFontReporter(i.id, fileName);
                        const message = reporter.css;
                        const style = `font-family:'${message.family}';font-weight:'${message.weight}'`;
                        return { url: remote, style };
                    })
                );
                return { ...i, remotePath };
            })
    );

export const sortFontListByRemoteCount = (container: HTMLElement) => {
    if (!container) return;
    return new Promise((resolve) => {
        const hotLink: { key: string[]; value: number }[] = [];
        fetchEventSource(
            'https://cache-api.deno.dev?url=https://chinese-fonts-cdn.deno.dev/v1/deno-kv?get=["records","path"]',
            {
                onmessage(e) {
                    hotLink.push(JSON.parse(e.data));
                },
                onclose() {
                    hotLink
                        .sort((a, b) => b.value - a.value)
                        .filter((i) => i.value >= 400)
                        .forEach((item, index, arr) => {
                            const doms = container.querySelectorAll(
                                `[data-id=${item.key[item.key.length - 1]}]`
                            ) as any as HTMLElement[];
                            doms.forEach((dom) => {
                                dom!.style.order = `-${arr.length - index}`;
                                dom!.dataset.index = `${index}`;
                            });
                        });
                },
            }
        );
    });
};
