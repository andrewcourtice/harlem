import STATE from './state';

import actionExtension from '@harlem/extension-action';

import {
    createStore,
} from '@harlem/core';

export const {
    state,
    getter,
    mutation,
    action,
    isActionRunning,
} = createStore('time', STATE, {
    extensions: [
        actionExtension(),
    ],
});