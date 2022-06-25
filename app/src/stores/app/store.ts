import getState from './state';
import composeExtension from '@harlem/extension-compose';
import storageExtension from '@harlem/extension-storage';
import resetExtension from '@harlem/extension-reset';

import {
    MUTATIONS,
    NAME,
} from './constants';

import {
    createStore,
} from '@harlem/core';

export const {
    state,
    getter,
    mutation,
    action,
    computeState,
} = createStore(NAME, getState(), {
    extensions: [
        composeExtension(),
        storageExtension({
            exclude: [
                MUTATIONS.updateTime,
            ],
        }),
        resetExtension(),
    ],
});