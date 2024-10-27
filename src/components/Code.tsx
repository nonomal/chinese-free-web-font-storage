import { classHelper } from '@cn-ui/reactive';
import { createAsync } from '@solidjs/router';
import { codeToHtml } from 'shiki';

export const Code = (props: { class?: string; code: string; lang: string; theme?: string }) => {
    const code = createAsync(async () => {
        'use-server';
        return codeToHtml(props.code, {
            lang: props.lang,
            theme: props.theme ?? 'vitesse-light',
        });
    });
    return <div class={classHelper.base('overflow-auto')(props.class)} innerHTML={code()}></div>;
};
export default Code;
