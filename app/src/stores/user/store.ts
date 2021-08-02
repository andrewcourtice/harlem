import STATE from './state';

import {
    createStore,
} from '@harlem/core';

import {
    reset as _reset,
} from '@harlem/plugin-reset';

import type {
    State,
} from './types';

const NAME = 'user';

export const {
    state,
    getter,
    mutation,
    on,
} = createStore<State>(NAME, STATE);

export const reset = () => _reset(NAME);