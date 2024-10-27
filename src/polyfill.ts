function groupBy<T, K extends string | number>(
    this: T[],
    callback: (item: T) => K
): Record<K, T[]> {
    const result: Record<K, T[]> = {} as Record<K, T[]>;
    for (const item of this) {
        const key = callback(item);
        if (!result[key]) {
            result[key] = [];
        }
        result[key].push(item);
    }
    return result;
}

// define Array Group By
declare global {
    interface Array<T> {
        /**
         * Groups the elements of an array based on the key returned by the keyFn.
         * @param keyFn - A function that extracts a comparison key from each element in the array.
         * @returns An object, where each key corresponds to an array of elements that share that key.
         */
        groupBy<K extends keyof any>(keyFn: (item: T) => K): { [key: string]: T[] };
    }
}

Object.defineProperty(Array.prototype, 'groupBy', {
    value: groupBy,
    enumerable: false,
    writable: true,
    configurable: true,
});

export {};
