import getState from './state';
import composeExtension from '@harlem/extension-compose';
import storageExtension from '@harlem/extension-storage';

import {
    MUTATIONS,
    NAME,
} from './constants';

import {
    createStore,
} from 'harlem';

export const {
    state,
    getter,
    mutation,
    action,
    reset,
    computeState,
} = createStore(NAME, getState(), {
    extensions: [
        composeExtension(),
        storageExtension({
            exclude: [
                MUTATIONS.updateTime,
            ],
        }),
    ],
});