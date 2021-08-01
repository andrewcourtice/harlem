export default function<T extends object>(source: T, value: any): any {
    if (typeof source !== 'object' || typeof value !== 'object') {
        return source;
    }

    let prop: Extract<keyof T, string>;

    for (prop in source) {
        if (prop in value) {
            source[prop] = value[prop];
            continue;
        }

        delete source[prop];
    }

    return source;
}