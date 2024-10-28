// @i18n-disable
import i18n from 'i18next';
import { createContext, createMemo, mergeProps, useContext } from 'solid-js';

const createI18n = async (key: string, packages: () => Promise<any>) => {
    const i = i18n.createInstance();

    await i.init(
        {
            // 设置默认语言
            lng: key,
            fallbackLng: key,
            // 是否启用调试模式
            debug: false,
            resources: {
                [key]: { translation: (await packages()).default },
            },
            lowerCaseLng: true,
        },
        function (err, t) {
            if (err) throw err;
            // i18n插件初始化完成或异常时的回调函数
            console.info(key, '初始化完成');
        }
    );
    return i;
};
export * from 'i18next';

interface LanguageConfig {
    lang: string;
    name: string;
    translation: () => Promise<any>;
}

class LanguageServer extends Map {
    constructor(public languages: LanguageConfig[]) {
        super();
    }
    async init(
        /** 客户端当前的语言 */
        lang: string
    ) {
        if (isServer) {
            // 服务端运行需要配置所有语言包
            for (const config of this.languages) {
                await this.registerLanguage(config);
            }
        } else {
            // 而前端只需要配置当前语言包
            this.loadSingleLanguage(lang);
        }
    }
    async loadSingleLanguage(lang: string) {
        const config = this.languages.find((i) => i.lang === lang);
        if (!config) return console.warn(`load Language (${lang}) failed`);
        await this.registerLanguage(config);
    }
    async registerLanguage(lang: LanguageConfig) {
        const instance = await createI18n(lang.lang, lang.translation);
        this.set(lang.lang, instance);
    }
    getInstance(lang: string) {
        return this.get(lang) ?? this.values().next().value;
    }
}

const languageConfig = new LanguageServer([
    {
        lang: 'zh-cn',
        name: '简体中文',
        translation: () => import('./i18n/zh-cn.json'),
    },
    {
        lang: 'en',
        name: 'English',
        translation: () => import('./i18n/en.json'),
    },
] as const);

const defaultLanguage = isServer ? 'zh-cn' : location.pathname.split('/')[1];
await languageConfig.init(defaultLanguage);
export const $t = (str: string, ...args: any) => {
    let lang = useContext(i18nContext)?.lang ?? defaultLanguage;
    let instance = languageConfig.getInstance(lang);
    /** @ts-ignore */
    return instance?.t(str, ...args) ?? str; // 防止切换时导致 BUG
};

export const i18nContext = createContext({
    lang: defaultLanguage,
});

export const watchLanguageRouter = () => {
    return createMemo(() => {
        return { lang: useLocation().pathname.split('/')[1] };
    });
};

import { A as OriginA, useLocation } from '@solidjs/router';
import { isServer } from 'solid-js/web';
export const A: typeof OriginA = (props) => {
    const lang = useContext(i18nContext)?.lang ?? 'zh-cn';
    if (props.href?.startsWith('/')) {
        return OriginA(mergeProps(props, { href: `/${lang}` + props.href }));
    } else {
        return OriginA(props);
    }
};

export { languageConfig };
