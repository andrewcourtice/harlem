export type Product<TResult = void> = (...args: any[]) => TResult;
export type TaskResolve<TResult> = (value: TResult | PromiseLike<TResult>) => void;
export type TaskReject = (reason?: unknown) => unknown;
export type TaskAbortCallback = (reason?: unknown) => void;

export type TaskExecutor<TResult> = (
    resolve: TaskResolve<TResult>,
    reject: TaskReject,
    controller: AbortController,
    onAbort: (callback: TaskAbortCallback) => void
) => void;