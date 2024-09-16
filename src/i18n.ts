import i18n from 'i18next';
import zh from './i18n/zh-cn.json'
i18n.init({
  // 设置默认语言
  lng: 'zh',
  fallbackLng: 'zh',
  // 是否启用调试模式
  debug: false,
  resources: {
    zh: { translation: zh }
  }
}, function (err, t) {
  if(err) throw err
  // i18n插件初始化完成或异常时的回调函数
  console.log('国际化插件初始化完毕!')
});
export * from 'i18next'