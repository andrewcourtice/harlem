import {
    TaskAbortError,
} from './errors';

import type {
    Product,
    TaskAbortCallback,
    TaskAbortedCallback,
    TaskExecutor,
} from './types';

export * from './errors';
export * from './types';

export default class Task<TResult = void> extends Promise<TResult> {

    private controller: AbortController;
    private abortReason: unknown;

    constructor(executor: TaskExecutor<TResult>, controller: AbortController = new AbortController()) {
        if (controller.signal.aborted) {
            throw new Error('Cannot attach task to an already aborted controller');
        }

        const listeners = new Set<TaskAbortCallback>();
        let isAborting = false;

        const execResolution = (callback: Product) => {
            if (!isAborting) {
                callback();
            }
        };

        super((_resolve, _reject) => {
            let finaliser: TaskAbortedCallback = (reason) => _reject(new TaskAbortError(reason));

            const resolve = (value: TResult | PromiseLike<TResult>) => execResolution(() => _resolve(value));
            const reject = (reason?: any) => execResolution(() => _reject(reason));
            const onAbort = (callback: TaskAbortCallback) => listeners.add(callback);
            const onAborted = (callback: TaskAbortedCallback) => finaliser = callback;

            const abort = () => {
                controller.signal.removeEventListener('abort', abort);

                isAborting = true;

                listeners.forEach(listener => {
                    try {
                        listener(this.abortReason);
                    } finally {
                        listeners.delete(listener);
                    }
                });

                isAborting = false;

                finaliser(this.abortReason);
            };

            controller.signal.addEventListener('abort', abort);

            executor(resolve, reject, controller, onAbort, onAborted);
        });

        this.controller = controller;
    }

    public static isTask(value: unknown): value is Task {
        return value instanceof Task;
    }

    public get signal(): AbortSignal {
        return this.controller.signal;
    }

    public get hasAborted(): boolean {
        return this.signal.aborted;
    }

    public abort(reason?: unknown): this {
        this.abortReason = reason;
        this.controller.abort();

        return this;
    }

}