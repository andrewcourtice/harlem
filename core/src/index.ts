import InternalStore from './store';

import eventEmitter from './event-emitter';

import {
    EVENTS,
    SENDER,
} from './constants';

import {
    matchGetFilter,
    objectLock,
    typeIsFunction,
    typeIsMatchable,
} from '@harlem/utilities';

import type {
    App,
    Plugin,
} from 'vue';

import type {
    BaseState,
    EventPayload,
    Extension,
    HarlemPlugin,
    InternalStores,
    PluginOptions,
    PublicStore,
    StoreOptions,
    Trigger,
    TriggerEventData,
} from './types';

export {
    EVENTS,
    INTERNAL,
} from './constants';

export * from './types';

const stores: InternalStores = new Map();

let installed = false;

function validateStoreCreation(name: string): void {
    const store = stores.get(name);

    if (store && !store.allowsOverwrite) {
        throw new Error(`A store named ${name} has already been registered.`);
    }
}

function emitCreated(store: InternalStore, state: any): void {
    /*
    This is necessary because the stores may be
    created before the plugin has been installed.
    */
    const created = () => {
        store.emit(EVENTS.ssr.initClient, SENDER, state);
        store.emit(EVENTS.store.created, SENDER, state);
        store.emit(EVENTS.ssr.initServer, SENDER, state);
        store.emit(EVENTS.store.ready, SENDER, state);
        store.emit(EVENTS.devtools.update, SENDER, state);
    };

    if (installed) {
        return created();
    }

    eventEmitter.once(EVENTS.core.installed, created);
}

function getExtendedStore<TState extends BaseState, TExtensions extends Extension<TState>[]>(
    store: InternalStore<TState>,
    extensions: TExtensions
): ReturnType<Extension<TState>> {
    return extensions.reduce((output, extension) => {
        let result = {};

        try {
            result = extension(store) || {};
        } catch {
            result = {};
        }

        return {
            ...output,
            ...result,
        };
    }, {});
}

function installPlugin(plugin: HarlemPlugin, app: App): void {
    if (!plugin || !typeIsFunction(plugin.install)) {
        return;
    }

    const {
        name,
        install,
    } = plugin;

    const lockedStores = objectLock(stores, [
        'set',
        'delete',
        'clear',
    ]);

    try {
        install(app, eventEmitter, lockedStores);
    } catch (error) {
        console.warn(`Failed to install Harlem plugin: ${name}. Skipping.`);
    }
}

export const on = eventEmitter.on.bind(eventEmitter);
export const once = eventEmitter.once.bind(eventEmitter);

/**
 * Create the Harlem plugin to be registered with a Vue application
 *
 * @param options - Options used to globally configure Harlem
 *
 * @example
 * // Create the plugin
 * const harlem = createHarlem({
 *     plugins: [
 *         createSSRPlugin(),
 *         createDevtoolsPlugin()
 *     ]
 * });
 *
 * // Register with Vue
 * app.use(harlem);
 */
export function createHarlem(options?: PluginOptions): Plugin {
    if (installed) {
        throw new Error('Only a single instance of Harlem can be created');
    }

    return {
        install(app) {
            const {
                plugins,
            } = {
                plugins: [],
                ...options,
            };

            if (plugins) {
                plugins.forEach(plugin => installPlugin(plugin, app));
            }

            installed = true;
            eventEmitter.emit(EVENTS.core.installed);
        },
    };
}

/**
 * Create a new Harlem store.
 *
 * @param name - The name of this store.
 * @param state - The initial state of this store.
 * @param options - Additional options used to configure this store.
 *
 * @example
 * // Define the initial state of this store
 * const STATE = {
 *     firstName: 'John',
 *     lastName: 'Smith'
 * };
 *
 * // Create the store with the initial state and any options/extensions
 * const {
 *     state,
 *     getter,
 *     mutation,
 *     action
 * } = createStore('app', STATE, {
 *     extensions: [
 *         actionExtension()
 *     ]
 * })
 */
export function createStore<TState extends BaseState, TExtensions extends Extension<TState>[]>(
    name: string,
    state: TState,
    options?: Partial<StoreOptions<TState, TExtensions>>
): PublicStore<TState, TExtensions> {
    const {
        allowOverwrite,
        providers,
        extensions,
    } = {
        allowOverwrite: true,
        extensions: [] as unknown as TExtensions,
        ...options,
    };

    validateStoreCreation(name);

    const store = new InternalStore(name, state, {
        allowOverwrite,
        providers,
    });

    const destroy = () => {
        stores.delete(name);
        store.destroy();
        store.emit(EVENTS.store.destroyed, SENDER, state);
        store.emit(EVENTS.devtools.update, SENDER, state);
    };

    const getTrigger = (eventName: string): Trigger => {
        return (matcher, handler) => {
            const filter = matchGetFilter(
                typeIsMatchable(matcher)
                    ? matcher
                    : {
                        include: matcher,
                        exclude: [],
                    }
            );

            return store.on(eventName, (event?: EventPayload<TriggerEventData>) => {
                if (event && !filter(event.data.name)) {
                    handler(event.data);
                }
            });
        };
    };

    const onBeforeMutation = getTrigger(EVENTS.mutation.before);
    const onAfterMutation = getTrigger(EVENTS.mutation.after);
    const onMutationSuccess = getTrigger(EVENTS.mutation.success);
    const onMutationError = getTrigger(EVENTS.mutation.error);
    const onBeforeAction = getTrigger(EVENTS.action.before);
    const onAfterAction = getTrigger(EVENTS.action.after);
    const onActionSuccess = getTrigger(EVENTS.action.success);
    const onActionError = getTrigger(EVENTS.action.error);

    const extendedStore = getExtendedStore<TState, TExtensions>(store, extensions);

    stores.set(name, store);
    emitCreated(store, state);

    return {
        destroy,
        onBeforeMutation,
        onAfterMutation,
        onMutationSuccess,
        onMutationError,
        onBeforeAction,
        onAfterAction,
        onActionSuccess,
        onActionError,
        state: store.state,
        getter: store.getter.bind(store),
        mutation: store.mutation.bind(store),
        action: store.action.bind(store),
        snapshot: store.snapshot.bind(store),
        reset: store.reset.bind(store),
        suppress: store.suppress.bind(store),
        on: store.on.bind(store),
        once: store.once.bind(store),
        ...extendedStore,
    } as any;
}