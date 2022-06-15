# Lazy Extension

![npm](https://img.shields.io/npm/v/@harlem/extension-lazy)

This is the official lazy extension for Harlem. The lazy extension adds the ability to define asynchronous getters that are automatically re-evaluated when the referenced state (or other reactive objects) change.

## Getting Started

Follow the steps below to get started using the lazy extension.

### Installation

Before installing this extension make sure you have installed `@harlem/core`.

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash
yarn add @harlem/extension-lazy
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
npm install @harlem/extension-lazy
```

  </CodeGroupItem>
</CodeGroup>

### Registration

To get started simply register this extension with the store you wish to extend.

```typescript{16,19}
import lazyExtension from '@harlem/extension-lazy';

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
    lazy
} = createStore('example', STATE, {
    extensions: [
        lazyExtension()
    ]
});
```

The lazy extension adds a single `lazy` method to the store instance.


## Usage

### Defining a lazy getter
Defining a lazy getter is very similar to defining a normal getter with a few differences - the getter body is async, includes an `onInvalidate` method parameter and the return type is an array with 2 values. The `lazy` method also accepts a 3rd argument which is the getter's default value while it is evaluating.

```typescript
export default lazy('mapped-data', async (state, onInvalidate) => {
    return doSomethingAsync(state.details);
});
```

#### onInvalidate
The `onInvalidate` method supplied to the getter body is used to handle when the getter's evaluation is cancelled. The `onInvalidate` is forwarded directly from Vue's `watchEffect`.


### Using a lazy getter
The lazy getter returns an array with 2 values. The first value is a `computed` with the return value of the getter's async body. The second value is a `computed` boolean indicating whether the getter is re-evaluating.

```typescript
const [
    value,
    isEvaluating
] = lazy('mapped-data', async (state, onInvalidate) => {
    return doSomethingAsync(state.details);
});
```

### Specifying a default value
Due to the async nature of the getter the return value of the body may be undefined until it is finished evaluating for the first time. To get around this you can specify what the default value should be.

```typescript
export default lazy('mapped-data', async (state, onInvalidate) => {
    return doSomethingAsync(state.details);
}, 'some default value');
```


## Considerations
Please keep the following points in mind when using this extension:

- In order for this extension to function correctly you must access any reactive values you want to trigger the getter's re-evaluation **before** the first `await` statement. This is because the lazy getter uses `watchEffect` internally which does not wait for async methods to finish in order to track dependencies. For more information read [this article](https://antfu.me/posts/async-with-composition-api) by Anthony Fu.