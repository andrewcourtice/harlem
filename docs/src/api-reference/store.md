---
sidebarDepth: 2
---

# Store

## state
The `state` object is a **readonly** copy of the current state tree for the given store.

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

### Arguments
- **name** `string` - The name of the getter
- **getter** `function` - A callback returning the computed state value
    - arguments
        - **state** `readonly object` - A readonly copy of state
    - returns: `any`
    - example: ``state => `${state.firstName} ${state.lastName}` ``

### Return Value
A Vue [computed](https://v3.vuejs.org/api/computed-watch-api.html#computed) ref

### Example

```javascript
const fullName = getter('fullname', state => {
    return `${state.firstName} ${state.lastName}`;
});
```


## mutation
The `mutation` function is used for defining a method for mutating a particular part of state and optionally returning a result. The body of the mutation function is the only place in which state is writable.

Mutations are always **synchronous**.

### Arguments
- **name** `string` - The name of the mutation
- **mutation** `function` - A callback taking state and an optional payload
    - arguments
        - **state** `object` - A writable copy of state
        - **payload** `any?` - An optional payload provided when invoking the mutation
    - returns: `any`
    - example: `(state, payload) => state.firstName = payload`

### Return Value
A **mutation** `function` which takes an optional payload and returns the result of the mutator callback defined above.

- **mutation**
    - arguments
        - **payload** `any?` - An optional payload
    - returns: `any`

### Example

```javascript
const setName = mutation('set-name', (state, payload) => {
    state.firstName = payload.firstName;
    state.lastName = payload.lastName;
});
```


## on
The store `on` function is exactly the same as the [global on function](/api-reference/#on) except that it's events are filtered to ones only published on the current store.


## once
The store `once` function is exactly the same as the [global once function](/api-reference/#once) except it only executes once and it's events are filtered to ones only published on the current store.


## onBeforeMutation
This is convenience method for subscribing to before mutation events on the current store. This is the same as writing:

```javascript
on('mutation:before', event => event.data);
```

### Arguments
- **mutationName** `string | string[]` - The name of the mutation(s) to trigger the handler on
- **handler** `function` - A callback with mutation data as it's only argument
    - arguments
        - **data** [MutationEventData](./types.html#mutationeventdata) - A mutation data object containing the mutation name, payload and result
    - returns: `void`
    - example: `data => console.log(data)`

### Return Value
An [EventListener](./types.html#eventlistener).

### Example

```javascript
// Single mutation
onBeforeMutation('set-name', ({ mutation, payload, result }) => {});

// Multiple mutations
onBeforeMutation(['set-id', 'set-name'], ({ mutation, payload, result }) => {
    if (mutation === 'set-id') {

    }
});
```

## onAfterMutation
This is convenience method for subscribing to after mutation events on the current store. `onAfterMutation` has exactly the same signature as [onBeforeMutation](#onbeforemutation).


## onMutationError
This is convenience method for subscribing to failed mutation events on the current store. `onMutationError` has exactly the same signature as [onBeforeMutation](#onbeforemutation).