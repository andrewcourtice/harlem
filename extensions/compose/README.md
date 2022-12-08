# Harlem Compose Extension

The compose extension adds the ability to create simple read/write operations without having to explicitly define a mutation. This extension also helps to reduce boilerplate code in components when definining writable computeds that simply change a single state value.

## Getting Started

Follow the steps below to get started using the compose extension.

### Installation

Before installing this extension make sure you have installed `harlem`.

```bash
yarn add @harlem/extension-compose
# or
npm install @harlem/extension-compose
```

### Registration

To get started simply register this extension with the store you wish to extend.

```typescript
import composeExtension from '@harlem/extension-compose';

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
    useState,
    computeState
} = createStore('example', STATE, {
    extensions: [
        composeExtension()
    ]
});
```

The compose extension adds several new methods to the store instance (highlighted above).


## Usage

### Basic

The most basic way to use the compose extension is to use the `computeState` method. The `computeState` method creates a writable computed by which you can read/write state directly. Take the following store as an example:

```typescript
// store.ts
const {
    state,
    computeState
} = createStore('example', {
    details: {
        name: ''
    }
}, {
    extensions: [
        composeExtension()
    ]
});
```

If all you need to do is update the name field it can be cumbersome to write a mutation and a computed (in your component) just to update a simple field. Without the compose extension your code might look something like this: 

```typescript
// store.ts
const setName = mutation('set-name', (state, name) => state.details.name = name);
```

And in your component:

```vue
<template>
    <input type="text" v-model="name" />
</template>

<script lang="ts" setup>
import {
    state,
    setName
} from './store';

const name = computed({
    get: () => state.details.name,
    set: name => setName(name)
});
</script>
```

While it isn't a lot of code, it can still be cumbersome to write for lots of places where all you are doing is directly reading/writing state. The equivalent code using the compose extension would be:

```typescript
// store.ts
// No mutation necessary :)
```

And in your component:

```vue
<template>
    <input type="text" v-model="name" />
</template>

<script lang="ts" setup>
import {
    computeState
} from './store';

const name = computeState(state => state.details.name);
</script>
```

This drastically simplifies basic read/write operations. For auditability purposes you can even still specify the mutation name so you can see it in the devtools - just specify the mutation name as the second argument to the `computeState` method:

```typescript
const name = computeState(state => state.details.name, 'set-name');
```

If no mutation name is specified, one will be automatically generated from the path. In this case it would be: `compose:root/details/name`.


### Advanced

The more advanced usage of the compose extension is using the `useState` method. The `useState` method is designed to mimic React's `useState` method (or SolidJS's `createSignal`). The `useState` method returns a tuple with a get method and a set method. Given the same store structure as above:

```typescript
const [
    getName,
    setName
] = useState(state => state.details.name);

getName();
setName('Phil');
```

This is useful for having more granular control over the read/write cycle as opposed to a computed automatically updating when any dependencies change (in this case, `name` on state).

As with `computeState`, `useState` also accepts a mutation name as a second argument:

```typescript
const [
    getName,
    setName
] = useState(state => state.details.name, 'set-name');
```


## Considerations

Please keep the following points in mind when using this extension:

### Avoid transforms in the accessor function

```typescript
// This will work
computeState(state => state.details.name);

// This will not
computeState(state => state.details.name.split(' '));
```


### Data structures still have readonly properties

```typescript
const details = computeState(state => state.details);

// This will work
details.value = {
    name: 'Phil'
};

// This will not
details.value.name = 'Phil'
// Properties of the details object are still readonly
// This is the same for arrays, maps, sets etc.
```

### Avoid explicitly defining indexes in the accessor function

```typescript
// Although this is technically possible, it is strongly discouraged
const firstRoleId = computeState(state => state.details.roles[0].id);

// This will always update the id of the first item in the array
firstRoleId.value = 5;
```


### Avoid traversing multiple branches of state in the accessor function

```typescript
// This will generate an incorrect read/write path
const name = computeState(state => {
    const something = state.something.id;
    return state.details.name;
});

// Internally, Harlem uses a proxy object to determine which path in state you are traversing to
// Traversing multiple state paths in the accessor function will assume you are trying to access:
// something/id/details/name
// As opposed to just:
// details/name
```