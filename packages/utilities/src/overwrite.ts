export default function<T extends object>(source: T, value: T): T {
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