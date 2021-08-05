import actionExtension from '@harlem/extension-action';
import historyExtension from '@harlem/extension-history';

import {
    createStore,
} from '@harlem/core';

import {
    utcToZonedTime,
} from 'date-fns-tz';

export interface Timezone {
    value: string;
    abbr: string;
    offset: number;
    isdst: boolean;
    text: string;
    utc: string[];
}

export interface State {
    time: Date;
    timezones: Timezone[];
    clocks: string[];
}

const STATE = {
    time: new Date(),
    timezones: [],
    clocks: [
        'Australia/Brisbane',
        'America/New_York',
        'Europe/Paris',
    ],
} as State;

export const {
    state,
    getter,
    mutation,
    action,
    undo,
    redo,
    isActionRunning
} = createStore('time', STATE, {
    extensions: [
        actionExtension(),
        historyExtension({
            mutations: [
                {
                    name: 'add-clock',
                    description: 'Add a clock',
                },
            ],
        }),
    ],
});

export const timezoneOptions = getter('timezone-options', ({ timezones }) => {
    return timezones.flatMap(({ utc }) => utc);
});

export const clocks = getter('clocks', ({ clocks, time }) => {
    return clocks.map(timezone => ({
        timezone,
        time: utcToZonedTime(time, timezone),
    }));
});

export const updateTime = mutation('update-time', state => state.time = new Date());

export const loadTimezones = action('load-timezones', async (_, mutate) => {
    const {
        default: timezones,
    } = await import('../../assets/data/timezones.json');

    mutate(state => state.timezones = timezones);
});

setInterval(() => updateTime(), 1000);