import {
    ALL_STORES_ID,
    DEVTOOLS_ID,
    OPTIONS,
    SENDER,
} from './constants';

import {
    EVENTS,
} from '@harlem/core';

import {
    PluginDescriptor,
    setupDevtoolsPlugin,
} from '@vue/devtools-api';

import type {
    App,
    CustomInspectorState,
    DevtoolsPluginApi,
    StateBase,
} from '@vue/devtools-api';

import type {
    LogType,
    Options,
    StateHookHandler,
    TreeHookHandler,
    EditHookHandler,
} from './types';

import type {
    EventHandler,
    HarlemPlugin,
    InternalStore,
    InternalStores,
} from '@harlem/core';

function stringComparitor(valueA: string, valueB: string): number {
    return valueA.localeCompare(valueB);
}

function getInspectorTreeHook(application: App, stores: InternalStores): TreeHookHandler {
    return payload => {
        const {
            app,
            inspectorId,
        } = payload;

        if (app !== application || inspectorId !== DEVTOOLS_ID || stores.size === 0) {
            return;
        }

        const children = Array.from(stores.keys())
            .sort(stringComparitor)
            .map(name => ({
                id: name,
                label: name,
            }));

        payload.rootNodes = [
            {
                children,
                id: ALL_STORES_ID,
                label: 'Stores',
            },
        ];
    };
}

function getStoreSnapshot(store: InternalStore): CustomInspectorState {
    return Object.entries(store.registrations).reduce((output, [type, registrations]) => {
        output[type] = Array.from(registrations)
            .sort(([a], [b]) => stringComparitor(a, b))
            .map(([key, { type, producer }]) => ({
                key,
                value: producer(),
                editable: false,
                objectType: type,
            } as StateBase));

        return output;
    }, {
        state: [
            {
                key: store.name,
                value: store.state,
                editable: true,
                objectType: 'reactive',
            },
        ],
    } as Record<string, StateBase[]>);
}

function getStoreSnapshots(stores: (InternalStore | undefined)[]): CustomInspectorState {
    return stores.reduce((output, store) => {
        if (!store) {
            return output;
        }

        const snapshot = getStoreSnapshot(store);

        return Object
            .entries(snapshot)
            .reduce((merges, [key, value]) => {
                merges[key] = (merges[key] || []).concat(value);
                return merges;
            }, {} as CustomInspectorState);
    }, {} as CustomInspectorState);
}

function getInspectorStateHook(application: App, stores: InternalStores): StateHookHandler {
    return payload => {
        const {
            app,
            inspectorId,
            nodeId,
        } = payload;

        if (app !== application || inspectorId !== DEVTOOLS_ID || stores.size === 0) {
            return;
        }

        let internalStores = [stores.get(nodeId) || stores.values().next().value as InternalStore];

        if (nodeId === ALL_STORES_ID) {
            internalStores = Array.from(stores.values());
        }

        if (internalStores.length > 0) {
            payload.state = getStoreSnapshots(internalStores);
        }
    };
}

function getInspectorEditHook(application: App, stores: InternalStores): EditHookHandler {
    return payload => {
        const {
            app,
            inspectorId,
            nodeId,
            path,
            state,
            set,
        } = payload;

        if (app !== application || inspectorId !== DEVTOOLS_ID || stores.size === 0) {
            return;
        }

        const root = path.shift();
        const storeId = nodeId === ALL_STORES_ID
            ? root || nodeId
            : nodeId;

        const store = stores.get(storeId);

        if (!store) {
            return;
        }

        store.write('plugin:devtools:set', SENDER, _state => set(_state, path, state.value));
    };
}

function getMutationHook(api: DevtoolsPluginApi, logType?: LogType): EventHandler {
    return payload => {
        if (!payload) {
            return;
        }

        const {
            store,
        } = payload;

        api.sendInspectorState(DEVTOOLS_ID);
        api.addTimelineEvent({
            layerId: DEVTOOLS_ID,
            event: {
                logType,
                title: 'Mutation',
                subtitle: store,
                groupId: store,
                time: Date.now(),
                data: payload,
                meta: {
                    store: store,
                },
            },
        });
    };
}

export default function createDevtoolsPlugin(options: Partial<Options> = OPTIONS): HarlemPlugin {
    const {
        label,
        color,
    } = {
        ...OPTIONS,
        ...options,
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
                logo: 'https://harlemjs.com/assets/images/favicon.png',
                homepage: 'https://harlemjs.com',
                packageName: '@harlem/plugin-devtools',
            } as PluginDescriptor;

            setupDevtoolsPlugin(descriptor, api => {
                const successMutationHook = getMutationHook(api);
                const errorMutationHook = getMutationHook(api, 'error');

                api.addInspector({
                    label,
                    id: DEVTOOLS_ID,
                    icon: 'source',
                    treeFilterPlaceholder: 'Search stores',
                });

                api.addTimelineLayer({
                    label,
                    color,
                    id: DEVTOOLS_ID,
                    skipScreenshots: true,
                });

                api.on.getInspectorTree(inspectorTreeHook);
                api.on.getInspectorState(inspectorStateHook);
                api.on.editInspectorState(inspectorEditHook);

                eventEmitter.on(EVENTS.mutation.success, successMutationHook);
                eventEmitter.on(EVENTS.mutation.error, errorMutationHook);
                eventEmitter.on(EVENTS.devtools.update, () => api.sendInspectorState(DEVTOOLS_ID));
            });
        },

    };
}