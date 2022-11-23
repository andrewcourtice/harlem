# Taking snapshots

Sometimes it can be useful to take a snapshot of state at a specific point in time for use later. Harlem provides a mechanism for you to take a snapshot of state at a point in time and access that copy of state later or reset the store back to that point in time.

Some common use-cases of snapshots are:
- Custom reset functionality
- Rolling back state if mutations fail (transactions)

To use snapshots simply call the `snapshot` function on the store at the point you wish to snapshot the state:

```typescript{6}
export const {
    state,
    getter,
    mutation,
    action,
    snapshot
} = createStore('user', {
    firstName: 'John',
    lastName: 'Smith'
});

const snap = snapshot(); // take a snapshot
snap.apply(); // apply the snapshot when ready
```

Like to the `reset` method, the `apply` method on the snapshot accepts a function argument for specifying a specific part of the snapshot to apply:

```typescript
snap.apply(state => state.firstName);
```

The state of the snapshot can also be accessed via the `state` property on the snapshot:
```typescript
console.log(snap.state.firstName);
```