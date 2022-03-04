import App from './app.vue';
import Harlem from '@harlem/core';

import harlemDevtoolsPlugin from '@harlem/plugin-devtools';

import {
    createApp,
} from 'vue';

function main() {
    return createApp(App)
        .use(Harlem, {
            plugins: [
                harlemDevtoolsPlugin(),
            ],
        })
        .mount('#app');
}

main();