import App from './app.vue';
import Harlem from '@harlem/core';

import {
    createApp
} from 'vue';

function start() {
    return createApp(App)
        .use(Harlem)
        .mount('#app');
}

start();