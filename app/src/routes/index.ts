import Index from './index.vue';
import Docs from './docs.vue';

import demo from './demo';

import type {
    RouteRecordRaw
} from 'vue-router';

export default [
    {
        name: 'home',
        path: '/',
        component: Index
    },
    {
        name: 'docs',
        path: '/docs',
        component: Docs
    },

    ...demo
    
] as RouteRecordRaw[];