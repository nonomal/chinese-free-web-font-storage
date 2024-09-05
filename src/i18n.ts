import i18n from 'i18next';
// 初始化 i18next
// 配置参数的文档: https://www.i18next.com/overview/configuration-options
i18n.init({
    debug: true,
    fallbackLng: 'zh-cn',
    resources: {
      en: {
        translation: {
          // 这里是我们的翻译文本
        }
      }
    }
});
export default i18n;