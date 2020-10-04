import STATE from './state';

import {
    createStore
} from '@harlem/core';

export const {
    state,
    getter,
    mutation
} = createStore('user', STATE);