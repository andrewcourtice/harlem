import eventEmitter from './event-emitter';

import {
    App,
    setupDevtoolsPlugin,
    StateBase
} from '@vue/devtools-api';

interface GetterSnapshot {
    key: string;
    value: any;
}

interface MutationSnapshot {
    key: string;
}

interface DevtoolsSnapshot {
    state: any;
    getters?: GetterSnapshot[];
    mutations?: MutationSnapshot[];
}

interface Options {
    getStores: () => string[];
    getSnapshot: (storeId: string) => DevtoolsSnapshot | void;
}

const DEFAULT_OPTIONS: Options = {
    getStores: () => [],
    getSnapshot: () => {}
};

export default class Devtools {

    private options: Options;

    constructor(options: Options = DEFAULT_OPTIONS) {
        this.options = options;
    }

    public attach(application: App): void {
        const {
            getStores,
            getSnapshot
        } = this.options;
    
        const descriptor = {
            app: application,
            id: 'harlem',
            label: 'Harlsem'
        };
    
        setupDevtoolsPlugin(descriptor, api => {
            api.addInspector({
                id: 'harlem',
                label: 'Harlem',
                icon: 'storage'
            });

            api.addTimelineLayer({
                id: 'harlem',
                label: 'Harlem',
                color: 3
            });

            api.on.getInspectorTree((payload, context) => {
                const {
                    app,
                    inspectorId
                } = payload;

                if (app !== application || inspectorId !== 'harlem') {
                    return;
                }

                const stores = getStores();

                if (stores) {
                    payload.rootNodes = stores.map(name => ({
                        id: name,
                        label: name
                    }));
                }
            });

            api.on.getInspectorState((payload, context) => {
                const {
                    app,
                    inspectorId,
                    nodeId
                } = payload;

                if (app !== application || inspectorId !== 'harlem') {
                    return;
                }

                const snapshot = getSnapshot(nodeId);

                if (!snapshot) {
                    return;
                }

                let getters: StateBase[] = [];
                let mutations: StateBase[] = [];

                if (snapshot.getters) {
                    getters = snapshot.getters.map(({ key, value }) => ({
                        key,
                        value,
                        editable: false,
                        objectType: 'computed'
                    }));
                }

                if (snapshot.mutations) {
                    mutations = snapshot.mutations.map(({ key }) => ({
                        key,
                        value: () => {},
                        editable: false
                    }));
                }

                payload.state = {
                    getters,
                    mutations,
                    state: [
                        {
                            key: 'root',
                            value: snapshot.state,
                            editable: false
                        }
                    ]
                    
                };
            });

            eventEmitter.on('mutation', (store: string, mutation: string, payload: any) => {
                api.sendInspectorState('harlem');
                api.addTimelineEvent({
                    layerId: 'harlem',
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
            });
        });
    }

}