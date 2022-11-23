# Getters

If you have used Vue's [computed properties](https://vuejs.org/api/reactivity-core.html#computed) before you will likely be familiar with the workings of a `getter`. A `getter` is a computed store property that is automatically updated when state changes.

Getters are particularly useful for joining different parts of state together or mapping data. In Harlem getters are always **readonly**.

## Defining a Getter

To define a getter simply import the getter function returned from the `createStore` method. The getter function takes 2 arguments - a name, and a callback with a single `state` parameter.

```typescript
const STATE = {
    firstName: 'John',
    lastName: 'Smith'
};

const {
    getter
} = createStore('user', STATE);

export const fullName = getter('fullname', state => {
    return `${state.firstName} ${state.lastName}`;
});
```

The getter function returns a Vue computed property that can now be used in your components or even other getters.


## Usage in components

```html
<template>
    <div class="app">
        <h1>Hello {{ fullName }}</h1>
    </div>
</template>

<script lang="ts" setup>
// We can import getters we need right away
import {
    fullName
} from './stores/user';
</script>
```

## See also

[Getter](/api/store#getter) API Reference
