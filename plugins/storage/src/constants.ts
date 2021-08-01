import type {
    Options,
    StorageMap,
} from './types';

export const SENDER = 'storage';

export const OPTIONS: Options = {
    type: 'local',
    prefix: 'harlem',
    sync: true,
};

export const STORAGE: StorageMap = {
    local: localStorage,
    session: sessionStorage,
};