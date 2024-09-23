// @i18n-disable
import i18n from 'i18next';
// @ts-ignore
import zh from './i18n/zh-cn.json'
// @ts-ignore
import en from './i18n/en.json'

i18n.init({
  // 设置默认语言
  lng: 'zh',
  fallbackLng: 'zh',
  // 是否启用调试模式
  debug: false,
  resources: {
    zh: { translation: zh },
    en: { translation: en },
  }
}, function (err, t) {
  if(err) throw err
  // i18n插件初始化完成或异常时的回调函数
  console.info('初始化完成')
});
export * from 'i18next'
