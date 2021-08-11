import getState from './state';
import actionExtension from '@harlem/extension-action';
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
} = createStore(NAME, getState(), {
    extensions: [
        actionExtension(),
        storageExtension({
            exclude: [
                MUTATIONS.updateTime,
            ],
        }),
    ],
});