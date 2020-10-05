import App from './app.vue';
import Harlem from '@harlem/core';

import createDevtoolsPlugin from '@harlem/plugin-devtools';

import {
    createApp
} from 'vue';

function start() {
    const devtools = createDevtoolsPlugin({
        label: 'State'
    });

    return createApp(App)
        .use(Harlem, {
            plugins: [
                devtools
            ]
        })
        .mount('#app');
}

start();