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
    EventHandler,
    HarlemPlugin,
    InternalStore,
    InternalStores,
    MutationEventData
} from '@harlem/core';

const NAME = 'devtools';
const DEVTOOLS_ID = 'harlem';
const ALL_STORES_ID = '$all';

const OPTIONS: Options = {
    label: 'Harlem',
    color: 0x40c48d
};

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
    const state = [
        {
            key: store.name,
            value: store.state,
            editable: false
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
        .map(key => ({
            key,
            value: () => {},
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

function getMutationHook(api: DevtoolsPluginApi): EventHandler<MutationEventData> {
    return ({ store, data }) => {
        const {
            mutation,
            payload
        } = data;

        api.sendInspectorState(DEVTOOLS_ID);
        api.addTimelineEvent({
            layerId: DEVTOOLS_ID,
            event: {
                time: Date.now(),
                data: {
                    store,
                    mutation,
                    payload,
                },
                meta: {
                    store
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

        name: NAME,
        
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