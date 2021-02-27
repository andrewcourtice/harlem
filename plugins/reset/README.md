<p align="center">
    <a href="https://harlemjs.com">
        <img src="https://raw.githubusercontent.com/andrewcourtice/harlem/main/app/src/.vuepress/public/assets/images/logo-192.svg" alt="Harlem"/>
    </a>
</p>

# Harlem Reset Plugin

![npm](https://img.shields.io/npm/v/@harlem/plugin-reset)

This is the official Harlem plugin for resetting stores to their initial state.

<!-- TOC depthfrom:2 -->

- [Getting started](#getting-started)

<!-- /TOC -->

## Getting started

Before installing the reset plugin make sure you have installed `@harlem/core`.

1. Install `@harlem/plugin-reset`:
```
npm install @harlem/plugin-reset
```
Or if you're using Yarn:
```
yarn add @harlem/plugin-reset
```

2. Create an instance of the plugin and register it with Harlem:
```typescript
import App from './app.vue';

import harlem from '@harlem/core';
import createResetPlugin from '@harlem/plugin-reset';

createApp(App)
    .use(harlem, {
        plugins: [
            createResetPlugin()
        ]
    })
    .mount('#app');
```

3. Call the reset method with the name of the store you wish to reset:
```typescript
import {
    reset
} from '@harlem/plugin-reset';

export default function() {
    reset('my-store');
}
```
