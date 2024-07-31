import { fetchEventSource } from '@microsoft/fetch-event-source';
import Index from '../../index.json';

export const getFileListIndex = async () =>
    await Promise.all(
        Object.entries(Index)
            .map(([id, value]) => {
                return { ...value, id };
            })
            .reverse()
            .map(async (i) => {
                const remotePath = await Promise.all(
                    i.remotePath.map(async ({ path: remote, css }) => {
                        const style = `font-family:'${css.family}';font-weight:'${css.weight}'`;
                        return { url: remote, style };
                    })
                );
                return { ...i, remotePath };
            })
    );

export const sortFontListByRemoteCount = (container?: any) => {
    if (!container) return;
    return new Promise((resolve) => {
        const hotLink: { key: string[]; value: number }[] = [];
        fetchEventSource(
            'https://cache-api.deno.dev?url=https://chinese-fonts-cdn.deno.dev/v1/deno-kv?get=["records","path"]',
            {
                onmessage(e) {
                    hotLink.push(JSON.parse(e.data));
                },
                onerror(err) {
                    throw err;
                },
                onclose() {
                    hotLink
                        .sort((a, b) => b.value - a.value)
                        .slice(0, 6)
                        .forEach((item, index, arr) => {
                            const doms = container.querySelectorAll(
                                `[data-id=${item.key[item.key.length - 1]}]`
                            ) as any as HTMLElement[];
                            doms.forEach((dom) => {
                                dom.dataset.count = item.value.toString();
                                dom!.style.order = `-${arr.length - index}`;
                                dom!.dataset.index = `${index}`;
                            });
                        });
                    resolve(null);
                },
            }
        );
    });
};
