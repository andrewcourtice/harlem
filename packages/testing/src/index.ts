import {
    attach,
    HarlemPlugin,
} from '@harlem/core';

import type {
    App,
} from 'vue';

const app = {
    use: (plugin: any, options?: any) => {
        if (plugin && plugin.install){
            plugin.install(app, options);
        }
    },
} as App;

export {
    getStore,
    jsonClone,
} from './store';

export function bootstrap(plugins?: HarlemPlugin[]) {
    return attach(app, {
        plugins,
    });
}

export function sleep(timeout: number = 0) {
    return new Promise(resolve => setTimeout(resolve, timeout));
}