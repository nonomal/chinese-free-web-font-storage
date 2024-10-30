import { MarkdownComponent, getArticleComponent } from '~/utils/getPostSections';
import { TOC } from '~/routes/[lang]/post/_post/TOC';
import { PostLayout } from '~/layouts/PostLayout';
import ArticleAside from '~/routes/[lang]/post/_post/ArticleAside';
import { lazy } from 'solid-js';
import { createAsync } from '@solidjs/router';

const getPostMeta = cache((lang: string, slug: string) => {
    return getArticleComponent(lang, slug).then((res) => {
        return { ...res, default: undefined };
    });
}, 'getPostMeta');

export default () => {
    const { lang, slug } = useParams();
    const pureSlug = slug.replace(/\.html?/, '');
    const Meta = createAsync(() => getPostMeta(lang, pureSlug));
    const Content = lazy(() => getArticleComponent(lang, pureSlug));
    return (
        <PostLayout
            title={Meta()?.frontmatter?.title}
            keywords={Meta()?.frontmatter?.keywords}
            description={Meta()?.frontmatter?.description}
        >
            <section class="flex justify-center">
                <aside class="fixed top-16 left-0 flex-col px-8 py-12 hidden lg:flex h-full flex-none w-[20rem] z-10">
                    <ArticleAside />
                </aside>
                <main class="flex-1 select-text relative z-1 h-full w-full scroll-smooth lg:px-56 items-center flex flex-col">
                    <article class="markdown-body m-auto block max-w-4xl py-12">
                        <Content />
                    </article>
                </main>
                <nav class=" fixed top-16 right-0 flex-none w-64 z-10  px-8 py-12 hidden lg:block">
                    <div class="font-bold text-lg">{$t('7f1b21a571bc81517bbf8b85b1ef7ccd')}</div>
                    <TOC heading={Meta()?.toc ?? []} pIds={[]} />
                </nav>
            </section>
        </PostLayout>
    );
};
