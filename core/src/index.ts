import createEventBus from './event-emitter';
import createInternalStore from './store';

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
} from 'vue';

import type {
    BaseState,
    EventPayload,
    Extension,
    HarlemInstance,
    HarlemOptions,
    HarlemPlugin,
    InternalStore,
    InternalStores,
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

/**
 * Create a new instance of Harlem. This is useful in multi-app scenarios.
 */
export function createInstance() {
    const eventBus = createEventBus();
    const stores: InternalStores = new Map();

    let installed = false;

    function validateStoreCreation(name: string) {
        const store = stores.get(name);

        if (store && !store.allowsOverwrite) {
            throw new Error(`A store named ${name} has already been registered.`);
        }
    }

    function emitCreated(store: InternalStore, state: any) {
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

        eventBus.once(EVENTS.core.installed, created);
    }

    function getExtensionApis<TState extends BaseState, TExtensions extends Extension<TState>[]>(
        store: InternalStore<TState>,
        extensions: TExtensions
    ) {
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

    function installPlugin(plugin: HarlemPlugin, app: App) {
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
            install(app, eventBus, lockedStores);
        } catch (error) {
            console.warn(`Failed to install Harlem plugin: ${name}. Skipping.`);
        }
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
    function createStore<TState extends BaseState, TExtensions extends Extension<TState>[]>(
        name: string,
        state: TState,
        options?: Partial<StoreOptions<TState, TExtensions>>
    ) {
        const {
            allowsOverwrite,
            providers,
            extensions,
        } = {
            allowsOverwrite: true,
            extensions: [] as unknown as TExtensions,
            ...options,
        };

        validateStoreCreation(name);

        const store = createInternalStore(name, state, eventBus, {
            allowsOverwrite,
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

        const extensionApis = getExtensionApis<TState, TExtensions>(store, extensions);

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
            ...extensionApis,
        } as unknown as PublicStore<TState, TExtensions>;
    }

    function attach(app: App, options?: HarlemOptions) {
        return app.use({
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
                eventBus.emit(EVENTS.core.installed);
            },
        });
    }

    return {
        attach,
        createStore,
        on: eventBus.on,
        once: eventBus.once,
        off: eventBus.off,
    } as HarlemInstance;
}

export function createExtension<TOptions, TResult extends Record<string, any>>(name: string, body: (store: InternalStore, options?: TOptions) => TResult) {
    return (options?: TOptions) => {
        return <TState extends BaseState>(store: InternalStore<TState>) => {
            store.register('extensions', name, () => options);
            return body(store, options);
        };
    };
}

// Export the global instance
export const {
    on,
    off,
    once,
    attach,
    createStore,
} = createInstance();

// Attach instance creation to the global object
window.$harlem = {
    createInstance,
};