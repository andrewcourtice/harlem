import STATE from './state';

import actionExtension from '@harlem/extension-action';
import historyExtension from '@harlem/extension-history';

import {
    createStore,
} from '@harlem/core';

export const {
    state,
    getter,
    mutation,
    action,
    undo,
    redo,
    isActionRunning,
} = createStore('time', STATE, {
    extensions: [
        actionExtension(),
        historyExtension({
            mutations: [
                {
                    name: 'add-clock',
                    description: 'Add a clock',
                },
                {
                    name: 'remove-clock',
                    description: 'Remove a clock',
                },
                {
                    name: 'set-clock-type',
                    description: 'Set clock type',
                },
            ],
        }),
    ],
});