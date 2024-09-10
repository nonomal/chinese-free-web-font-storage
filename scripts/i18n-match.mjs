import { glob } from 'glob'
import { createDefaultConfig } from 'i18nation/dist/index.js'
import { sourceCodeReplacer } from 'i18nation/dist/sourceCodeReplacer.js'
import { JSXPresets } from 'i18nation/dist/presets/jsx.js'
import fs from 'fs'
const items = glob.sync('src/**/*.{tsx,astro}')
const context = {
    json: {},
    createTranslateCode(hash, params) {
        return `$t("${hash}"${params ? `, ${params}` : ''})`
    },
    createStringSlot(key) {
        return `{${key}}`
    }
}


for (const item of items) {
    const content = await fs.promises.readFile(item, 'utf-8')
    try {

        const result = await sourceCodeReplacer(item, content, createDefaultConfig({
            entry: [],
            ...JSXPresets({
                filename: item,
                ...context
            })
        }))
        fs.writeFileSync(item, result)
        console.log("✅", item)
    } catch (e) {
        console.error('❌', item, e)
    }
}