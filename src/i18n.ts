// @i18n-disable
import i18n from 'i18next';
// @ts-ignore
import zh from './i18n/zh-cn.json'
// @ts-ignore
import en from './i18n/en.json'
import { isServer } from 'solid-js/web';


const createI18n = async (key:string,packages:any)=>{
    const i = await i18n.createInstance()
    await i.init({
        // 设置默认语言
        lng: key,
        fallbackLng: key,
        // 是否启用调试模式
        debug: false,
        resources: {
            [key]: { translation: packages },
        }
    }, function (err, t) {
        if(err) throw err
        // i18n插件初始化完成或异常时的回调函数
        console.info(key,'初始化完成')
    });
    return i
}
export * from 'i18next'

export const i18nZh = await createI18n('zh',zh)
export const i18nEn = await createI18n('en',en)
// 修复 astro 愚蠢的没有上下文的烦恼
export const $t = (...args:any[])=>{
    let lang = globalThis.lang ?? 'zh-cn'
    if(!isServer){
        lang = document.documentElement.lang
    }
    let instance = lang==='zh-cn'?i18nZh:i18nEn
    return instance.t(...args)
}
