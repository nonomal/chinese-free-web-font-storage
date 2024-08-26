module.exports = {
    markdown: {
        entry: ['./src/content/post/*.md'],
        entryLocale: 'zh-CN',
        entryExtension: '.md',
        outputLocales: ['en'],
        outputExtensions: (locale, { getDefaultExtension }) => {
            return '.md';
        },
        outputFileName(locale, path) {
            return path.replace('/content/post/', '/content/post/' + locale + '/')
        }
    },
};