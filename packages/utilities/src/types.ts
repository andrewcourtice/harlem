export interface Constructable<TValue = unknown> {
    constructor: new (...args: unknown[]) => TValue;
}

export type RuntimeType = 'boolean'
    | 'number'
    | 'string'
    | 'error'
    | 'date'
    | 'regexp'
    | 'function'
    | 'symbol'
    | 'array'
    | 'object'
    | 'map'
    | 'set'
    | 'null'
    | 'undefined';