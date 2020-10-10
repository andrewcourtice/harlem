import {
    mutation
} from './store';

export const setGivenName = mutation<string>('setGivenName', (state, payload) => {
    state.givenName = payload || '';
});

export const setSurname = mutation<string>('setSurname', (state, payload) => {
    state.surname = payload || '';
});

export const setDateOfBirth = mutation<Date>('setDateOfBirth', (state, payload) => {
    if (!payload || (new Date).getFullYear() - payload.getFullYear() < 1) {
        return;
    }
    
    state.dateOfBirth = payload;
});