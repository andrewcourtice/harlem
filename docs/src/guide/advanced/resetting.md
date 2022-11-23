# Resetting a store

Sometimes it is necessary to reset a store back to it's intial state. Thankfully Harlem provides a method for doing exactly that.

At the time the store is created, a [snapshot](/guide/advanced/snapshots) of the initial state is taken and stored. The store exposes a `reset` method which, when called, overwrites the store's current state with the intial state snapshot.

```typescript{10,16}
const {
    state,
    getter,
    mutation,
    action,
    reset,
} = createStore('user', {
    firstName: 'John',
    lastName: 'Smith'
});

reset(); // Reset the state
```

If instead of resetting the whole state tree you only wish to reset a specific part of state you can provide a function argument to the `reset` method that returns the part of state you wish to reset.

```typescript
const {
    state,
    getter,
    mutation,
    action,
    reset,
} = createStore('user', {
    firstName: 'John',
    lastName: 'Smith'
});

reset(state => state.firstName); // Reset only the firstName property
```