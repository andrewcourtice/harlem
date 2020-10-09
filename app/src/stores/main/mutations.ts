import {
    mutation
} from './store';

export const setGivenName = mutation<string>('setGivenName', (state, payload) => {
    state.givenName = payload || '';
});

export const setSurname = mutation<string>('setSurname', (state, payload) => {
    state.surname = payload || '';
});