import 'flex-layout-attribute';
import './assets/styles/index.scss';

import App from './app.vue';

import {
    createVuePlugin,
} from 'harlem';

import {
    createApp,
} from 'vue';

function start() {
    return createApp(App)
        .use(createVuePlugin())
        .mount('body');
}

start();