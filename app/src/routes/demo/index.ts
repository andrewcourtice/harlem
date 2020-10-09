import Basic from './basic.vue';

import type {
    RouteRecordRaw
} from 'vue-router';

export default [
    {
        name: 'basic-demo',
        path: '/demo/basic',
        component: Basic
    }
] as RouteRecordRaw[]