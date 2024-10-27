import { ensureFontMessageString } from '~/utils/ensureFontMessageString';
import { AllCDN } from '~/global';
import type { NameTable } from 'cn-font-split/dist/templates/reporter';
import type { FontReporter } from 'cn-font-split';
import { Code } from '~/components/Code';

export default (props: { reporter: FontReporter }) => {
    const { font, name: font_name } = useParams();

    const CDNs = AllCDN.map((i) => i + `/packages/${font}/dist/${font_name}`);
    const theme = 'github-light' as const;
    const message = (props.reporter.message.windows as NameTable) ?? props.reporter.message;
    return (
        <>
            <header class="my-4 text-lg">
                <span class="bg-orange-600 text-white p-2 rounded-lg">
                    {$t('66bfef35c35c9c55ee564cc81a9cc109')}
                </span>
            </header>
            <div class="bg-white flex flex-col p-4 rounded-2xl">
                <h3>
                    {$t('7dc61240dcd3af8c93830ef566924238')}
                    <A href={'/online-split'} class="float-right text-orange-600">
                        {$t('4d500b7999c473e2f9d8e3caa4571468')}
                    </A>
                </h3>

                <ol class="list-decimal px-8 text-xs py-4">
                    <li>
                        {$t('84b2bd4a95e9cb9962a4eeb5e2cc2f93')}
                        <A href={'/online-split'}>{$t('4d500b7999c473e2f9d8e3caa4571468')}</A>
                        {$t('549d55d7d23c60abc0e0ba67298b5c6e')}
                    </li>
                    <li>{$t('d739b6d5aaf7cfe70ea698853d956171')}</li>
                    <li>{$t('5204b2c9671a624237cad1054a49aa01')}</li>
                </ol>
                <div class="text-red-600">
                    <A href={'/post/deploy_to_cdn'}>{$t('eb72af8a81144db936d77507fb017dfd')}</A>
                </div>
            </div>
            <div class="bg-white flex flex-col p-4 rounded-2xl">
                <h3>
                    {$t('cc935827ec9b32c0b4068997b29096d1')}
                    <select
                        id="cdn-select"
                        class="float-right m-0 flex-1 bg-green-600 text-white rounded-md p-1 outline-none text-xs"
                        value={CDNs[0]}
                    >
                        {CDNs.map((item) => (
                            <option class="text-xs" value={item}>
                                {new URL(item).host}
                            </option>
                        ))}
                    </select>
                </h3>
                <blockquote class="text-xs py-4">
                    {$t('a261bf029798aa282f73e99a320e9b11')}
                </blockquote>

                <div class="select-text my-2 p-2 text-sm border border-neutral-200 rounded-md">
                    <Code
                        lang="html"
                        theme={theme}
                        code={`<link rel='stylesheet' href='${CDNs[0]}/result.css' /> `}
                    />
                </div>
                <div class="select-text my-2 p-2 text-sm border border-neutral-200 rounded-md">
                    <Code lang="css" theme={theme} code={`@import("${CDNs[0]}/result.css") `} />
                </div>
                <blockquote class="text-xs py-4 text-rose-600">
                    <div class="flex gap-4 mb-4">
                        <a
                            href={'https://www.npmjs.com/package/@chinese-fonts/' + font}
                            target="_blank"
                        >
                            <img
                                src={`https://img.shields.io/npm/unpacked-size/@chinese-fonts/${font}?label=NPM&labelColor=c40000&color=fafafa`}
                                alt={$t('55c78b871297c27c5a2a6ab60b0d1eb8')}
                            />
                        </a>
                        <a
                            href={'https://unpkg.com/@chinese-fonts/' + font + '/dist/'}
                            target="_blank"
                        >
                            <img
                                src={`https://img.shields.io/badge/UNPKG-${font}-purple`}
                                alt={$t('7e3957a1b9b16bfae9d7e5d40853b20b')}
                            />
                        </a>
                        <a
                            href={'https://www.jsdelivr.com/package/npm/@chinese-fonts/' + font}
                            target="_blank"
                        >
                            <img
                                src={
                                    'https://data.jsdelivr.com/v1/package/npm/@chinese-fonts/' +
                                    font +
                                    '/badge'
                                }
                                alt={$t('e54bde6b429ffb54683a6b801ef1443a')}
                            />
                        </a>
                    </div>
                    {$t('ec5e8f2c2fd79124c2d1176606ec61c0')}
                    <br />
                    <a href="/font-list.json" class="text-green-600">
                        {$t('df23bed9e9088307c52a34926cd5e1a6')}
                    </a>
                    <br />
                    <A href={'/message/cdn'} class="text-green-600">
                        {$t('c881097f06608038db2cd25e5b92bec0')}
                    </A>
                </blockquote>
            </div>

            <div class="bg-white p-4 select-text rounded-2xl">
                <h3>{$t('be620b1f139b9c484ab5497cec2a93e6')}</h3>
                <Code
                    lang="css"
                    theme={theme}
                    code={`article {\n    font-family:'${ensureFontMessageString(
                        message.fontFamily
                    )}';\n    font-weight:'${ensureFontMessageString(message.fontSubFamily) ?? '400'}'\n};`}
                />
            </div>
            <A
                href={'/post/simple_tutorial'}
                class="bg-green-600 text-white flex cursor-pointer justify-center items-center"
            >
                <div>
                    {$t('4616ae701a068fbb335d3de162bceb08')}
                    <br />
                    {$t('99e134d7258b06ba992586eeb27f0b2a')}
                </div>
            </A>
        </>
    );
};
