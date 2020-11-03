import {
    SENDER
} from './constants';

import type {
    EventPayload,
    HarlemPlugin,
    InternalStore,
    InternalStores
} from '@harlem/core';

import {
    overwrite
} from '@harlem/utilities';

declare global {
    interface Window {
        __harlemState: Record<string, any>;
    }
}

let snapshot: Record<string, any> = {};

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
            eventEmitter.on('store:created', payload => onStoreEvent(stores, payload, store => {
                snapshot[store.name] = store.state;
            }));
        }
        
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
    
            eventEmitter.on('store:created', payload => onStoreEvent(stores, payload, store => {
                if (store.name in data) {
                    store.exec('$ssrInit', SENDER, state => overwrite(state, data[store.name]));
                }
            }));
        }
    
    };
}