import InternalStore from './internal-store';

import eventEmitter from './event-emitter';

import {
    computed,
    App,
    Plugin,
    reactive,
    readonly
} from 'vue';

import type {
    Getter,
    HarlemPlugin,
    Mutator,
    Options,
    ReadState,
    Store,
    StoreEvent,
    StoreMethods,
    WriteState
} from './types';

export * from './types';

const DEFAULT_OPTIONS: Options = {
    plugins: []
};

const stores = new Map<string, InternalStore>();

function getCoreMethods<T>(read: ReadState<T>, write: WriteState<T>, store: InternalStore<T>): StoreMethods<T> {
    const getter = <U>(name: string, getter: Getter<T, U>) => {
        const output = computed(() => getter(read));
        
        store.registerGetter(name, () => output.value);

        return output;
    };
    
    const mutation = <U>(name: string, mutator: Mutator<T, U>) => {
        store.registerMutation(name);

        return (payload?: U) => {
            try {
                mutator(write, payload);
            } catch (error) {
                store.emit('error', name, payload);
            }
    
            store.emit('mutation', name, payload);
        }
    };

    return {
        getter,
        mutation
    };
}

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

    const write = reactive(data) as WriteState<T>;
    const state = readonly(write) as ReadState<T>;

    const store = new InternalStore(name, state);

    const {
        getter,
        mutation
    } = getCoreMethods(state, write, store);

    const on = (event: StoreEvent, handler: Function) => {
        return eventEmitter.on(event, getLocalHandler(name, handler));
    };

    const once = (event: StoreEvent, handler: Function) => {
        return eventEmitter.once(event, getLocalHandler(name, handler));
    };

    const destroy = () => stores.delete(name);

    stores.set(name, store);
    
    return {
        state,
        getter,
        mutation,
        on,
        once,
        destroy
    };
}

export default {

    install(app, options: Options = DEFAULT_OPTIONS) {
        const {
            plugins
        } = {
            ...DEFAULT_OPTIONS,
            ...options
        };

        if (plugins) {
            plugins.forEach(plugin => installPlugin(plugin, app));
        }
    }

} as Plugin;