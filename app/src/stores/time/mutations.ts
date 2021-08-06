import {
    state as _state,
    mutation,
} from './store';

import type {
    ClockType,
} from './types';

export const updateTime = mutation('update-time', state => state.time = new Date());
export const setClockType = mutation('set-clock-type', (state, type: ClockType) => {
    state.clockType = type;
    console.log(type, state.clockType, _state.clockType);
});