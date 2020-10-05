import App from './app.vue';
import Harlem from '@harlem/core';

import createDevtoolsPlugin from '@harlem/plugin-devtools';

import {
    createApp
} from 'vue';

function start() {
    let plugins = [];

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