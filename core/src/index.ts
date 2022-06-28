import InternalStore from './store';

import eventEmitter from './event-emitter';

import {
    EVENTS,
    SENDER,
} from './constants';

import {
    lock,
} from '@harlem/utilities';

import type {
    App,
    Plugin,
} from 'vue';

import type {
    ActionEventData,
    BaseState,
    EventPayload,
    Extension,
    HarlemPlugin,
    InternalStores,
    MutationEventData,
    PluginOptions,
    PublicStore,
    StoreOptions,
    Trigger,
    TriggerEventData,
    TriggerHandler,
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
    if (!plugin || typeof plugin.install !== 'function') {
        return;
    }

    const {
        name,
        install,
    } = plugin;

    const lockedStores = lock(stores, [
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

export function createStore<TState extends BaseState, TExtensions extends Extension<TState>[] = []>(
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
        extensions: [store => ({})] as TExtensions,
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

    const getTrigger = <TEventData extends TriggerEventData>(eventName: string, prop: keyof TEventData): Trigger<TEventData> => {
        return (name: string | string[], handler: TriggerHandler<TEventData>) => {
            const mutations = ([] as string[]).concat(name);

            return store.on(eventName, (event?: EventPayload<TEventData>) => {
                if (event && mutations.includes(event.data[prop] as unknown as string)) {
                    handler(event.data);
                }
            });
        };
    };

    const getMutationTrigger = (name: string) => getTrigger<MutationEventData>(name, 'mutation');
    const getActionTrigger = (name: string) => getTrigger<ActionEventData>(name, 'action');

    const onBeforeMutation = getMutationTrigger(EVENTS.mutation.before);
    const onAfterMutation = getMutationTrigger(EVENTS.mutation.after);
    const onMutationSuccess = getMutationTrigger(EVENTS.mutation.success);
    const onMutationError = getMutationTrigger(EVENTS.mutation.error);
    const onBeforeAction = getActionTrigger(EVENTS.action.before);
    const onAfterAction = getActionTrigger(EVENTS.action.after);
    const onActionSuccess = getActionTrigger(EVENTS.action.success);
    const onActionError = getActionTrigger(EVENTS.action.error);

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

export default {

    install(app, options?: PluginOptions) {
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

} as Plugin;