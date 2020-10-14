import STORES from '../../constants/stores';

import {
    reset as _reset
} from '@harlem/plugin-reset';

export {
    state
} from './store';

export * from './getters';
export * from './mutations';

export function reset(): void {
    return _reset(STORES.main);
}