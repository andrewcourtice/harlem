import {
    MUTATIONS,
    SENDER,
    SERIALIZER,
} from './constants';

import {
    EventPayload,
    EVENTS,
    HarlemPlugin,
    InternalStore,
    InternalStores,
} from '@harlem/core';

import {
    objectOverwrite,
} from '@harlem/utilities';

import type {
    SSRData,
    SSRSerializer,
} from './types';

export * from './types';

const snapshot: SSRData = {};

function onStoreEvent(stores: InternalStores, payload: EventPayload | undefined, callback: (store: InternalStore) => void): void {
    if (!payload) {
        return;
    }

    const store = stores.get(payload.store);

    if (store) {
        callback(store);
    }
}

/**
 * Generate a script required to transfer state from server to client
*/
export function getBridgingScript(serializer: SSRSerializer = SERIALIZER): string {
    return `window.__harlemState = ${serializer(snapshot)};`;
}

/**
 * Generate a script block required to transfer state from server to client
*/
export function getBridgingScriptBlock(serializer: SSRSerializer = SERIALIZER): string {
    return `<script>${getBridgingScript(serializer)}</script>`;
}

/**
 * Create a new instance of the server-side SSR plugin
*/
export function createServerSSRPlugin(): HarlemPlugin {
    return (app, eventEmitter, stores) => {
        stores.forEach(store => store.flags.set('ssr:server', true));

        eventEmitter.on(EVENTS.ssr.initServer, payload => onStoreEvent(stores, payload, store => {
            snapshot[store.name] = store.state;
        }));
    };
}

/**
 * Create a new instance of the client-side SSR plugin
 */
export function createClientSSRPlugin(): HarlemPlugin {
    return (app, eventEmitter, stores) => {
        const data = window.__harlemState;

        stores.forEach(store => store.flags.set('ssr:client', true));

        eventEmitter.on(EVENTS.ssr.initClient, payload => onStoreEvent(stores, payload, store => {
            if (store.name in data) {
                store.write(MUTATIONS.init, SENDER, state => objectOverwrite(state, data[store.name]));
                delete data[store.name];
            }
        }));
    };
}