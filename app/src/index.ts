import 'flex-layout-attribute';
import './styles/index.css';

import App from './app.vue';

import Harlem from '@harlem/core';

import createDevtoolsPlugin from '@harlem/plugin-devtools';
import createResetPlugin from '@harlem/plugin-reset';

import {
    createApp,
} from 'vue';

function start() {
    return createApp(App)
        .use(Harlem, {
            plugins: [
                createDevtoolsPlugin(),
                createResetPlugin(),
            ],
        })
        .mount('#app');
}

start();