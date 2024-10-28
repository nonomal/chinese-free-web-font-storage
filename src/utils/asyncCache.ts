/** 强力缓存异步函数数据 */
export const asyncCache = <T, B extends []>(
    fn: (...args: B) => Promise<T>,
    outDateTime = 1000 * 60 * 60 * 24
) => {
    let cache: T | null = null;
    return async (...args: B) => {
        if (cache) return cache;
        const res = await fn(...args);
        cache = res;
        setTimeout(() => {
            cache = null;
        }, outDateTime);
        return res;
    };
};
