export default function overwrite<TTarget extends object, TSource extends object>(target: TTarget, source: TSource, ignorePattern?: RegExp): TTarget | TSource {
    if (typeof target !== 'object' || typeof source !== 'object') {
        return target;
    }

    for (const prop in target) {
        if (ignorePattern && ignorePattern.test(prop)) {
            delete (source as Record<string, unknown>)[prop];
            continue;
        }

        if (!(prop in source)) {
            delete target[prop];
        }
    }

    return Object.assign(target, source);
}