export default function omit<TValue extends object>(value: TValue, pattern: RegExp): TValue {
    const output = {} as TValue;

    for (const key in value) {
        if (!pattern.test(key)) {
            output[key] = value[key];
        }
    }

    return output;
}