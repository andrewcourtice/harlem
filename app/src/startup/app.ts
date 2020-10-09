import AppComponent from '../app.vue';

import {
    App,
    createApp
} from 'vue';

export default function initialiseApplication(): App {
    return createApp(AppComponent);
}