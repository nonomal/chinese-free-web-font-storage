import { asyncCache } from '~/utils/asyncCache';
import { getArticlesInServer } from '../../../../utils/getPostSections';

export const getAllSections = asyncCache(async (lang: string) => {
    'use server';
    const articles = await getArticlesInServer(lang);
    return articles
        .map((i) => {
            return { ...i, default: undefined };
        })
        .groupBy(({ frontmatter }) => frontmatter?.article?.section);
});
