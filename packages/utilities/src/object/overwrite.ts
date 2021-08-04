export default function<TTarget extends object, TSource extends object>(target: TTarget, source: TSource): TTarget | TSource {
    if (typeof target !== 'object' || typeof source !== 'object') {
        return target;
    }

    for (const prop in target) {
        delete target[prop];
    }

    return Object.assign(target, source);
}