# Plugins and Extensions

Harlem uses a combination of [plugins](/plugins/) and [extensions](/extensions/) to extend it's corew functionality. It's important to take a moment to distinguish the difference between a plugin and an extension:

A **plugin** is *registered once globally* with an instance of Harlem. Plugins handle the management of all stores in a Harlem instance. This is why the devtools integration and SSR support is written as a plugin.

An **extension** is *registered per store*. Extensions extend the functionality of individual stores and the APIs exposed from said store. Extensions are the primary method by which functionality is added to Harlem.

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


## Registering an extension

Extensions are registered at the time of creating a store:

```typescript{19-25,28-34}
import composeExtension from '@harlem/extension-compose';
import lazyExtension from '@harlem/extension-lazy';
import storageExtension from '@harlem/extension-storage';

import {
    createStore
} from '@harlem/core';

const STATE = {
    firstName: 'Jane',
    lastName: 'Smith'
};

const {
    state,
    getter,
    mutation,
    action,
    lazy,
    useState,
    computeState,
    startStorageSync,
    stopStorageSync,
    clearStorage,
    restoreStorage,
} = createStore('example', STATE, {
    extensions: [
        composeExtension(),
        lazyExtension(),
        storageExtension({
            type: 'local',
            prefix: 'harlem',
            sync: true,
        })
    ]
});
```
As you can see in the example above, after the extensions are registered a series of additional APIs are available for use.