import { getAllSections } from '~/routes/[lang]/post/_post/getAllSections';
import { createAsync } from '@solidjs/router';
import { originLink } from '../../../../utils/originLink';
import { For } from 'solid-js';

export default () => {
    const { lang } = useParams();
    const sections = createAsync(() => getAllSections(lang), { initialValue: {} });
    return (
        <ul class="flex-1">
            {Object.entries(sections()).map(([sectionName, posts]) => {
                return (
                    <li id={sectionName} class="mb-4">
                        <details open={true}>
                            <summary class="mb-3 cursor-pointer font-semibold text-cyan-900">
                                {sectionName}
                            </summary>
                            <ul class=" border-l border-neutral-100">
                                <For each={posts}>
                                    {({ frontmatter, path }) => {
                                        return (
                                            <li
                                                class="line-clamp-2 border-l border-blue-200 py-1 pl-4 text-neutral-700 transition-all hover:border-blue-600  hover:text-cyan-700"
                                                title={frontmatter.title}
                                            >
                                                <A
                                                    href={path}
                                                    activeClass="text-cyan-700"
                                                    onclick={originLink}
                                                >
                                                    {frontmatter.title}
                                                </A>
                                            </li>
                                        );
                                    }}
                                </For>
                            </ul>
                        </details>
                    </li>
                );
            })}
        </ul>
    );
};
