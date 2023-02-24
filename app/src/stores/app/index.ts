import {
    updateTime,
} from './mutations';

export {
    state,
    computeState,
    undo,
    redo,
    canUndo,
    canRedo,
} from './store';

export * from './getters';
export * from './mutations';
export * from './actions';
export * from './types';

setInterval(() => updateTime(), 1000);