import { type Atom, atom } from '@cn-ui/reactive';
import { onCleanup, onMount } from 'solid-js';
import { __CDN__ } from '../../global';
import { SampleDisplay } from './SampleDisplay';
import { isServer } from 'solid-js/web';

export const FeatureTest = () => {
    let root: HTMLDivElement;
    const TOC = atom<string[]>([]);
    onMount(() => {
        TOC([...root.querySelectorAll('h3')].map((i) => i.id));
    });
    return (
        (<div class="m-auto max-w-3xl select-text py-8" ref={root!}>
            <header class="pb-8">
                <h2 class="py-4 text-center text-4xl">{$t("1100e553d4fe9dcb2a5572c96cc6de86")}</h2>
                <p class="text-gray-700">{$t("7997dc9762b3fdd2aa44c244d2b1e16e")}</p>
                <div class="flex flex-wrap gap-2 py-2">
                    {TOC().map((i) => {
                        return (
                            <a href={'#' + i} class="rounded-lg bg-green-600 px-1 text-white">
                                {i}
                            </a>
                        );
                    })}
                </div>
            </header>
            <Part1></Part1>
            <Part2></Part2>
            <Part3></Part3>
            <Part4></Part4>
            <p class="py-4 text-center text-3xl">{$t("b59647af376c478eb600f4a0043449ee")}</p>
        </div>)
    );
};

const useIntoViewTrigger = (root: Atom<HTMLDivElement | null>, trigger: Atom<boolean>) => {
    if (isServer) return;
    // 创建一个 Intersection Observer 实例
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            // 当目标元素进入或离开窗口时触发的回调函数
            if (entry.isIntersecting) {
                trigger(true);
                console.log($t("6dd196036dd2a4e7e7ca9610725ba939"));
            }
        });
    });
    onMount(() => {
        observer.observe(root()!);
    });
    onCleanup(() => {
        observer.disconnect();
    });
};
const Part4 = () => {
    const link = atom(false);
    const root = atom<HTMLDivElement | null>(null);
    useIntoViewTrigger(root, link);
    return (
        (<div style="font-family: 'LogoSC LongZhuTi';" ref={root!}>
            {link() && (
                <link
                    rel="stylesheet"
                    href={__CDN__ + '/packages/bxzlzt/dist/标小智龙珠体/result.css'}
                />
            )}
            <h2 class="pt-8 text-center text-3xl">{$t("fb66e3d0a7c6a59da2bda4b7897d80e2")}</h2>
            <SampleDisplay
                title={$t("46f3905113db69ed78727c24b9fce4bc")}
                tag="expt"
                fullTag="Expert Forms Currently Japanese only"
                desc="这个特性将比例宽度或半个字符宽度以外的固定宽度的字形替换为半字符宽度的字形。许多CJKV字体中的字形设置在多个宽度上，这个特性选择了半字符宽度的版本。有许多情况下会优先选择这种行为，包括与旧版桌面文件的兼容性。"
                sample={
                    ' 唖 嘘 焔 鴎 噛 澗 侠 鹸 柵 屡 繍 醤 靭 蝉 掻 騨 箪 掴 填 顛 涜 嚢 剥 溌 醗 媛 頬 麺 莱 埬 蓮 蝋 僊 兔 寃 屏 廏 攅 曁 龝 箙 舮 麪'
                }
            ></SampleDisplay>
        </div>)
    );
};
const Part3 = () => {
    const link = atom(false);
    const root = atom<HTMLDivElement | null>(null);
    useIntoViewTrigger(root, link);
    const wght = atom(100);
    return (
        (<div style="font-family: 'Source Han Serif CN VF';" ref={root}>
            {link() && (
                <link
                    rel="stylesheet"
                    href={__CDN__ + '/packages/syst/dist/SourceHanSerifCN/result.css'}
                />
            )}
            <h2 class="pt-8 text-center text-3xl">{$t("3781a7fa46e2ad64a08d7d782a1a051a")}</h2>
            <section>
                <h3 class="py-4 text-2xl text-green-600" id="wght">
                    <span>{$t("11504acbc14301bef98fa75e2de15958")}</span>
                </h3>
                <h4 class="py-2 text-xs text-gray-600">{$t("3732275d7efbf42066ac0fef46c8c1e4")}</h4>
                <p>
                    <input
                        type="range"
                        min="100"
                        value={100}
                        max="1000"
                        step={100}
                        oninput={(e) => wght(parseInt(e.target.value))}
                    />
                </p>
                <div
                    class="rounded-xl  bg-white p-4 text-2xl"
                    style={`font-variation-settings: "wght" ${wght()};`}
                >{$t("a1a822e6d22a88148e0dcd7093de2d82")}</div>
            </section>
            <SampleDisplay
                title={$t("46f3905113db69ed78727c24b9fce4bc")}
                tag="hwid"
                fullTag="Half Widths"
                desc="这个特性将比例宽度或半个字符宽度以外的固定宽度的字形替换为半字符宽度的字形。许多CJKV字体中的字形设置在多个宽度上，这个特性选择了半字符宽度的版本。有许多情况下会优先选择这种行为，包括与旧版桌面文件的兼容性。"
                sample={
                    ' Ｗ Ｘ Ｙ Ｚ ［ ＼ ］ ＾ ＿ ‵ ａ ｂ ｃ ｄ ｅ ｆ ｇ ｈ ｉ ｊ ｋ ｌ ｍ ｎ ｏ ｐ ｑ ｒ ｓ ｔ ｕ ｖ ｗ ｘ ｙ ｚ ｛ ｜ ｝ ￥ ￦'
                }
            ></SampleDisplay>
            <SampleDisplay
                title={$t("5dfbd99b24da052a61700e03ba378cfe")}
                tag="vpal"
                fullTag="Proportional Alternate Vertical Metrics"
                desc="使用等宽备用垂直度量可以确保字符在垂直方向上具有统一的视觉效果，尤其是在某些特定排版需求下，如表格、列表、数学公式等情况下特别有用。这样做有助于提高文本的可读性和外观的一致性。"
                sample={' ︵ ︶ ︷ ︸ ︽ ︾ ﹀ ﹂ ＾'}
            ></SampleDisplay>
            <SampleDisplay
                title={$t("5dfbd99b24da052a61700e03ba378cfe")}
                tag="smcp"
                fullTag="Proportional Alternate Vertical Metrics"
                desc="使用等宽备用垂直度量可以确保字符在垂直方向上具有统一的视觉效果，尤其是在某些特定排版需求下，如表格、列表、数学公式等情况下特别有用。这样做有助于提高文本的可读性和外观的一致性。"
                sample={'Changing case to Small Caps.'}
            ></SampleDisplay>
        </div>)
    );
};
const Part2 = () => {
    const link = atom(false);
    const root = atom<HTMLDivElement | null>(null);
    useIntoViewTrigger(root, link);
    return (
        (<div style="font-family: 'MaokenAssortedSans';" ref={root}>
            {link() && (
                <link
                    rel="stylesheet"
                    href={__CDN__ + '/packages/mksjh/dist/MaokenAssortedSans1_30/result.css'}
                />
            )}
            <h2 class="pt-8 text-center text-3xl">{$t("40cdf9065e2298eecfb1cfd1255bda95")}</h2>
            <SampleDisplay
                title={$t("e9e8263686df1b8fe87ad26876c9755f")}
                tag="lnum"
                fullTag="Lining Figures"
                desc="这个特性将数字字形从默认或旧式数字转换为连体数字。"
                sample={'0 1 2 3 4 5 6 7 8 9'}
            ></SampleDisplay>
            <SampleDisplay
                title={$t("8c429d32f2d635adda9739760e9c459e")}
                tag="zero"
                fullTag="Slashed Zero"
                desc="将数字零（0）的字形替换为斜杠零（Ø）。斜杠零是将数字零的上半部分加入一条斜线的表示方式，这样可以明显区分数字零和大写字母O。斜杠零在某些特定的排版需求或字体设计中使用，以提高数字的可辨识度。"
                sample={'0 ０'}
            ></SampleDisplay>
            <SampleDisplay
                title={$t("5950f5bd47583fe8bcf7f47af5d21396")}
                tag="vkna"
                fullTag="Vertical Kana Alternates"
                desc="这个特性用于在竖排文本中使用替代的日语片假名形式。在竖排文本中，为了适应排版需求，日语片假名可能会采用不同的字形形式。通过启用竖排片假名特性，可以使用这些替代形式，以确保在竖排文本中呈现出最佳的版面效果"
                sample={' 〈 〉 《 》 「 」 『 』 【 】 〒 〓 〔 〕 〖 〗 〘 〙 〚 〛'}
            ></SampleDisplay>
            <SampleDisplay
                title={$t("9ed36dd374ad4accefb4f6956460bd7b")}
                tag="liga"
                fullTag="Standard Ligatures"
                desc="默认启用。该功能将一系列字形替换为单个字形，称为连字，这在排版中更为常见。"
                sample={
                    ' 0⃣️ 0️⃣ 0⃣︎ 0︎⃣ 0̷ 0⃣ 0⃞ 0⃝ 1⃣️ 1️⃣ 1⃣︎ 1︎⃣ 1⃢ 1⃣ 1⃞ 1⃝ 2⃣️ 2️⃣ 2⃣︎ 2︎⃣ 2⃢ 2⃣ 2⃝ '
                }
            ></SampleDisplay>
            <SampleDisplay
                title={$t("b34d1a817384949f14db02c1c450dc57")}
                tag="dlig"
                fullTag="Discretionary Ligatures"
                desc="在特定情况下，该功能会用替代形式取代默认字形，以提供更好的连接效果。类似于连字（但不是严格的连字功能），上下文替代常用于使字形与周围环境和谐统一。"
                style="font-variant-ligatures: discretionary-ligatures"
                sample={'ﺘﺤﺞ ﺸﺦ ﺸﺢ ﺸﺞ 󱥬󱥔  Co Ca Ḑ Ģ  '}
            ></SampleDisplay>
            <SampleDisplay
                title={$t("b52f82d8ed67bfc3a563c59af2e0054c")}
                tag="pwid"
                fullTag="Proportional Widths"
                desc="该特性将使用统一宽度（通常为全角或半角em）的字形替换为等比例间距的字形。比例变体通常用于CJKV字体中的拉丁字符，也可以用于日语字体中的片假名。通过启用等宽转比例特性，可以在排版中使用等比例间距的字形，以获得更好的视觉效果。这样可以使字母和其他字符在整个文本中的间距和比例更加平衡和连贯。"
                sample={' · ‘ ’ “ ” …'}
            ></SampleDisplay>
        </div>)
    );
};
const Part1 = () => {
    return (
        (<div style="font-family: 'Smiley Sans Oblique';">
            <link
                rel="stylesheet"
                href={__CDN__ + '/packages/dyh/dist/SmileySans-Oblique/result.css'}
            />
            <h2 class="pt-8 text-center text-3xl">{$t("581c800f6705516bfc1455e51ceee818")}</h2>
            <SampleDisplay
                title={$t("484fdf6ba82dea9beb17a0bfad7a9226")}
                tag="aalt"
                fullTag="Access All Alternates"
                desc="特殊功能：用于向用户展示字符的所有备选形式的选择。"
                sample={
                    'B C D E F G H I L Ļ M N Ņ P R S Ş T Ţ U V W X Y Z b c d e g h k l ļ m n ņ p q s ş ţ u v w x y z 、 。 . , … * # /  ， ＿ — ⸺ _ ( ) { } [ ] 〈 〉 【 】 ｛ ｝ 「 」 《 》 〔 〕 『 』 〖 〗 （ ） " \' @ | ¦ № ¢ $ £ ¥ − × ÷ ≠ ± ≈ ¬ ^ % ー ` ¯ A J K O Q a f i j o r t 0 1 2 3 4 5 6 7 8 9 : ; ! ? - & + = > < ~'
                }
            ></SampleDisplay>
            <SampleDisplay
                title={$t("087c943c523fa513a91057d357592f30")}
                tag="ss01"
                fullTag="Stylistic Sets"
                desc="该功能用于将默认字符字形替换为风格变体。风格集中的字形可能经过视觉协调设计，特定方式的相互作用，或者以其他方式相互配合。"
                sample={'J K Q a f r & №'}
            ></SampleDisplay>
            <SampleDisplay
                title={$t("37f3939d165ebcff0215dc1cd6ae88c3")}
                tag="ss02"
                fullTag="Stylistic Sets"
                desc="该功能用于将默认字符字形替换为风格变体。风格集中的字形可能经过视觉协调设计，特定方式的相互作用，或者以其他方式相互配合。"
                sample={'f'}
            ></SampleDisplay>
            <SampleDisplay
                title={$t("8f0e8f8ed3c9a9143261f7a5bbabb8c1")}
                tag="frac"
                fullTag="Fractions"
                desc="该功能用于将用斜线分隔的数字替换为常见（对角线）分数形式。"
                sample={'1/4 1/2 3/4'}
            ></SampleDisplay>
            <SampleDisplay
                title={$t("060ba9c247edbd2bdbe6b8500b9077f7")}
                tag="ordn"
                fullTag="Ordinals"
                desc="该功能用于将数字转换为相应的序数形式。"
                sample={'0A 0a 1A 1a 2A 2a 3A 3a 4A 4a 5A 5a 6A 6a 7A 7a 8A 8a 9A 9a No.'}
            ></SampleDisplay>
            <SampleDisplay
                title={$t("0b059b143af005b1542321d7c887a520")}
                tag="tnum"
                fullTag="Tabular Figures"
                desc="该功能用于将按字形独立宽度（比例式）设置的数字字形替换为相应的统一宽度（表格式）上设置的字形。请注意，某些字体可能默认包含了表格数字，因此启用此功能可能不会显著影响字形的宽度。"
                sample={'0 1 2 3 4 5 6 7 8 9'}
            ></SampleDisplay>
            <SampleDisplay
                title={$t("5cfc81ac670ae1f48be5a530eec3f2c2")}
                tag="fwid"
                fullTag="该功能用于将设置在其他宽度上的字形替换为设置在全宽度（通常是em宽度）上的字形。在CJKV字体中，这可能包括“较低ASCII”拉丁字符和各种符号。在欧洲字体中，该功能将比例间距的字形替换为等宽字形，这些字形通常设置为0.6 em宽度。"
                desc="默认开启"
                sample={
                    'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x y z 0 1 2 3 4 5 6 7 8 9 . , : ; ! ? * # /  - _ ( ) { } [ ] " '
                }
            ></SampleDisplay>
            <SampleDisplay
                title={$t("aa6cdaeca0ba0a35323754ae0579a0e9")}
                tag="sups"
                fullTag="Superscript"
                desc="该功能用于将直立或老式数字替换为上标数字（主要用于脚注标记），以及将小写字母替换为上标字母（主要用于缩写的法语标题）。"
                sample={'123'}
            ></SampleDisplay>
            <SampleDisplay
                title={$t("f2ccc9f5594bc4a803757bdb13e55682")}
                tag="kern"
                fullTag="Kerning"
                desc="默认开启.该功能调整字形之间的间距，通常以提供视觉上一致的字距为目的。尽管精心设计的字体在整体上具有一致的字间距，但某些字形组合需要调整以改善可读性。请注意，此功能可能适用于超过两个字形的连续字符，并且不适用于等宽字体。还要注意，此功能不适用于垂直设置的文本。"
                sample={'This is Chinese Web Font Project'}
            ></SampleDisplay>
        </div>)
    );
};
