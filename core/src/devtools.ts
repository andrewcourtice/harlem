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

    public attach(app: App): void {
        const {
            getStores,
            getSnapshot
        } = this.options;
    
        const descriptor = {
            app,
            id: 'harlem',
            label: 'Harlem'
        };
    
        setupDevtoolsPlugin(descriptor, api => {
            // api.addInspector({
            //     id: 'harlem',
            //     label: 'Harlem',
            //     icon: 'storage'
            // });

            api.on.getInspectorTree((payload, context) => {
                const stores = getStores();

                console.log(stores);

                if (stores) {
                    payload.rootNodes = stores.map(name => ({
                        id: name,
                        label: name
                    }));
                }
            });

            api.on.getInspectorState((payload, context) => {
                const {
                    nodeId
                } = payload;

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
                        value: '',
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

            // eventEmitter.on('getter', () => api.sendInspectorState('harlem'));
            // eventEmitter.on('mutation', () => api.sendInspectorState('harlem'));
        });
    }

}