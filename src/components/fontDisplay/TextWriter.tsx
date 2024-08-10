import { atom, reflect, resource } from '@cn-ui/reactive';
import prettyBytes from 'pretty-bytes';
import { VModel } from '../../utils/VModel';


export const TextWriter = (props: { font_subsets: { name: string, size: number, chars: number[] }[] }) => {
    const packages = props.font_subsets
    const fontSize = atom(48);
    const text = atom('');
    const textCodes = reflect(() =>
        [...text()]
            .map((i) => i.charCodeAt(0))
    );
    const usedPackages = reflect(() => {
        const used = new Set<{
            chars: number[];
            name: string;
            size: number;
        }>();

        for (const iterator of textCodes()) {
            const item = packages.find((i) => i.chars.includes(iterator));
            if (item) used.add(item);
        }
        return [...used];
    });
    const usedRate = reflect(() => {
        const rate =
            (new Set(textCodes()).size * 100) /
            usedPackages().reduce((col, i) => col + i.chars.length, 0);
        return isNaN(rate) ? 0 : rate.toFixed(2);
    });
    const usedSize = reflect(() => usedPackages().reduce((col, cur) => col + cur.size, 0));
    return (
        <aside class="flex flex-1 flex-col p-4">
            <div class="flex justify-between">
                <div>{fontSize()}px</div>
                <input
                    class="ml-8 flex-1"
                    type="range"
                    value={fontSize()}
                    min={12}
                    step={2}
                    max={64}
                    oninput={(e: any) => fontSize(parseInt(e.target.value))}
                />
                {/* <div onclick={() => text.refetch()}>重置</div> */}
            </div>
            <textarea
                {...VModel(text)}
                placeholder="中文测试器，你可以在这里写任何字来测试字体！"
                class="mt-4 h-64 w-full rounded-md p-2 outline-none ring-2 ring-green-600"
                style={{
                    'font-size': fontSize() + 'px',
                    resize: 'none',
                }}
            ></textarea>
            <div class="flex gap-3">
                <span>加载这些文字大致需要 {usedPackages().length} 个分包</span>
                <span>耗费 {prettyBytes(usedSize())}</span>
                <span>字符使用率 {usedRate()}%</span>
            </div>
        </aside>
    );
}
