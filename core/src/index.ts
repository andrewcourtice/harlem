import InternalStore from './store';

import eventEmitter from './event-emitter';

import {
    EVENTS,
    SENDER
} from './constants';

import {
    lockObject,
    raiseOverwriteError
} from './utilities';

import type {
    App,
    Plugin
} from 'vue';

import type {
    EventHandler,
    HarlemPlugin,
    InternalStores,
    MutationEventData,
    PluginOptions,
    Store,
    StoreOptions,
} from './types';

export {
    EVENTS
} from './constants';

export * from './types';

const stores: InternalStores = new Map();

let installed = false;

function validateStoreCreation(name: string): void {
    const store = stores.get(name);

    if (store && !store.allowsOverwrite) {
        raiseOverwriteError('store', name);
    }
}

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

export function createStore<T extends object = any>(name: string, data: T, options?: Partial<StoreOptions>): Store<T> {
    const {
        allowOverwrite
    } = {
        allowOverwrite: true,
        ...options
    };

    validateStoreCreation(name);

    const store = new InternalStore(name, data, {
        allowOverwrite
    });

    const destroy = () => {
        store.emit(EVENTS.store.destroyed, SENDER, data);
        stores.delete(name);
    };

    const getMutationHook = (eventName: string) => {
        return <TPayload = any, TResult = any>(callback: EventHandler<MutationEventData<TPayload, TResult>>) => store.on(eventName, callback);
    };

    const onBeforeMutation = getMutationHook(EVENTS.mutation.before);
    const onAfterMutation = getMutationHook(EVENTS.mutation.after);
    const onMutationError = getMutationHook(EVENTS.mutation.error);

    stores.set(name, store);
    emitCreated(store, data);

    return {
        destroy,
        onBeforeMutation,
        onAfterMutation,
        onMutationError,
        state: store.state,
        getter: store.getter.bind(store),
        mutation: store.mutation.bind(store),
        on: store.on.bind(store),
        once: store.once.bind(store),
    };
}

export default {

    install(app, options?: PluginOptions) {
        const {
            plugins
        } = {
            plugins: [],
            ...options
        };

        if (plugins) {
            plugins.forEach(plugin => installPlugin(plugin, app));
        }

        installed = true;
        eventEmitter.emit(EVENTS.core.installed);
    }

} as Plugin;
