# Actions

Actions are asynchronous methods that often (but not always) fetch network requests with one or more state mutations. Because action implementations can vary widely Harlem only includes a very basic actions implementation by default in the core package. A more advanced action implementation is available through the [action extension](/extensions/official/action) (@harlem/extension-action).

Similar to a mutation, an action is a simple asynchronous function that takes a payload in, mutates state, and (optionally) returns a result. 

```typescript
export default action('load-details', async (id: string, mutate) => {
    const response = await fetch(`/api/details/${id}`);
    const details = await response.json();

    mutate(state => {
        state.details = details;
    });

    return details;
});
```

The advanced action implementation in the Harlem action extension includes features like cancellation, deduplication, nested actions and indirect status checks. See the [action extension](/extensions/official/action) documentation for more information.