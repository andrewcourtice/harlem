import InternalStore from './internal-store';

import eventEmitter from './event-emitter';

import type {
    App,
    Plugin
} from 'vue';

import type {
    HarlemPlugin,
    Options,
    Store
} from './types';

export * from './types';

const OPTIONS: Options = {
    plugins: []
};

const stores = new Map<string, InternalStore>();

function installPlugin(plugin: HarlemPlugin, app: App): void {
    if (!plugin || typeof plugin.install !== 'function') {
        return;
    }

    const {
        name,
        install
    } = plugin;

    try {
        install(app, eventEmitter, stores);
    } catch (error) {
        console.warn(`Failed to install Harlem plugin: ${name}. Skipping.`);
    }
}

function getLocalHandler(name: string, handler: Function): Function {
    return (storeName: string, ...args: any[]) => {
        if (storeName === name) {
            handler(...args);
        }
    };
}

export function createStore<T extends object = any>(name: string, data: T): Store<T> {
    if (stores.has(name)) {
        throw new Error(`A store named ${name} has already been registered`);
    }

    const store = new InternalStore(name, data);

    stores.set(name, store);
    
    return {
        state: store.state,
        getter: store.getter.bind(store),
        mutation: store.mutation.bind(store),
        on: store.on.bind(store),
        once: store.once.bind(store),
        destroy: () => stores.delete(name)
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
    }

} as Plugin;