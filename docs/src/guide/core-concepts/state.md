# State

The state tree is the single source of truth for any given store. Once a store has been created, the state tree is strictly **readonly**. The initial state for a store is defined upon store creation.

## Defining State

```typescript
const STATE = {
    firstName: 'John',
    lastName: 'Smith'
};

const {
    state
} = createStore('user', STATE);

state.firstName = 'Jane'; // This will throw an error
```

## Usage in Components

```html
<template>
    <div class="app">
        <h1>Hello {{ state.firstName }}</h1>
    </div>
</template>

<script lang="ts" setup>
import {
    state
} from './stores/user';
</script>
```

## See Also

[State](/api/store#state) API Reference