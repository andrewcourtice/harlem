import 'flex-layout-attribute';
import './styles/index.css';

import App from './app.vue';

import Harlem from '@harlem/core';

import devtoolsPlugin from '@harlem/plugin-devtools';

import {
    createApp,
} from 'vue';

function start() {
    const plugins = [];

    if (import.meta.env.DEV) {
        plugins.push(devtoolsPlugin());
    }

    return createApp(App)
        .use(Harlem, {
            plugins,
        })
        .mount('body');
}

start();