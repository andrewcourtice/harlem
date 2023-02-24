import getState from './state';
import composeExtension from '@harlem/extension-compose';
import storageExtension from '@harlem/extension-storage';
import historyExtension from '@harlem/extension-history';

import {
    ACTIONS,
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
    undo,
    redo,
    canUndo,
    canRedo,
} = createStore(NAME, getState(), {
    extensions: [
        composeExtension(),
        historyExtension({
            mutations: {
                include: '*',
                exclude: [
                    MUTATIONS.updateTime,
                    ACTIONS.loadTimezones,
                ],
            },
        }),
        storageExtension({
            exclude: [
                MUTATIONS.updateTime,
            ],
        }),
    ],
});