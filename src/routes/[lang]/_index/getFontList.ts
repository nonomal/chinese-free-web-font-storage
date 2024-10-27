import { getFileListIndex } from '~/api/fontListIndex';

export const getFontList = cache(async () => {
    'use server';
    return getFileListIndex();
}, 'getFontList');
