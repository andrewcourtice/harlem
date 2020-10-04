import Devtools from './devtools';
import Registration from './registration';

import eventEmitter from './event-emitter';

import {
    computed,
    App,
    Plugin,
    reactive,
    readonly,
    watch,
} from 'vue';

import type {
    EventListener,
    Getter,
    HarlemPlugin,
    Mutator,
    PluginOptions,
    ReadState,
    Store,
    StoreMethods,
    WriteState
} from './types';

export * from './types';

const stores = new Map<string, Registration>();

function getCoreMethods<T>(read: ReadState<T>, write: WriteState<T>, registration: Registration<T>): StoreMethods<T> {
    const getter = <U>(name: string, getter: Getter<T, U>) => {
        const output = computed(() => getter(read));
        
        registration.registerGetter(name, () => output.value);

        return output;
    };
    
    const mutation = <U>(name: string, mutator: Mutator<T, U>) => {
        registration.registerMutation(name);

        return (payload?: U) => {
            try {
                mutator(write, payload);
            } catch (error) {
                registration.log('error', name, payload);
            }
    
            registration.log('mutation', name, payload);
        }
    };

    return {
        getter,
        mutation
    };
}

export function on(event: string, handler: Function): EventListener {
    return eventEmitter.on(event, handler);
}

export function off(event: string, handler: Function): void {
    return eventEmitter.off(event, handler);
}

export function createStore<T extends object = any>(name: string, data: T): Store<T> {
    const write = reactive(data) as WriteState<T>;
    const state = readonly(write) as ReadState<T>;

    const registration = new Registration(name, state);

    const {
        getter,
        mutation
    } = getCoreMethods(state, write, registration);

    const localOn = (event: string, handler: Function): EventListener => {
        return on(event, (storeName: string, ...args: any[]) => {
            if (storeName === name) {
                handler(...args);
            }
        });
    }

    stores.set(name, registration);
    
    return {
        state,
        getter,
        mutation,
        on: localOn
    };
}

function installPlugin(plugin: HarlemPlugin, app: App): void {
    const {
        install
    } = plugin;

    try {
        install(app, eventEmitter);
    } catch (error) {
        console.warn('Failed to install Harlem plugin. Skipping')
    }
}

export default {

    install(app, options: PluginOptions = {}) {
        const {
            plugins
        } = options;

        const getStores = () => [...stores.keys()];

        const getSnapshot = (key: string) => {
            const registration = stores.get(key);

            if (!registration) {
                return;
            }

            const getters = [];
            const mutations = [];

            registration.getters.forEach((accessor, key) => getters.push({ key, value: accessor() }));
            registration.mutations.forEach(key => mutations.push({ key }));

            return {
                getters,
                mutations,
                state: registration.state()
            };
        };

        const devtools = new Devtools({
            getStores,
            getSnapshot
        });

        devtools.attach(app);

        if (plugins) {
            plugins.forEach(plugin => installPlugin(plugin, app));
        }
    }

} as Plugin;