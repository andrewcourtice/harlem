import {
    mutation,
} from './store';

import type {
    UserDetails,
} from './types';

export const setUserId = mutation('set-user-id', (state, id: number) => {
    state.id = id;
});

export const setUserDetails = mutation('set-user-details', (state, details: Partial<UserDetails>) => {
    Object.assign(state.details, details);
});