import 'flex-layout-attribute';
import './assets/styles/index.scss';

import App from './app.vue';

import {
    attach,
} from '@harlem/core';

import devtoolsPlugin from '@harlem/plugin-devtools';

import {
    createApp,
} from 'vue';

function start() {
    const app = createApp(App);

    attach(app, {
        plugins: [
            devtoolsPlugin(),
        ],
    });

    app.mount('body');
}

start();