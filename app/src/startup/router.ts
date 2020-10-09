import routes from '../routes';

import {
    createRouter,
    createWebHistory
} from 'vue-router';

import type {
    App
} from 'vue';

export default function initialiseRouter(app: App): App {
    const history = createWebHistory();
    const router = createRouter({
        history,
        routes
    });

    return app.use(router);
}