import type {
    Options
} from './types';

export const SENDER = 'core';

export const OPTIONS: Options = {
    plugins: []
};

export const EVENTS = {
    core: {
        installed: 'core:installed'
    },
    store: {
        created: 'store:created',
        destroyed: 'store:destroyed'
    },
    mutation: {
        before: 'mutation:before',
        after: 'mutation:after',
        error: 'mutation:error'
    }
};