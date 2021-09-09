# Actions

Actions are asynchronous methods that often batch network requests with one or more state mutations. Becuase action implementations vary widely Harlem doesn't include actions by default in the core package but instead through an optional [extension](/extensibility/extensions/action) (`@harlem/extension-action`).

The action implementation in the Harlem action extension includes features like cancellation, nested actions and indirect status checks. See that [action extension](/extensibility/extensions/action) documentation for more information.

## Defining an Action

```typescript
export default action('load-user-data', async (id: number, mutate, controller) => {
    const userData = await fetch(`/api/user-data/${id}`, {
        signal: controller.signal
    });

    mutate(state => Object.assign(state.details.user, userData));
});
```

## See also
[Action Extension Documentation](/extensibility/extensions/action)