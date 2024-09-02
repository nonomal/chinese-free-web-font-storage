module.exports = {
    translateMap:{
        en:{
            "江夏尧": "KonghaYao",
            "中文网字计划": "中文网字计划",
            "使用教程": "How to Use",
            "技术内幕": "Technical Insights",
            "维护日志": "Maintenance Log",
            "性能优化": "Performance Optimization"
        }
    },
    modelName: 'gpt-3.5-turbo',
    markdown: {
        entry: ['./src/content/post/*.md'],
        entryLocale: 'zh-CN',
        entryExtension: '.md',
        outputLocales: ['en'],
        includeMatter: true,
        outputExtensions: (locale, { getDefaultExtension }) => {
            return '.md';
        },
        outputFileName(locale, path) {
            return path.replace('/content/post/', '/content/post/' + locale + '/')
        }
    },
};