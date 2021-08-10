import {
    updateTime,
} from './mutations';

export {
    state,
    isActionRunning,
} from './store';

export * from './getters';
export * from './mutations';
export * from './actions';
export * from './types';

setInterval(() => updateTime(), 1000);