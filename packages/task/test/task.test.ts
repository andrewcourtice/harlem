import Task, {
    TaskAbortError,
} from '../src';

import {
    describe,
    test,
    expect,
    vi,
} from 'vitest';

describe('Task', () => {

    test('Should handle cancellation', () => {
        const runTimeout = (timeout: number) => new Task<boolean>((resolve, reject, controller, onAbort) => {
            const handle = setTimeout(() => resolve(true), timeout);

            onAbort(() => clearTimeout(handle));
        });

        const task = runTimeout(1000);

        setTimeout(() => task.abort(), 100);

        expect(task).rejects.toBeInstanceOf(TaskAbortError);
    });

    test('Should handle nested child cancellation', async () => {
        expect.assertions(2);

        const abortFn = vi.fn();
        const catchFn = vi.fn();

        const task = new Task((resolve, reject, controller, onAbort) => {
            onAbort(() => abortFn());

            new Task((resolve, reject, controller, onAbort) => {
                onAbort(() => abortFn());

                new Task((resolve, reject, controller, onAbort) => {
                    const handle = setTimeout(() => resolve(), 1000);
                    onAbort(() => {
                        abortFn();
                        clearTimeout(handle);
                    });
                }, controller);
            }, controller);
        });

        setTimeout(() => task.abort(), 100);

        try {
            await task;
        } catch {
            catchFn();
        }

        expect(catchFn).toHaveBeenCalled();
        expect(abortFn).toHaveBeenCalledTimes(3);
    });

});
