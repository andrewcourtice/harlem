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
    Plugin,
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
    PRODUCERS,
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
        if (!typeIsFunction(plugin)) {
            return;
        }

        const lockedStores = objectLock(stores, [
            'set',
            'delete',
            'clear',
        ]);

        try {
            plugin(app, eventBus, lockedStores);
        } catch (error) {
            console.warn('Failed to install Harlem plugin. Skipping.');
        }
    }

    function createStore<TState extends BaseState, TExtensions extends Extension<TState>[]>(
        name: string,
        state: TState,
        options?: Partial<StoreOptions<TState, TExtensions>>
    ) {
        const {
            allowsOverwrite,
            producers: providers,
            extensions,
        } = {
            allowsOverwrite: true,
            extensions: [] as unknown as TExtensions,
            ...options,
        };

        validateStoreCreation(name);

        const store = createInternalStore(name, state, eventBus, {
            allowsOverwrite,
            producers: providers,
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
                        }
                );

                return store.on(eventName, (event?: EventPayload<TriggerEventData>) => {
                    if (event && filter(event.data.name)) {
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

    function createVuePlugin(options?: HarlemOptions) {
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
                eventBus.emit(EVENTS.core.installed);
            },
        } as Plugin;
    }

    return {
        createVuePlugin,
        createStore,
        on: eventBus.on,
        once: eventBus.once,
        off: eventBus.off,
    } as HarlemInstance;
}

// Export the global instance
export const {
    on,
    off,
    once,
    createVuePlugin,
    createStore,
} = createInstance();

// Attach instance creation to the global object
if (typeof window !== 'undefined') {
    window.$harlem = {
        createInstance,
    };
}