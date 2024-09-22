import { defineConfig } from 'i18nation'
export default defineConfig({
    src: 'src/**/*.{jsx,tsx,ts,astro}',
    exclude: ['**/utils/**/*', '**/*.d.ts',"**/heti.astro"],
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
})