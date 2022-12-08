import {
    SSRSerializer,
} from './types';

export const SENDER = 'plugin:ssr';
export const SERIALIZER: SSRSerializer = snapshot => JSON.stringify(snapshot);

export const MUTATIONS = {
    init: 'plugin:ssr:init',
} as const;