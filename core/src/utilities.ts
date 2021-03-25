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

export function raiseDuplicationError(type: string, name: string): void {
    if (!__DEV__) {
        throw new Error(`A ${type} named ${name} has already been registered on this store`);
    }

    console.warn(`A ${type} named ${name} has already been registered on this store and will now be overwritten. This will throw an error in production.`);
}