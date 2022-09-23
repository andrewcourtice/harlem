function traceObjectPath<TValue extends object>(onAccess: (key: PropertyKey) => void): TValue {
    return new Proxy({} as TValue, {
        get(target, key) {
            onAccess(key);
            return traceObjectPath(onAccess);
        },
    });
}

export default function traceObject<TValue extends object>() {
    const nodes = new Set<PropertyKey>();
    const value = traceObjectPath<TValue>(key => nodes.add(key));
    const getNodes = () => Array.from(nodes);
    const resetNodes = () => nodes.clear();

    return {
        value,
        getNodes,
        resetNodes,
    };
}