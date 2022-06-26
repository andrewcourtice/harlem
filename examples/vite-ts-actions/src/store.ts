import composeExtension from '@harlem/extension-compose';
import actionExtension from '@harlem/extension-action';
import storageExtension from '@harlem/extension-storage';

import {
    createStore,
} from '@harlem/core';

export const {
    state,
    getter,
    mutation,
    action,
    reset,
    computeState,
    isActionRunning,
} = createStore('app', {
    firstName: 'John',
    lastName: 'Smith',
}, {
    extensions: [
        composeExtension(),
        actionExtension(),
        storageExtension({
            prefix: 'vite-ts-actions',
            restore: true,
        }),
    ],
});

let actionHandle: number | undefined;

export const fullName = getter('fullname', ({ firstName, lastName }) => `${firstName} ${lastName}`);

export const getNewName = action('get-new-name', async (timeout: number, mutate, controller, onAbort) => {
    onAbort(() => window.clearTimeout(actionHandle));

    const setName = () => mutate(state => {
        state.firstName = 'Jane';
        state.lastName = 'Doe';
    });

    await new Promise(resolve => {
        actionHandle = window.setTimeout(() => (setName(), resolve(true)), timeout);
    });
});

// Here's an example using fetch to get a value from an API
export const fetchNewName = action('fetch-new-name', async (payload, mutate, { signal }) => {
    // Send the signal with fetch to automatically
    // cancel the network request if the action is cancelled
    const response = await fetch('/some-api/get-name', { signal });

    const {
        firstName,
        lastName,
    } = await response.json();

    mutate(state => {
        state.firstName = firstName;
        state.lastName = lastName;
    });
});