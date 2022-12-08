# Plugins
At it's heart, Harlem uses a plugin system to extend functionality and create powerful additions to your stores.

If you require functionality to suit a specific use-case you can write your own plugin. Refer to the [Plugin authoring](/plugins/advanced/authoring) documentation on how to write your own plugin.

If you feel that there is a piece of common functionality that should be included as an official Harlem plugin please open an issue providing a description of the plugin, the intended API and, if possible, a working example in a codesandbox.


## Registering a plugin

Plugins are registered at the time of attaching Harlem to the Vue instance:
```typescript
import App from './app.vue';
import devtoolsPlugin from '@harlem/plugin-devtools';

import {
    createVuePlugin
} from '@harlem/core';

createApp(App)
    .use(createVuePlugin({
        plugins: [
            devtoolsPlugin()
        ]
    }))
    .mount('#app');
```
Some plugins may also have options which can be provided when calling the plugin method.