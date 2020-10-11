<p align="center">
    <a href="https://harlemjs.com">
        <img src="https://raw.githubusercontent.com/andrewcourtice/harlem/main/app/src/assets/images/logo-192.svg" alt="Harlem"/>
    </a>
</p>

# Harlem Devtools Plugin

![npm](https://img.shields.io/npm/v/@harlem/plugin-devtools)

This is the official Harlem devtools plugin for adding Vue devtools integration to Harlem.

**Note:** The Vue 3 compatible devtools are currently in beta and subject to change. Please ensure you have the beta version of the Vue devtools installed in your browser and disable the stable Vue devtools to prevent conflict.

<!-- TOC -->

- [Getting started](#getting-started)
- [Options](#options)
- [Known issues](#known-issues)

<!-- /TOC -->

![Harlem Devtools](https://user-images.githubusercontent.com/11718453/95668309-aa5ade00-0bb5-11eb-99f5-1fea4d2061ff.gif)

## Getting started

Before installing the devtools plugin make sure you installed `@harlem/core`.

1. Install `@harlem/plugin-devtools`:
```
npm install @harlem/plugin-devtools
```
Or if you're using Yarn:
```
yarn add @harlem/plugin-devtools
```

2. Create an instance of the plugin and register it with Harlem:
```typescript
import App from './app.vue';

import harlem from '@harlem/core';
import createDevtoolsPlugin from '@harlem/plugin-devtools';

const devtoolsPlugin = createDevtoolsPlugin({
    label: 'My State'
});

createApp(App)
    .use(harlem, {
        plugins: [devtoolsPlugin]
    })
    .mount('#app');
```

3. Open your Vue devtools to see your stores.


## Options

- **label** (string?): The name that will appear in the Vue devtools pane. The default is 'Harlem'.
- **color** (number?): A Hexadecimal number indicating the color to be used on the timeline for Harlem events. The default is `0x40c48d`.

*(?) indicates an optional field*


## Known issues
There is currently an issue where the devtools may not show your stores the first time they are opened. Simply hit the refresh button in the top right of the devtools to force it to show your stores/state.
