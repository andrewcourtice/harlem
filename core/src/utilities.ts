export function lockObject<T extends object>(input: T, exclusions: (keyof T)[]): T {
    return new Proxy(input, {
        get(target, prop) {
            if (exclusions.includes(prop as keyof T)) {
                throw new Error(`Access to property '${prop as string}' is denied`);
            }

            const value = target[prop as keyof T];
            
            if (typeof value === 'function') {
                return (...args: any[]) => Reflect.apply(value, target, args);
            }

            return value;
        }
    });
}