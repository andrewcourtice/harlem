import Task from '../src';

import {
    describe,
    test,
    expect,
} from 'vitest';

describe('Task', () => {

    test('Should handle cancellation', () => {

        const runTimeout = (timeout: number) => new Task<boolean>((resolve, reject, controller, onAbort) => {
            const handle = setTimeout(() => resolve(true), timeout);

            onAbort(() => {
                clearTimeout(handle);
                reject('aborted');
            });
        });

        const task = runTimeout(1000);

        setTimeout(() => task.abort(), 100);

        return expect(task).rejects.toMatch('aborted');
    });

});
