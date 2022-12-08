# Server-Side Rendering

The SSR plugin adds support for using Harlem in a Vue server-side rendered application.

## Installation

Before installing the ssr plugin make sure you have installed `harlem`.

```bash
yarn add @harlem/plugin-ssr
# or
npm install @harlem/plugin-ssr
```

## Usage

### Server

Create an instance of the plugin and register it with Harlem on the **server**:
```typescript
import App from './app.vue';

import {
    createVuePlugin
} from 'harlem';

import {
    createServerSSRPlugin
} from '@harlem/plugin-ssr';

createSSRApp(App)
    .use(createVuePlugin({
        plugins: [
            createServerSSRPlugin()
        ]
    }));
```

Generate the bridging script block and insert it into the server-rendered content:
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

### Client

Create an instance of the plugin and register it with Harlem on the **client**:
```typescript
import App from './app.vue';

import {
    createVuePlugin
} from 'harlem';

import {
    createClientSSRPlugin
} from '@harlem/plugin-ssr';

createApp(App)
    .use(createVuePlugin({
        plugins: [
            createClientSSRPlugin()
        ]
    }));
```

::: warning
Types that are not support by JSON serialisation will not be transferred from server to client. See the MDN documentation on JSON serialisation for more information: [MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)
:::