import type {
    State,
} from './types';

import {
    NAME,
} from './constants';

const STATE = {
    version: 1.0,
    theme: 'light',
    themes: [
        {
            label: 'Light',
            value: 'light',
        },
        {
            label: 'Dark',
            value: 'dark',
        },
    ],
    time: new Date(),
    timezones: [],
    clockType: 'analogue',
    clockTypes: [
        {
            label: 'Analogue',
            value: 'analogue',
        },
        {
            label: 'Digital',
            value: 'digital',
        },
    ],
    clocks: [
        'Australia/Brisbane',
        'America/New_York',
        'Europe/London',
        'Europe/Paris',
        'Asia/Tokyo',
        'Australia/Sydney',
        'Asia/Hong_Kong',
        'Asia/Dubai',
    ],
} as State;

export default function getState(): State {
    const storageKey = `harlem:${NAME}`;
    const storedValue = localStorage.getItem(storageKey);

    if (!storedValue) {
        return STATE;
    }

    try {
        const storedState = JSON.parse(storedValue) as State;

        if (storedState.version !== STATE.version) {
            localStorage.removeItem(storageKey);
            return STATE;
        }

        return {
            ...STATE,
            ...storedState,
        };
    } catch {
        return STATE;
    }
}