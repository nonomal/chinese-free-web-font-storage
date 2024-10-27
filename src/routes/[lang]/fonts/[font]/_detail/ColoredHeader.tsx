import Index from '../../../../../../index.json';
import { MdiGithub } from '~/components/icons/MdiGithub';
export const ColoredHeader = () => {
    const { font, name: font_name } = useParams();
    const font_name_cn = (Index as Record<string, { name: string }>)[font]?.name;
    return (
        <section class="col-span-6 lg:col-span-12 text-2xl flex justify-center gap-12 my-12">
            <div class="flex-1">{font_name_cn}</div>
            <div>{font}</div>
            <div>{decodeURI(font_name)}</div>
            <div>
                <a
                    href={`https://github.com/KonghaYao/chinese-free-web-font-storage/tree/branch/packages/${font}/fonts`}
                    target="_blank"
                    class="text-blue-500 hover:text-blue-600"
                >
                    <MdiGithub></MdiGithub>
                </a>
            </div>
        </section>
    );
};
