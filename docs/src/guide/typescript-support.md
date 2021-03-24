# TypeScript support
Harlem is built on Typescript which means TypeScript support comes by default out of the box. Harlem will infer types where it can but in some circumstances you'll need to explicitly define types. The most common example of where you would need to define a type would be for the mutation payload or result.

```typescript
export const setFirstName = mutation<string>('setFirstName', (state, payload) => {
    state.firstName = payload;
});
```

All other types (state, getters etc) are automatically inferred, however should you wish to define your own state type you can do so during store creation:

```typescript
import {
    createStore
} from '@harlem/core';

interface State {
    firstName?: string;
    lastName?: string;
};

const STATE: State = {
    firstName: 'John',
    lastName: 'Smith'
};

const {
    getter,
    mutation,
    ...store
} = createStore<State>('user', STATE);
```

In most cases this will be unnecessary but it can be useful for defining nullable fields or fields that don't exist at the time of store creation.
