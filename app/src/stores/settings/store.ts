import STORES from '../../constants/stores';
import STATE from './state';

import {
    createStore
} from '@harlem/core';

export const {
    state,
    getter,
    mutation
} = createStore(STORES.settings, STATE);