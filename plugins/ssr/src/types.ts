import {
    BaseState,
} from '@harlem/core';

declare global {
    interface Window {
        __harlemState: SSRData;
    }
}

export type SSRData = Record<string, BaseState>;
export type SSRSerializer = (snapshot: SSRData) => string;