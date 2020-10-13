import InternalStore from './internal-store';

import eventEmitter from './event-emitter';

import {
    lockObject
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

export * from './types';

const SENDER = 'core';
const OPTIONS: Options = {
    plugins: []
};

const stores: InternalStores = new Map();

let installed = false;

function installPlugin(plugin: HarlemPlugin, app: App): void {
    if (!plugin || typeof plugin.install !== 'function') {
        return;
    }

    const {
        name,
        install
    } = plugin;

    const lockedStores = lockObject(stores, ['set', 'delete', 'clear']);

    try {
        install(app, eventEmitter, lockedStores);
    } catch (error) {
        console.warn(`Failed to install Harlem plugin: ${name}. Skipping.`);
    }
}

export function createStore<T extends object = any>(name: string, data: T): Store<T> {
    if (stores.has(name)) {
        throw new Error(`A store named ${name} has already been registered`);
    }

    const store = new InternalStore(name, data);
    
    const destroy = () => {
        store.emit('store:destroyed', SENDER, data);
        stores.delete(name);
    };

    const emitCreated = () => store.emit('store:created', SENDER, data);

    (installed
        ? emitCreated
        : () => eventEmitter.once('core:installed', emitCreated)
    )();
    
    stores.set(name, store);

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
        eventEmitter.emit('core:installed');
    }

} as Plugin;