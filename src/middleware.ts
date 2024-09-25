// src/middleware.ts
import { sequence } from 'astro/middleware';

let promise = Promise.resolve();
// 转异步为同步阻塞，保证数据一致
export const onRequest = sequence(async (ctx, next) => {
    await promise;
    globalThis.lang = ctx.params.lang;
    let p = next();
    await p;
    return p;
});
