import App from './app.vue';
import Harlem from '@harlem/core';

import createDevtoolsPlugin from '@harlem/plugin-devtools';
import createStoragePlugin from '@harlem/plugin-storage';

import {
    createApp
} from 'vue';

function start() {
    const plugins = [
        createStoragePlugin('*')
    ];

    if (process.env.NODE_ENV === 'development') {
        plugins.push(createDevtoolsPlugin({
            label: 'State'
        }));
    }

    return createApp(App)
        .use(Harlem, {
            plugins
        })
        .mount('#app');
}

start();