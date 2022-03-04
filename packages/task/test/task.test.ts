import Task, {
    TaskAbortError,
    TaskExecutor,
    TaskReject,
    TaskResolve,
} from '../src';

import {
    describe,
    test,
    expect,
    vi,
} from 'vitest';

describe('Task', () => {

    function getChildTask(
        executer: TaskExecutor<void>,
        resolve: TaskResolve<void>,
        reject: TaskReject,
        controller: AbortController,
    ) {
        return new Task(executer, controller)
            .then(() => resolve())
            .catch(reason => reject(reason));
    }

    test('Should handle cancellation', async () => {
        const runTimeout = (timeout: number) => new Task<boolean>((resolve, reject, controller, onAbort) => {
            const handle = setTimeout(() => resolve(true), timeout);

            onAbort(() => clearTimeout(handle));
        });

        const task = runTimeout(1000);

        setTimeout(() => task.abort(), 100);

        await expect(task).rejects.toBeInstanceOf(TaskAbortError);
    });

    test('Should handle nested child cancellation', async () => {
        expect.assertions(2);

        const abortFn = vi.fn();
        const catchFn = vi.fn();

        const task = new Task((resolve1, reject1, controller1, onAbort) => {
            onAbort(() => abortFn());

            getChildTask((resolve2, reject2, controller2, onAbort) => {
                onAbort(() => abortFn());
                getChildTask((resolve3, reject3, controller3, onAbort) => {
                    const handle = setTimeout(() => resolve3(), 1000);

                    onAbort(() => {
                        abortFn();
                        clearTimeout(handle);
                    });
                }, resolve2, reject2, controller2);
            }, resolve1, reject1, controller1);
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

    test('Should handle different abort resolutions', async () => {
        expect.assertions(3);

        const task1 = new Task((resolve) => {
            setTimeout(() => resolve(), 1000);
        });

        const task2 = new Task((resolve, reject, controller, onAbort) => {
            onAbort(() => reject('Error!'));
            setTimeout(() => resolve(), 1000);
        });

        const task3 = new Task<number>((resolve, reject, controller, onAbort) => {
            onAbort(() => resolve(1));
            setTimeout(() => resolve(0), 1000);
        });

        setTimeout(() => [
            task1,
            task2,
            task3,
        ].forEach(task => task.abort()), 100);

        await Promise.all([
            expect(task1).rejects.toBeInstanceOf(TaskAbortError),
            expect(task2).rejects.toBe('Error!'),
            expect(task3).resolves.toBe(1),
        ]);
    });

});
