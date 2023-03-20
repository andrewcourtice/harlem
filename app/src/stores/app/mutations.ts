import {
    MUTATIONS,
} from './constants';

import {
    mutation,
} from './store';

export const updateTime = mutation(MUTATIONS.updateTime, state => state.time = new Date());
export const addClocks = mutation(MUTATIONS.addClocks, (state, timezones: string | string[]) => state.clocks = state.clocks.concat(timezones));
export const removeClock = mutation(MUTATIONS.removeClock, (state, timezone: string) => state.clocks = state.clocks.filter(tz => tz !== timezone));