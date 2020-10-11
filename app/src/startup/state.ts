import STORES from '../constants/stores';

import harlem from '@harlem/core';
import createDevtoolsPlugin from '@harlem/plugin-devtools';
import createStoragePlugin from '@harlem/plugin-storage';
import createTransactionPlugin from '@harlem/plugin-transaction';

import type {
    App
} from 'vue';

export default function initialiseState(app: App): App {
    
    // Only synchronise the settings store with storage
    const plugins = [
        createStoragePlugin(STORES.settings),
        createTransactionPlugin()
    ];

    // Only enable the devtools plugin if we are in dev mode
    // The devtools package will be tree-shaken out of the production bundle
    if (process.env.NODE_ENV === 'development') {
        plugins.push(createDevtoolsPlugin({
            label: 'State'
        }));
    }

    return app.use(harlem, { plugins });
}