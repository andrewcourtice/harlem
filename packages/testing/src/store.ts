import {
    BaseState,
    createStore,
    Extension,
    StoreOptions,
} from '@harlem/core';

export interface UserDetails {
    firstName: string;
    lastName: string;
    age: number;
}

export interface State extends BaseState {
    id: number;
    details: UserDetails
}

const STATE = {
    id: 0,
    details: {
        firstName: '',
        lastName: '',
        age: 0,
    },
};

export function jsonClone<T>(value: T): T {
    return JSON.parse(JSON.stringify(value));
}

export function getStore<TExtensions extends Extension<typeof STATE>[]>(options?: Partial<StoreOptions<typeof STATE, TExtensions>>) {
    const resetState = jsonClone(STATE);

    const name = 'testing';
    const store = createStore(name, jsonClone(STATE), options);
    const reset = store.mutation('reset', state => Object.assign(state, resetState));
    const fullName = store.getter('full-name', ({ details }) => `${details.firstName} ${details.lastName}`);
    const setUserID = store.mutation<number>('set-user-id', (state, id = Math.random() * 1000) => state.id = id);
    const setUserDetails = store.mutation<Partial<UserDetails>>('set-user-details', (state, details) => {
        Object.assign(state.details, details);
    });

    return {
        name,
        store,
        reset,
        fullName,
        setUserID,
        setUserDetails,
    };
}