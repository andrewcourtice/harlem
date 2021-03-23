<p align="center">
    <a href="https://harlemjs.com">
        <img src="https://raw.githubusercontent.com/andrewcourtice/harlem/main/app/src/.vuepress/public/assets/images/logo-192.svg" alt="Harlem"/>
    </a>
</p>

# Harlem SSR Plugin

![npm](https://img.shields.io/npm/v/@harlem/plugin-ssr)

This is the official plugin for using Harlem in a Vue SSR application.

<!-- TOC depthfrom:2 -->

- [Getting started](#getting-started)
- [Warning](#warning)

<!-- /TOC -->

## Getting started

Before installing the ssr plugin make sure you have installed `@harlem/core`.

1. Install `@harlem/plugin-ssr`:
```
npm install @harlem/plugin-ssr
```
Or if you're using Yarn:
```
yarn add @harlem/plugin-ssr
```

2. Create an instance of the plugin and register it with Harlem on the **server**:
```typescript
import App from './app.vue';

import harlem from '@harlem/core';

import {
    createServerSSRPlugin
} from '@harlem/plugin-ssr';

createSSRApp(App)
    .use(harlem, {
        plugins: [
            createServerSSRPlugin()
        ]
    });
```

3. Generate the bridging script block and insert it into the server-rendered content:
```typescript
import {
    renderToString
} from '@vue/server-renderer';

import {
    getBridgingScriptBlock
} from '@harlem/plugin-ssr';

let output = await renderToString(app);
output += getBridgingScriptBlock();
```

4. Create an instance of the plugin and register it with Harlem on the **client**:
```typescript
import App from './app.vue';

import harlem from '@harlem/core';

import {
    createClientSSRPlugin
} from '@harlem/plugin-ssr';

createApp(App)
    .use(harlem, {
        plugins: [
            createClientSSRPlugin()
        ]
    });
```

## Warning

Types that are not support by JSON serialisation will not be transferred from server to client. See the MDN documentation on JSON serialisation for more information: [MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)