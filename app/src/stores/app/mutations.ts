import {
    MUTATIONS,
} from './constants';

import {
    mutation,
} from './store';

import type {
    ClockType,
    Theme,
} from './types';

export const setTheme = mutation(MUTATIONS.setTheme, (state, theme: Theme) => state.theme = theme);
export const updateTime = mutation(MUTATIONS.updateTime, state => state.time = new Date());
export const setClockType = mutation(MUTATIONS.setClockType, (state, type: ClockType) => state.clockType = type);
export const addClocks = mutation(MUTATIONS.addClocks, (state, timezones: string | string[]) => state.clocks = state.clocks.concat(timezones));
export const removeClock = mutation(MUTATIONS.removeClock, (state, timezone: string) => state.clocks = state.clocks.filter(tz => tz !== timezone));