# Devtools

![npm](https://img.shields.io/npm/v/@harlem/plugin-devtools)

This is the official Harlem devtools plugin for adding Vue devtools integration to Harlem.

**Note:** The Vue 3 compatible devtools are currently in beta and subject to change. Please ensure you have the beta version of the Vue devtools installed in your browser and disable the stable Vue devtools to prevent conflict.

![Harlem Devtools](https://user-images.githubusercontent.com/11718453/95668309-aa5ade00-0bb5-11eb-99f5-1fea4d2061ff.gif)

## Installation

Before installing the devtools plugin make sure you installed `@harlem/core`.

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash:no-line-numbers
yarn add @harlem/plugin-devtools
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash:no-line-numbers
npm install @harlem/plugin-devtools
```

  </CodeGroupItem>
</CodeGroup>

## Usage

Create an instance of the plugin and register it with Harlem:
```typescript
import App from './app.vue';

import harlem from '@harlem/core';
import devtoolsPlugin from '@harlem/plugin-devtools';

createApp(App)
    .use(harlem, {
        plugins: [
            devtoolsPlugin({
                label: 'My State'
            })
        ]
    })
    .mount('#app');
```

3. Open your Vue devtools to see your stores.


### Options

- **label**: `string?` - the name that will appear in the Vue devtools pane. The default is 'Harlem'.
- **color**: `number?` - a Hexadecimal number indicating the color to be used on the timeline for Harlem events. The default is `0x40c48d`.

*(?) indicates an optional field*