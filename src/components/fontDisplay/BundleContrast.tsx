import prettyBytes from 'pretty-bytes';
import { AsyncReporterLoader } from './AsyncReporterLoader';

/** 展示打包数据的信息 */
export const BundleContrast = AsyncReporterLoader((props) => {
    const bundleMessage = props.reporter.bundleMessage;
    const env = props.reporter.env;
    return (
        (<div class="rounded-lg bg-white p-4 ">
            <h2 class="pb-4 text-lg">{$t("1e0ec07b9dc50393b26d2cc2ff30ff61")}</h2>
            <ul class="select-text text-gray-600">
                <li>{$t("5ca007f62f1722774b4a702fc4a41f99")}<span class="float-right">{prettyBytes(bundleMessage.originLength)}</span>
                </li>
                <li>{$t("1af317c41270cc6bc01d6645fd7ef596")}<span class="float-right">{prettyBytes(bundleMessage.ttfLength)}</span>
                </li>
                <li>{$t("768b24856a32ff199b6f65225626991c")}<span class="float-right text-green-600">
                        {prettyBytes(bundleMessage.bundledTotalLength)} | 
                        {(
                            (bundleMessage.bundledTotalLength * 100) /
                            bundleMessage.originLength
                        ).toFixed(2)}
                        %
                    </span>
                </li>
                {'os' in env && (
                    <>
                        <li class="text-green-600">{$t("4bfb440cdd085adfa63cc5597ac7317c")}{[
                                env.os.version,
                                env.device.architecture,
                                env.device.cpus,
                                $t("5c68e384dba58c6440c24cd460d9039f"),
                            ].join(' ')}
                        </li>
                        <li>
                            {[env.envName, env.runtime.version].join(' ')}
                            <span class="float-right">
                                {ShowTimeFormat(new Date(env.createdTime))}
                            </span>
                        </li>
                    </>
                )}
            </ul>
        </div>)
    );
});
export const ShowTimeFormat = (date: Date) => {
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
};
