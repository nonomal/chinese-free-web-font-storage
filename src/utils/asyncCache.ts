/** 强力缓存异步函数数据 */
export const asyncCache = <T, B>(fn: B, outDateTime = 1000 * 60 * 60 * 24): B => {
    let cache: T | null = null;
    // @ts-ignore
    return async (...args: any[]) => {
        if (cache) return cache;
        // @ts-ignore
        const res = await fn(...args);
        cache = res;
        setTimeout(() => {
            cache = null;
        }, outDateTime);
        return res;
    };
};
