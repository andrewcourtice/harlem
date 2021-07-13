import {
    createStore
} from '@harlem/core';

import actionsExtension from '../src/index';

describe('Actions Extension', () => {

    test('Performs a root reset', () => {
        const {
            action
        } = createStore('test', {
            givenName: 'John',
            surname: 'Smith'
        }, {
            extensions: [
                actionsExtension
            ]
        });

        const loadUserInfo = action('load-user-info', async (id, mutate) => {
            return new Promise(resolve => setTimeout(() => {
                mutate(state => {
                    state.
                });
            }, 300));
        });
    });

});