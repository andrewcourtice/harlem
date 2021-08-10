import type {
    State,
} from './types';

export default {
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