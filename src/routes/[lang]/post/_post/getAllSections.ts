import { getArticlesInServer } from '../../../../utils/getPostSections';

export const getAllSections = cache(async (lang: string) => {
    'use server';
    const articles = await getArticlesInServer(lang);
    return articles
        .map((i) => {
            return { ...i, default: undefined };
        })
        .groupBy(({ frontmatter }) => frontmatter?.article?.section);
}, 'getAllSections');
