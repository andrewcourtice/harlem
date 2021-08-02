export type Product<TResult = void> = (...args: any[]) => TResult;

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

export type TaskAbortCallback = (reason?: unknown) => void;

export type TaskExecutor<T> = (
    resolve: (value: T | PromiseLike<T>) => void,
    reject: (reason?: unknown) => unknown,
    controller: AbortController,
    onAbort: (callback: TaskAbortCallback) => void
) => void;