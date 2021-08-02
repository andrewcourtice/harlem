export default function<TTarget extends Record<string, unknown>>(target: TTarget, source: any): any {
    if (typeof target !== 'object' || typeof source !== 'object') {
        return target;
    }

    for (const prop in target) {
        delete target[prop];
    }

    return Object.assign(target, source);
}