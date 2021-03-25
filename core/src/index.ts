import InternalStore from './store';

import eventEmitter from './event-emitter';

import {
    EVENTS,
    OPTIONS,
    SENDER
} from './constants';

import {
    lockObject,
    raiseDuplicationError
} from './utilities';

import type {
    App,
    Plugin
} from 'vue';

import type {
    HarlemPlugin,
    InternalStores,
    Options,
    Store
} from './types';

export {
    EVENTS
} from './constants';

export * from './types';

const stores: InternalStores = new Map();

let installed = false;

function emitCreated(store: InternalStore, state: any): void {
    /*
    This is necessary because the stores may be 
    created before the plugin has been installed.
    */
   const created = () => store.emit(EVENTS.store.created, SENDER, state);

   if (installed) {
       return created();
   }

   eventEmitter.once(EVENTS.core.installed, created);
}

function installPlugin(plugin: HarlemPlugin, app: App): void {
    if (!plugin || typeof plugin.install !== 'function') {
        return;
    }

    const {
        name,
        install
    } = plugin;

    const lockedStores = lockObject(stores, [
        'set',
        'delete',
        'clear'
    ]);

    try {
        install(app, eventEmitter, lockedStores);
    } catch (error) {
        console.warn(`Failed to install Harlem plugin: ${name}. Skipping.`);
    }
}



export const on = eventEmitter.on.bind(eventEmitter);
export const once = eventEmitter.once.bind(eventEmitter);

export function createStore<T extends object = any>(name: string, data: T): Store<T> {
    if (stores.has(name)) {
        raiseDuplicationError('store', name);
    }

    const store = new InternalStore(name, data);
    
    const destroy = () => {
        store.emit(EVENTS.store.destroyed, SENDER, data);
        stores.delete(name);
    };
    
    stores.set(name, store);

    emitCreated(store, data);

    return {
        destroy,
        state: store.state,
        getter: store.getter.bind(store),
        mutation: store.mutation.bind(store),
        on: store.on.bind(store),
        once: store.once.bind(store),
    };
}

export default {

    install(app, options: Options = OPTIONS) {
        const {
            plugins
        } = {
            ...OPTIONS,
            ...options
        };

        if (plugins) {
            plugins.forEach(plugin => installPlugin(plugin, app));
        }

        installed = true;
        eventEmitter.emit(EVENTS.core.installed);
    }

} as Plugin;