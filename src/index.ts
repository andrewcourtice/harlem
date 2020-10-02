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
} from './interfaces';

const stores = new Map<string, Registration>();

function getCoreMethods<T>(storeName: string, read: ReadState<T>, write: WriteState<T>, registration: Registration<T>): StoreMethods<T> {
    const getter = <U>(name: string, getter: Getter<T, U>) => {
        registration.registerGetter(name);

        const output = computed(() => getter(read));

        watch(output, () => registration.log('getter', name));

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

export * from './plugins';

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
    } = getCoreMethods(name, state, write, registration);

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

    install(app, options: PluginOptions) {
        const {
            plugins
        } = options;

        if (plugins) {
            plugins.forEach(plugin => installPlugin(plugin, app));
        }
    }

} as Plugin;

// const {
//     getter,
//     mutation
// } = createStore('thing', {
//     a: 1,
//     b: 2,
//     c: {
//         something: 'Hello'
//     }
// });

// const g = getter('thing', state => state.b);
// const m = mutation<number>('thing', (state, payload) => {
//     if (payload) {
//         state.a = payload;
//     }
// });

// m()