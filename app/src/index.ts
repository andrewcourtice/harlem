import 'flex-layout-attribute';
import './assets/styles/index.scss';

import App from './app.vue';

import Harlem from '@harlem/core';

import devtoolsPlugin from '@harlem/plugin-devtools';

import {
    createApp,
} from 'vue';

function start() {
    return createApp(App)
        .use(Harlem, {
            plugins: [
                devtoolsPlugin(),
            ],
        })
        .mount('body');
}

start();