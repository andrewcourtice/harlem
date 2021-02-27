# Core Concepts

## Getters

### What are Getters?

If you have used Vuex before you will likely be familiar with the concept of a `getter`. A `getter` is a computed store property that is automatically updated when state changes.

Getters are particularly useful for joining different parts of state together or mapping data. In Harlem getters are always **readonly**.

### Defining a Getter

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


## Mutations