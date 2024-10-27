// @i18n-disable
import type { FontReporter } from 'cn-font-split';
import { UnicodeRange } from '@japont/unicode-range';

const range = [
    ['基本汉字', 0x4e00, 0x9fa5],
    ['基本汉字补充', 0x9fa6, 0x9fff],
    ['扩展A', 0x3400, 0x4dbf],
    ['扩展B', 0x20000, 0x2a6df],
    ['扩展C', 0x2a700, 0x2b738],
    ['扩展D', 0x2b740, 0x2b81d],
    ['扩展E', 0x2b820, 0x2cea1],
    ['扩展F', 0x2ceb0, 0x2ebe0],
    ['扩展G', 0x30000, 0x3134a],
    ['康熙部首', 0x2f00, 0x2fd5],
    ['部首扩展', 0x2e80, 0x2ef3],
    ['兼容汉字', 0xf900, 0xfad9],
    ['兼容扩展', 0x2f800, 0x2fa1d],
    ['PUA(GBK)', 0xe815, 0xe86f],
    ['部件扩展', 0xe400, 0xe5e8],
    ['PUA增补', 0xe600, 0xe6cf],
    ['汉字笔画', 0x31c0, 0x31e3],
    ['汉字结构', 0x2ff0, 0x2ffb],
    ['汉语注音', 0x3105, 0x312f],
    ['注音扩展', 0x31a0, 0x31ba],
] as [string, number, number][];
export default (props: { reporter: FontReporter }) => {
    const total = props.reporter.data.reduce((col, cur) => {
        return col + String.fromCharCode(...UnicodeRange.parse(cur.chars.split(',')));
    }, '');

    const result = range.map(([name, min, max]) => {
        let exist: string[] = [];
        let voids: string[] = [];
        for (let i = min; i <= max; i++) {
            const char = String.fromCharCode(i);
            const isExist = total.includes(char);
            if (isExist) {
                exist.push(char);
            } else {
                voids.push(char);
            }
        }
        return { name, exist, voids };
    });
    return (
        <table class="w-full overflow-auto p-2 text-center">
            {result.map(({ name, exist, voids }) => {
                const coverage =
                    ((exist.length * 100) / (exist.length + voids.length)).toFixed(2) + '%';
                return (
                    <tr>
                        <td>{name}</td>
                        <td class="relative col-span-2   cursor-pointer overflow-hidden rounded-3xl bg-neutral-200 px-2 text-center">
                            <div
                                class="absolute left-0 top-0  h-full  bg-lime-200"
                                style={{
                                    width: coverage,
                                }}
                            />
                            <div class="relative z-10 block whitespace-nowrap text-left">
                                <span class="text-green-600">
                                    {exist.length}/{exist.length + voids.length}
                                </span>
                                <span class="float-right">{coverage}</span>
                            </div>
                        </td>
                    </tr>
                );
            })}
        </table>
    );
};
