import Task, {
    TaskAbortError,
} from '../src';

import {
    describe,
    test,
    expect,
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

});
