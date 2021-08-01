export type Product<TResult = void> = (...args: any[]) => TResult;

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

export type TaskAbortCallback = (reason?: any) => void;

export type TaskExecutor<T> = (
    resolve: (value: T | PromiseLike<T>) => void,
    reject: (reason?: any) => any,
    controller: AbortController,
    onAbort: (callback: TaskAbortCallback) => void
) => void;