export type Product<TResult = void> = (...args: any[]) => TResult;
export type TaskAbortCallback = (reason?: unknown) => void;

export type TaskExecutor<T> = (
    resolve: (value: T | PromiseLike<T>) => void,
    reject: (reason?: unknown) => unknown,
    controller: AbortController,
    onAbort: (callback: TaskAbortCallback) => void
) => void;