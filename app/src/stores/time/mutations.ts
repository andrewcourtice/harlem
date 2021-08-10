import {
    mutation,
} from './store';

import type {
    ClockType,
} from './types';

export const updateTime = mutation('update-time', state => state.time = new Date());
export const setClockType = mutation('set-clock-type', (state, type: ClockType) => state.clockType = type);
export const addClocks = mutation('add-clocks', (state, timezones: string | string[]) => state.clocks = state.clocks.concat(timezones));
export const removeClock = mutation('remove-clock', (state, timezone: string) => state.clocks = state.clocks.filter(tz => tz !== timezone));