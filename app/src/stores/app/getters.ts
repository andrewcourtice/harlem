import {
    GETTERS,
} from './constants';

import {
    getter,
} from './store';

import {
    utcToZonedTime,
} from 'date-fns-tz';

export const timezones = getter(GETTERS.timezones, ({ timezones, clocks }) => {
    const output = timezones
        .flatMap(({ utc }) => utc)
        .filter(timezone => !clocks.includes(timezone))
        .sort((valueA, valueB) => valueA.localeCompare(valueB));

    return Array.from(new Set(output));
});

export const clocks = getter(GETTERS.clocks, ({ clocks, time }) => {
    return clocks.map(timezone => ({
        timezone,
        time: utcToZonedTime(time, timezone),
    }));
});