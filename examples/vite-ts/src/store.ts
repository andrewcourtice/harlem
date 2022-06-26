import composeExtension from '@harlem/extension-compose';
import storageExtension from '@harlem/extension-storage';

import {
    createStore,
} from '@harlem/core';

export const {
    state,
    getter,
    reset,
    computeState,
} = createStore('app', {
    firstName: 'John',
    lastName: 'Smith',
}, {
    extensions: [
        composeExtension(),
        storageExtension({
            prefix: 'vite-ts',
            restore: true,
        }),
    ],
});

export const fullName = getter('fullname', ({ firstName, lastName }) => `${firstName} ${lastName}`);