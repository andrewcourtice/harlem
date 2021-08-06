import {
    getter,
} from './store';

import {
    utcToZonedTime,
} from 'date-fns-tz';

export const timezones = getter('timezones', ({ timezones }) => {
    return timezones.flatMap(({ utc }) => utc);
});

export const clocks = getter('clocks', ({ clocks, time }) => {
    return clocks.map(timezone => ({
        timezone,
        time: utcToZonedTime(time, timezone),
    }));
});