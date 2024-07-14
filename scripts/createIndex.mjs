import { globSync } from "glob";
import fs from "fs-extra";
import p from "path";
const cn = await fs.readJSON("./overrides.json");
const data = Object.fromEntries(
    Object.entries(cn).map(([en, cn]) => {
        const path = globSync(`packages/${en}/fonts/*`).map((i) => {
            const nation = i.replaceAll("\\", "/").replace("fonts", "dist");
            const extName = p.extname(nation); // 获取文件后缀名，包含点号
            const basePath =
                p.dirname(nation) +
                "/" +
                p
                    .basename(nation, extName)
                    .replaceAll(" ", "_")
                    // 更换文件夹中的 . 为 _
                    .replaceAll(".", "_");
            return {
                path: basePath + "/result.css",
                css: fs.readJSONSync("./" + basePath + "/reporter.json").css,
            };
        });
        console.log(path);
        return [
            en,
            {
                name: cn,
                remotePath: path,
            },
        ];
    })
);

console.log(data);
fs.outputJSON("./index.json", data);
