import {
    mutation
} from './store';

export const setGivenName = mutation<string>('set-given-name', (state, payload) => {
    if (payload) {
        state.givenName = payload;
    }
});

export const setSurname = mutation<string>('set-surname', (state, payload) => {
    if (payload) {
        state.surname = payload;
    }
});