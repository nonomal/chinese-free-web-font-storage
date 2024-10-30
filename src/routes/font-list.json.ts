import data from '../../index.json';
import { AllCDN } from '~/global';
// 静态字体的组件，方便别人爬取
export async function GET() {
    const json = Object.entries(data).flatMap(([key, val]) => {
        return {
            name: val.name,
            fonts: val.remotePath.map(({ path: remote, css }) => {
                const [_, name] = remote.match(/dist\/(.*?)\/result/)!;
                return {
                    url: `https://chinese-font.netlify.app/fonts/${key}/${name}`,
                    cdn: remote,
                    css,
                };
            }),
        };
    });
    return new Response(
        JSON.stringify({
            name: '中文网字计划',
            updatedAt: new Date().toUTCString(),
            /** CDN 路径的资源前缀*/
            cdn_prefix: AllCDN,
            list: json,
        }), {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    );
}
