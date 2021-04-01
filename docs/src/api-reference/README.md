---
sidebarDepth: 2
---

# Global API

## createStore
The `createStore` function is used for creating new instances of stores that have their own getters, mutations etc.

### Arguments
- **name** `string` - The name of the store
- **state** `object` - The initial state of the store

### Return Value
A [Store](store.html) object.

### Example

```javascript
const store = createStore('my-store', {
    firstName: 'John',
    lastName: 'Smith'
});
```


## on
The `on` function is used for subscribing to global events. This is particularly useful when defining triggers based on specific mutations or developing a custom plugin.

### Arguments
- **event** `string` - The name of the event to subscribe to
- **callback** `function` - A callback with a payload as it's only argument
    - arguments
        - **payload** `any?` - An optional payload provided when the event is published
    - returns: `void`
    - example: `payload => console.log(payload)`

### Return Value
An [EventListener](./types.html#eventlistener).

### Example

```javascript
on('some-event', payload => console.log(payload));
```


## once
The `once` function is exactly the same as [on](#on) except it only executes once.