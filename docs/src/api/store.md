---
sidebarDepth: 1
---

# Store API

The following properties/methods will be available on a store instance as a result of calling `createStore`.

## state
The `state` object is a **readonly** copy of the current state tree for the given store.

- Type: `readonly object`

### Example

```javascript
const {
    state
} = createStore('my-store', {
    firstName: 'John',
    lastName: 'Smith'
});
```


## getter
The `getter` function is used for defining computed values based on state

- Type: `function`
- Arguments:
    - **name** `string` - The name of the getter
    - **getter** `function` - A callback returning the computed state value
        - Arguments:
            - **state** `readonly object` - A readonly copy of state
        - Returns: `any`
- Returns: A Vue [computed](https://v3.vuejs.org/api/computed-watch-api#computed) ref

### Example

```javascript
const fullName = getter('fullname', state => {
    return `${state.firstName} ${state.lastName}`;
});
```


## mutation
The `mutation` function is used for defining a method for mutating a particular part of state and optionally returning a result. The body of the mutation function is the only place in which state is writable.

Mutations are always **synchronous**.

- Type: `function`
- Arguments:
    - **name** `string` - The name of the mutation
    - **mutation** `function` - A callback taking state and an optional payload
        - Arguments:
            - **state** `object` - A writable copy of state
            - **payload** `any?` - An optional payload provided when invoking the mutation
        - Returns: `any`
- Returns: `function` - A mutation function which takes an optional payload and returns the result of the mutator callback defined above.
    - **mutation**
        - Arguments:
            - **payload** `any?` - An optional payload
        - Returns: `any`

### Example

```javascript
const setName = mutation('set-name', (state, payload) => {
    state.firstName = payload.firstName;
    state.lastName = payload.lastName;
});
```


## on
The store `on` function is exactly the same as the [global on function](/api/#on) except that it's events are filtered to ones only published on the current store.


## once
The store `once` function is exactly the same as the [global once function](/api/#once) except it only executes once and it's events are filtered to ones only published on the current store.


## onBeforeMutation
This is a convenience method for subscribing to before mutation events on the current store.

- Type: `function`
- Arguments:
    - **mutationName** `string | string[]` - The name of the mutation(s) to trigger the handler on
    - **handler** `function` - A callback with mutation data as it's only argument
        - Arguments:
            - **data** [MutationEventData](./types#mutationeventdata) - A mutation data object containing the mutation name, payload and result
        - Returns: `void`
- Returns: [EventListener](./types#eventlistener)

### Example

```javascript
// Single mutation
onBeforeMutation('set-name', ({ mutation, payload, result }) => {});

// Multiple mutations
onBeforeMutation(['set-id', 'set-name'], ({ mutation, payload, result }) => {
    if (mutation === 'set-id') {

    }
});

// The same as writing
on('mutation:before', event => event.data);
```

## onAfterMutation
This is a convenience method for subscribing to after mutation events on the current store. This is trigger will be fired regardless of whether the mutation succeeded or failed. `onAfterMutation` has exactly the same signature as [onBeforeMutation](#onbeforemutation).

## onMutationSuccess
This is a convenience method for subscribing to successful mutation events on the current store. This trigger will only fire if the specified mutation(s) has been successful. `onMutationSuccess` has exactly the same signature as [onBeforeMutation](#onbeforemutation).

## onMutationError
This is a convenience method for subscribing to failed mutation events on the current store. This trigger will only fire if the specified mutation(s) has failed. `onMutationError` has exactly the same signature as [onBeforeMutation](#onbeforemutation).