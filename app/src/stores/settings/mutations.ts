import {
    mutation
} from './store';

import {
    Settings
} from './types';

type Payload = Partial<Settings>;

export const updateSettings = mutation<Payload>('updateSettings', (state, payload) => {
    if (payload) {
        Object.assign(state, payload);
    }
});