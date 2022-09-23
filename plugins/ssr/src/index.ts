import {
    MUTATIONS,
    SENDER,
} from './constants';

import {
    EventPayload,
    EVENTS,
    HarlemPlugin,
    INTERNAL,
    InternalStore,
    InternalStores,
} from '@harlem/core';

import {
    objectOmit,
    objectOverwrite,
} from '@harlem/utilities';

declare global {
    interface Window {
        __harlemState: Record<string, any>;
    }
}

const snapshot: Record<string, any> = {};

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
export function getBridgingScript(): string {
    return `window.__harlemState = ${JSON.stringify(snapshot)};`;
}

/**
 * Generate a script block required to transfer state from server to client
*/
export function getBridgingScriptBlock(): string {
    return `<script>${getBridgingScript()}</script>`;
}

/**
 * Create a new instance of the server-side SSR plugin
*/
export function createServerSSRPlugin(): HarlemPlugin {
    return {

        name: 'server-ssr',

        install(app, eventEmitter, stores) {
            stores.forEach(store => store.setFlag('ssr:server', true));

            eventEmitter.on(EVENTS.ssr.initServer, payload => onStoreEvent(stores, payload, store => {
                snapshot[store.name] = objectOmit(store.state, INTERNAL.pattern);
            }));
        },

    };
}

/**
 * Create a new instance of the client-side SSR plugin
 */
export function createClientSSRPlugin(): HarlemPlugin {
    return {

        name: 'client-ssr',

        install(app, eventEmitter, stores) {
            const data = window.__harlemState;

            stores.forEach(store => store.setFlag('ssr:client', true));

            eventEmitter.on(EVENTS.ssr.initClient, payload => onStoreEvent(stores, payload, store => {
                if (store.name in data) {
                    store.write(MUTATIONS.init, SENDER, state => objectOverwrite(state, data[store.name], INTERNAL.pattern));
                }
            }));
        },

    };
}