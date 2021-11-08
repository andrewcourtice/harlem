import getState from './state';
import actionExtension from '@harlem/extension-action';
import composeExtension from '@harlem/extension-compose';
import storageExtension from '@harlem/extension-storage';

import {
    NAME,
    MUTATIONS,
} from './constants';

import {
    createStore,
} from '@harlem/core';

export const {
    state,
    getter,
    mutation,
    action,
    isActionRunning,
    computeState,
} = createStore(NAME, getState(), {
    extensions: [
        actionExtension(),
        composeExtension(),
        storageExtension({
            exclude: [
                MUTATIONS.updateTime,
            ],
        }),
    ],
});