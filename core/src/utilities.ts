export function lockObject<T extends object>(input: T, exclusions: (keyof T)[]): T {
    return new Proxy(input, {
        get(target, prop: keyof T) {
            if (exclusions.includes(prop)) {
                throw new Error(`Access to property '${prop}' is denied`);
            }

            const value = target[prop];
            
            if (typeof value === 'function') {
                return (...args: any[]) => Reflect.apply(value, target, args);
            }

            return value;
        }
    });
}