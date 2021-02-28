import {
    ALL_STORES_ID,
    DEVTOOLS_ID,
    OPTIONS,
    SENDER
} from './constants';

import {
    PluginDescriptor,
    setupDevtoolsPlugin
} from '@vue/devtools-api';

import type {
    App,
    CustomInspectorState,
    DevtoolsPluginApi,
    StateBase
} from '@vue/devtools-api';

import type {
    LogType,
    Options,
    StateHookHandler,
    TreeHookHandler,
    EditHookHandler
} from './types';

import type {
    EventHandler,
    HarlemPlugin,
    InternalStore,
    InternalStores
} from '@harlem/core';

function stringComparitor(valueA: string, valueB: string): number {
    return valueA.localeCompare(valueB);
}

function getInspectorTreeHook(application: App, stores: InternalStores): TreeHookHandler {
    return payload => {
        const {
            app,
            inspectorId
        } = payload;

        if (app !== application || inspectorId !== DEVTOOLS_ID || stores.size === 0) {
            return;
        }

        const children = Array.from(stores.keys())
            .sort(stringComparitor)
            .map(name => ({
                id: name,
                label: name
            }));

        payload.rootNodes = [
            {
                children,
                id: ALL_STORES_ID,
                label: 'Stores',
            }
        ];
    }
}

function getStoreSnapshot(store: InternalStore): CustomInspectorState {
    const state: StateBase[] = [
        {
            key: store.name,
            value: store.state,
            editable: true
        }
    ];

    const getters: StateBase[] = Array.from(store.getters)
        .sort(([a], [b]) => stringComparitor(a, b))
        .map(([key, accessor]) => ({
            key,
            value: accessor(),
            editable: false,
            objectType: 'computed'
        }))
        
    const mutations: StateBase[] = Array.from(store.mutations)
        .sort(([a], [b]) => stringComparitor(a, b))
        .map(([key, mutator]) => ({
            key,
            value: mutator,
            editable: false
        }));

    return {
        state,
        getters,
        mutations,
    };
}

function getStoreSnapshots(stores: (InternalStore | undefined)[]): CustomInspectorState {
    return stores.reduce((output, store) => {
        if (!store) {
            return output;
        }

        const snapshot = getStoreSnapshot(store);

        return {
            state: [...output.state, ...snapshot.state],
            getters: [...output.getters, ...snapshot.getters],
            mutations: [...output.mutations, ...snapshot.mutations],
        };
    }, {
        state: [],
        getters: [],
        mutations: []
    } as CustomInspectorState);
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

        let internalStores = [stores.get(nodeId)];

        if (nodeId === ALL_STORES_ID) {
            internalStores = Array.from(stores.values());
        }

        payload.state = getStoreSnapshots(internalStores);
    }
}

function getInspectorEditHook(application: App, stores: InternalStores): EditHookHandler {
    return payload => {
        const {
            app,
            inspectorId,
            nodeId,
            path,
            state,
            set
        } = payload;

        if (app !== application || inspectorId !== DEVTOOLS_ID || stores.size === 0) {
            return;
        }

        const root = path.shift();
        const storeId = nodeId === ALL_STORES_ID
            ? root || nodeId
            : nodeId

        const store = stores.get(storeId);

        if (!store) {
            return;
        }

        store.write('plugin:devtools:set', SENDER, _state => set(_state, path, state.value));  
    }
}

function getMutationHook(api: DevtoolsPluginApi, logType?: LogType): EventHandler {
    return payload => {
        if (!payload) {
            return;
        }

        const {
            sender,
            store
        } = payload;
        
        api.sendInspectorState(DEVTOOLS_ID);
        api.addTimelineEvent({
            layerId: DEVTOOLS_ID,
            event: {
                logType,
                title: 'Mutation',
                subtitle: store,
                time: Date.now(),
                data: payload,
                groupId: sender,
                meta: {
                    store: store
                }
            }
        });
    };
}

export default function createDevtoolsPlugin(options: Partial<Options> = OPTIONS): HarlemPlugin {
    const {
        label,
        color
    } = {
        ...OPTIONS,
        ...options
    };

    return {

        name: 'devtools',
        
        install(app, eventEmitter, stores) {
            const inspectorTreeHook = getInspectorTreeHook(app, stores);
            const inspectorStateHook = getInspectorStateHook(app, stores);
            const inspectorEditHook = getInspectorEditHook(app, stores);
            
            const descriptor = {
                app,
                label,
                id: DEVTOOLS_ID,
                logo: 'https://harlemjs.com/assets/images/favicon.png'
            } as PluginDescriptor;
            
            setupDevtoolsPlugin(descriptor, api => {
                const afterMutationHook = getMutationHook(api);
                const errorMutationHook = getMutationHook(api, 'error');
                
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
                api.on.editInspectorState(inspectorEditHook);

                eventEmitter.on('mutation:after', afterMutationHook);
                eventEmitter.on('mutation:error', errorMutationHook);
            });
        }

    };
}