export default {
    src: 'src/**/*.{jsx,tsx,ts,astro}',
    createTranslateCode(hash, params) {
        return `$t("${hash}"${params ? `, ${params}` : ''})`
    },
    createStringSlot(key) {
        return `{{${key}}}`
    },

    outputJSON: 'src/i18n/zh-cn.json',
    jsonConfig: {
        mode: "flat",
        indent: 4,
    },
}