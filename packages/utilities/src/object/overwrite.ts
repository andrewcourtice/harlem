export default function overwrite<TTarget extends object, TSource extends object>(target: TTarget, source: TSource): TTarget | TSource {
    if (typeof target !== 'object' || typeof source !== 'object') {
        return target;
    }

    for (const prop in target) {
        if (!(prop in source)) {
            delete target[prop];
        }
    }

    return Object.assign(target, source);
}