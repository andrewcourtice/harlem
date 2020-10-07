import {
    CustomInspectorState,
    setupDevtoolsPlugin
} from '@vue/devtools-api';

import type {
    App,
    StateBase,
    DevtoolsPluginApi
} from '@vue/devtools-api';

import type {
    Options,
    StateHookHandler,
    TreeHookHandler
} from './types';

import type {
    Emittable,
    InternalStore,
    InternalStores
} from '@harlem/core';

const DEVTOOLS_ID = 'harlem';

const DEFAULT_OPTIONS: Options = {
    label: 'Harlem'
};

function getInspectorTreeHook(application: App, stores: InternalStores, options: Options): TreeHookHandler {
    return (payload, context) => {
        const {
            app,
            inspectorId
        } = payload;

        if (app !== application || inspectorId !== DEVTOOLS_ID || stores.size === 0) {
            return;
        }

        payload.rootNodes = Array.from(stores.keys()).map(name => ({
            id: name,
            label: name
        }));
    }
}

function getStoreSnapshot(store: InternalStore): CustomInspectorState {
    const state = store.state();

    const getters: StateBase[] = Array.from(store.getters)
        .map(([key, accessor]) => ({
            key,
            value: accessor(),
            editable: false,
            objectType: 'computed'
        }));

    const mutations: StateBase[] = Array.from(store.mutations)
        .map(key => ({
            key,
            value: () => {},
            editable: false
        }));

    return {
        state: [
            {
                key: 'root',
                value: state,
                editable: false
            }
        ],
        getters,
        mutations,
    };
}

function getInspectorStateHook(application: App, stores: InternalStores, options: Options): StateHookHandler {
    return (payload, context) => {
        const {
            app,
            inspectorId,
            nodeId
        } = payload;

        if (app !== application || inspectorId !== DEVTOOLS_ID || stores.size === 0) {
            return;
        }

        const store = stores.get(nodeId);

        if (store) {
            payload.state = getStoreSnapshot(store);
        }
    }
}

function getMutationHook(api: DevtoolsPluginApi): Function {
    return (store: string, mutation: string, payload: any) => {
        api.sendInspectorState(DEVTOOLS_ID);
        api.addTimelineEvent({
            layerId: DEVTOOLS_ID,
            event: {
                time: Date.now(),
                data: {
                    store,
                    mutation,
                    payload
                },
                meta: {
                    store
                }
            }
        });
    };
}

export default function createDevtoolsPlugin(options: Options = DEFAULT_OPTIONS) {
    const {
        label
    } = options;

    return {
        
        install(application: App, eventEmitter: Emittable, stores: InternalStores) {
            const inspectorTreeHook = getInspectorTreeHook(application, stores, options);
            const inspectorStateHook = getInspectorStateHook(application, stores, options);
            
            const descriptor = {
                label,
                id: DEVTOOLS_ID,
                app: application
            };
            
            setupDevtoolsPlugin(descriptor, api => {
                const mutationHook = getMutationHook(api);

                api.addInspector({
                    label,
                    id: DEVTOOLS_ID,
                    icon: 'storage'
                });
    
                api.addTimelineLayer({
                    label,
                    id: DEVTOOLS_ID,
                    color: 3
                });
    
                api.on.getInspectorTree(inspectorTreeHook);
                api.on.getInspectorState(inspectorStateHook);
    
                eventEmitter.on('mutation', mutationHook);
            });
        }

    };
}