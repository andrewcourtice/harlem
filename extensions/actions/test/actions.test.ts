import {
    createStore
} from '@harlem/core';

import {
    Task
} from '@harlem/utilities';

import actionsExtension from '../src';

interface UserInfo {
    firstName: string;
    lastname: string;
    age: number;
}

const STATE = {
    firstName: 'John',
    lastname: 'Smith',
    age: 28
} as UserInfo;

function fetchUserInfo(controller: AbortController, timeout: number = 300): Task<UserInfo> {
    return new Task((resolve, reject, controller, onAbort) => {
        const handle = setTimeout(() => resolve({
            firstName: 'Jane',
            lastname: 'Doe',
            age: 32
        }), timeout);

        onAbort(() => (clearTimeout(handle), reject('Aborted!')));
    }, controller);
}

describe('Actions Extension', () => {

    test('Runs an action', async () => {
        const {
            state,
            action
        } = createStore('basic-action', { ...STATE }, {
            extensions: [
                actionsExtension
            ]
        });

        const actionName = 'load-user-info';

        const loadUserInfo = action(actionName, async (_, mutate, controller) => {
            const userDetails = await fetchUserInfo(controller);

            mutate(state => Object.assign(state, userDetails));
        });

        await loadUserInfo();
        
        expect(state.firstName).toBe('Jane');
        expect(state.lastname).toBe('Doe');
        expect(state.age).toBe(32);
    });

    test('Handles run count', async () => {
        const {
            state,
            action,
            hasActionRun,
            isActionRunning
        } = createStore('test', { ...STATE }, {
            extensions: [
                actionsExtension
            ]
        });

        const actionName = 'load-user-info';

        const loadUserInfo = action(actionName, async (_, mutate, controller) => {
            const userDetails = await fetchUserInfo(controller);

            mutate(state => Object.assign(state, userDetails));
        });        
        
        expect(hasActionRun(actionName)).toBe(false);
        expect(isActionRunning(actionName)).toBe(false);
        
        const promise = loadUserInfo();
        
        expect(isActionRunning(actionName)).toBe(true);
        
        await promise;
        
        expect(state.firstName).toBe('Jane');
        expect(state.lastname).toBe('Doe');
        expect(state.age).toBe(32);
        expect(hasActionRun(actionName)).toBe(true);
    });

    test('Handles cancellation', async () => {
        const {
            state,
            action,
            hasActionRun
        } = createStore('cancel-action', { ...STATE }, {
            extensions: [
                actionsExtension
            ]
        });

        const actionName = 'load-user-info';

        const loadUserInfo = action(actionName, async (_, mutate, controller) => {
            const userDetails = await fetchUserInfo(controller);

            mutate(state => Object.assign(state, userDetails));
        });

        const task = loadUserInfo();

        setTimeout(() => task.abort(), 100);

        try {
            await task;
        } catch {

        } finally {
            expect(state.firstName).toBe('John');
            expect(state.lastname).toBe('Smith');
            expect(state.age).toBe(28);
            expect(hasActionRun(actionName)).toBe(false);
        }
    });

    test('Handles concurrency', async () => {
        const {
            action,
        } = createStore('cancel-action', { ...STATE }, {
            extensions: [
                actionsExtension
            ]
        });

        const singleAction = action('cation', async () => {});
        const concurrentAction = action('cation', async () => {}, {
            parallel: true
        });

        let hasSingleFailed = false;

        try {
            await Promise.all([
                singleAction(),
                singleAction()
            ]);
        } catch {
            hasSingleFailed = true;
        }

        let hasConcurrentFailed = false;

        try {
            await Promise.all([
                concurrentAction(),
                concurrentAction()
            ]);
        } catch {
            hasConcurrentFailed = true;
        }

        expect(hasSingleFailed).toBe(true);
        expect(hasConcurrentFailed).toBe(false);
    });

});