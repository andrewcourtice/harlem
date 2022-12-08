# Trace Extension

The trace extension adds the ability to trace granular changes to state. It is useful for detailed auditing of state changes or as a building block of undo/redo functionality.

## Getting Started

Follow the steps below to get started using the trace extension.

### Installation

Before installing this extension make sure you have installed `harlem`.

```bash
yarn add @harlem/extension-trace
# or
npm install @harlem/extension-trace
```

### Registration

To get started simply register this extension with the store you wish to extend.

```typescript{16-18,21-24}
import traceExtension from '@harlem/extension-trace';

import {
    createStore
} from 'harlem';

const STATE = {
    firstName: 'Jane',
    lastName: 'Smith'
};

const {
    state,
    getter,
    mutation,
    startTrace,
    stopTrace,
    onTraceResult,
} = createStore('example', STATE, {
    extensions: [
        traceExtension({
            autoStart: true,
            debug: true,
        })
    ]
});
```

The trace extension adds several new methods to the store instance (highlighted above).


## Usage

### Options
The storage extension method accepts an options object with the following properties:
- **autoStart**: `boolean` - Indicates whether to start tracing automatically after the store is created. Default value is `false`.
- **debug**: `boolean` - Enables debug mode. This logs all trace results to the console. Default value is `false`.


### Manually starting/stopping tracing
Tracing can be manually started or stopped at any time using the `startTrace` and `stopTrace` methods. The `startTrace` method accepts an optional `gates` parameter which is an array of strings representing the proxy gates to catch during tracing. The default gate is `set`.

See [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy#handler_functions) for a full list of proxy gates available.

::: tip
The only gates currently available for tracing are `get`, `set` and `deleteProperty`.
:::


### Handling trace results
The `onTraceResult` method lets you handle the result when one of the specified gates is accessed during a trace. The method takes a single function parameter with a `result` as it's only argument.

```typescript
const listener = onTraceResult(result => console.log(result));

// To cleanup:
listener.dispose();
```

The `result` object has the following properties:
- **path**: `string` - The path at which the trace gate was triggered. Eg. `/user/details/roles[0]/id`.
- **gate**: `string` - The gate this result was triggered for.
- **nodes**: `(string | number)[]` - The nodes traversed when this gate was triggered. Given the above path, this value would be `['user', 'details', 'roles', 0]`.
- **prop**: `string | number` - The prop that triggered the gate. Eg. `id`.
- **oldValue**: `unknown` - The value before the change.
- **newValue**: `unknown` - The value after the change.