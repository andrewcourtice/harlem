import {
    getter
} from './store';

export const fullName = getter('name', state => `${state.givenName} ${state.surname}`);