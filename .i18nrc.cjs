module.exports = {
    markdown: {
        entry: ['./src/content/post/zh/**/*.md'],
        entryLocale: 'zh-CN',
        entryExtension: '.md',
        outputLocales: ['en'],
        outputExtensions: (locale, { getDefaultExtension }) => {
            return '.md';
        },
        outputFileName(locale, path) {
            return path.replace('/content/post/zh/', '/content/post/' + locale + '/')
        }
    },
};