import {
    createStore
} from '@harlem/core';

import actionsExtension from '../src';

describe('Actions Extension', () => {

    test('Runs an action', async () => {
        const {
            state,
            action,
            isActionRunning
        } = createStore('test', {
            givenName: 'John',
            surname: 'Smith',
            age: 28
        }, {
            extensions: [
                actionsExtension
            ]
        });

        const actionName = 'load-user-info';

        const loadUserInfo = action(actionName, async (name: string, mutate) => {
            return new Promise(resolve => setTimeout(() => {
                mutate(state => {
                    state.givenName = name;
                    state.age = 26;
                });

                resolve(true);
            }, 300));
        });

        const promise = loadUserInfo('Jane');

        expect(isActionRunning(actionName)).toBe(true);
        
        await promise;
        
        expect(state.givenName).toBe('Jane');
        expect(state.age).toBe(26);
        expect(isActionRunning(actionName)).toBe(false);
    });

});