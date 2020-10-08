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
    HarlemPlugin,
    InternalStore,
    InternalStores
} from '@harlem/core';

const DEVTOOLS_ID = 'harlem';

const DEFAULT_OPTIONS: Options = {
    label: 'Harlem',
    color: 0x40c48d
};

function getInspectorTreeHook(application: App, stores: InternalStores): TreeHookHandler {
    return payload => {
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

function getInspectorStateHook(application: App, stores: InternalStores): StateHookHandler {
    return payload => {
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

export default function createDevtoolsPlugin(options: Options = DEFAULT_OPTIONS): HarlemPlugin {
    const {
        label,
        color
    } = {
        ...DEFAULT_OPTIONS,
        ...options
    };

    return {

        name: 'devtools',
        
        install(app, eventEmitter, stores) {
            const inspectorTreeHook = getInspectorTreeHook(app, stores);
            const inspectorStateHook = getInspectorStateHook(app, stores);
            
            const descriptor = {
                app,
                label,
                id: DEVTOOLS_ID,
            };
            
            setupDevtoolsPlugin(descriptor, api => {
                const mutationHook = getMutationHook(api);

                api.addInspector({
                    label,
                    id: DEVTOOLS_ID,
                    icon: 'storage',
                    treeFilterPlaceholder: 'Search stores'
                });
    
                api.addTimelineLayer({
                    label,
                    color,
                    id: DEVTOOLS_ID
                });
    
                api.on.getInspectorTree(inspectorTreeHook);
                api.on.getInspectorState(inspectorStateHook);
                
                eventEmitter.on('mutation', mutationHook);
            });
        }

    };
}