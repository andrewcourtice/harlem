# Server-Side Rendering

![npm](https://img.shields.io/npm/v/@harlem/plugin-ssr)

This is the official plugin for using Harlem in a Vue SSR application.

## Installation

Before installing the ssr plugin make sure you have installed `@harlem/core`.

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash
yarn add @harlem/plugin-ssr
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
npm install @harlem/plugin-ssr
```

  </CodeGroupItem>
</CodeGroup>

## Usage

### Server

Create an instance of the plugin and register it with Harlem on the **server**:
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