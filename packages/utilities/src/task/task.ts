import type {
    Product,
    TaskAbortCallback,
    TaskExecutor,
} from '../types';

function safeRun<TResult>(bodyInvokee: Product<TResult>, finallyInvokee: Product): Product<TResult> {
    return (...args: any[]) => {
        try {
            return bodyInvokee(...args);
        } finally {
            finallyInvokee();
        }
    };
}

export default class Task<T = void> extends Promise<T> {

    private controller: AbortController;
    private abortReason: unknown;

    constructor(executor: TaskExecutor<T>, controller: AbortController = new AbortController()) {
        if (controller.signal.aborted) {
            throw new Error('Cannot attach task to an already aborted controller');
        }

        const listeners = new Set<Product>();

        const addListener = (listener: Product) => {
            listeners.add(listener);
            controller.signal.addEventListener('abort', listener);
        };

        const removeListener = (listener: Product) => {
            listeners.delete(listener);
            controller.signal.removeEventListener('abort', listener);
        };

        const cleanup = () => {
            if (listeners.size > 0) {
                listeners.forEach(removeListener);
            }
        };

        super((_resolve, _reject) => {
            const resolve = safeRun(_resolve, cleanup);
            const reject = safeRun(_reject, cleanup);

            const onAbort = (callback: TaskAbortCallback) => {
                const listener = safeRun(
                    () => callback(this.abortReason),
                    () => removeListener(listener),
                ) as Product;

                addListener(listener);
            };

            executor(resolve, reject, controller, onAbort);
        });

        this.controller = controller;
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