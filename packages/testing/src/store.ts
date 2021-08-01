import {
    createStore,
} from '@harlem/core';

export interface UserDetails {
    firstName: string;
    lastName: string;
    age: number;
}

export interface State {
    id: number;
    details: UserDetails
}

const NAME = 'testing';

const STATE = {
    id: 0,
    details: {
        firstName: '',
        lastName: '',
        age: 0,
    },
} as State;

const {
    mutation,
    ...store
} = createStore(NAME, STATE);

const resetState = JSON.parse(JSON.stringify(STATE));

export const name = NAME;
export const state = store.state;

export const setUserID = mutation<number>('set-user-id', (state, id) => state.id = id);

export const setUserDetails = mutation<Partial<UserDetails>>('set-user-details', (state, details) => {
    Object.assign(state.details, details);
});

export const reset = mutation('reset', state => Object.assign(state, resetState));