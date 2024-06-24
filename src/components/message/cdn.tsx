import { resource, atom } from '@cn-ui/reactive';
import { fetchEventSource } from '@microsoft/fetch-event-source';

export const useHotCDN = () => {
    const hotSubCDN = atom<{ key: string[]; value: number }[]>([]);
    resource(() => {
        return fetchEventSource(
            'https://cache-api.deno.dev?url=https://chinese-fonts-cdn.deno.dev/v1/deno-kv?get=["records","hit_cdn"]',
            {
                onmessage(e) {
                    hotSubCDN((i) => [...i, JSON.parse(e.data)]);
                },
            }
        );
    });
    return hotSubCDN;
};

export const CDNAnalyze = () => {
    const hotSubCDN = useHotCDN();
    const hotWebSite = atom<{ key: string[]; value: number }[]>([]);
    resource(() => {
        return fetchEventSource(
            'https://cache-api.deno.dev?url=https://chinese-fonts-cdn.deno.dev/v1/deno-kv?get=["records","referer"]',
            {
                onmessage(e) {
                    hotWebSite((i) => [...i, JSON.parse(e.data)]);
                },
            }
        );
    });
    const hotLink = atom<{ key: string[]; value: number }[]>([]);
    resource(() => {
        return fetchEventSource(
            'https://cache-api.deno.dev?url=https://chinese-fonts-cdn.deno.dev/v1/deno-kv?get=["records","path"]',
            {
                onmessage(e) {
                    hotLink((i) => [...i, JSON.parse(e.data)]);
                },
            }
        );
    });
    return (
        <>
            <h2 class=" my-12 text-center text-3xl leading-9">中文网字计划 CDN 分析</h2>
            <section class="m-auto grid max-w-7xl grid-cols-3 gap-4">
                <div>
                    <div>子 CDN 累计访问数（入口 CSS）</div>
                    <ul class="font-sans">
                        {hotSubCDN()
                            .sort((a, b) => b.value - a.value)
                            .filter((i) => {
                                return !(i.value <= 50);
                            })
                            .map((i) => {
                                return (
                                    <li class="flex">
                                        <span>{i.key.at(-1)}</span>
                                        <span class="flex-1"></span>
                                        <span>{i.value}</span>
                                    </li>
                                );
                            })}
                    </ul>
                </div>
                <div>
                    <div>热门字体</div>
                    <ul class="font-sans">
                        {hotLink()
                            .sort((a, b) => b.value - a.value)
                            .filter((i) => {
                                return !(i.value <= 50);
                            })
                            .map((i) => {
                                return (
                                    <li class="flex">
                                        <span>{i.key.at(-1)}</span>
                                        <span class="flex-1"></span>
                                        <span>{i.value}</span>
                                    </li>
                                );
                            })}
                    </ul>
                </div>
                <div class=" col-span-1">
                    <div>访问热榜</div>
                    <ul class="font-sans">
                        {hotWebSite()
                            .sort((a, b) => b.value - a.value)
                            .filter((i) => {
                                const host = i.key.at(-1);
                                return !(
                                    /^localhost:\d+/.test(host!) ||
                                    host === 'localhost' ||
                                    !isNaN(parseInt(host)) ||
                                    i.value <= 10
                                );
                            })
                            .map((i) => {
                                return (
                                    <li class="flex">
                                        <a href={'https://' + i.key.at(-1)}>{i.key.at(-1)}</a>
                                        <span class="flex-1"></span>
                                        <span>{i.value}</span>
                                    </li>
                                );
                            })}
                    </ul>
                </div>
            </section>
        </>
    );
};
