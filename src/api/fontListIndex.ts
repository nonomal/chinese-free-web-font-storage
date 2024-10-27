// @i18n-disable
import Index from '../../index.json';

export const getFileListIndex = async () => {
    const allFiles = await Promise.all(
        Object.entries(Index)
            .map(([id, value]) => {
                return { ...value, id };
            })
            .reverse()
            .map(async (i, index) => {
                const remotePath = await Promise.all(
                    i.remotePath.map(async ({ path: remote, css }) => {
                        const style = `font-family:'${css.family}';font-weight:'${css.weight}'`;
                        const [_, name] = remote.match(/dist\/(.*?)\/result/)!;
                        return { url: remote, style, name, href: `/fonts/${i.id}/${name}` };
                    })
                );
                return { ...i, remotePath, hot: false, new: index <= 6 };
            })
    );
    try {
        return sortFontListByRemoteCount(allFiles);
    } catch (e) {
        console.error('远程链接获取失败：');
        console.error(e);
        return allFiles;
    }
};
import { stream } from 'fetch-event-stream';
export const sortFontListByRemoteCount = async <
    T extends { id: string; name: string; hot: boolean },
>(
    files: T[]
): Promise<T[]> => {
    let events = await stream(
        'https://cache-api.deno.dev?url=https://chinese-fonts-cdn.deno.dev/v1/deno-kv?get=["records","path"]',
        {
            method: 'GET',
            headers: {
                Referer: 'https://chinese-fonts.netlify.app',
            },
        }
    );
    const hotLink: { key: string[]; value: number }[] = [];
    for await (let event of events) {
        const data = JSON.parse(event.data!);
        hotLink.push(data);
    }
    const hot = hotLink
        .sort((a, b) => b.value - a.value)
        .slice(0, 6)
        .map((i) => {
            const item = files.find((f) => f.id === i.key[2]);
            if (item) {
                item.hot = true;
            }
            return item;
        })
        .filter(Boolean);
    // 解析最终的结果
    return [...new Set([...hot, ...files])] as T[];
};
