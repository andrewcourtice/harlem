import components from '../components/core';

import type {
    App
} from 'vue';

export default function initialiseComponents(app: App) {
    Object.keys(components).forEach(key => app.component(key, components[key]));
}