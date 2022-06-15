# Extensibility

Harlem uses a combination of [extensions](/extensibility/extensions/) and [plugins](/extensibility/plugins/) to extend core functionality. Although extensions and plugins may appear similar, they serve different purposes. Here is a brief summary on the difference between extensions and plugins:

- **Extensions**: extensions are registered **per-store**. They have deep integration with how the store is created, managed and typed.
- **Plugins**: plugins are registered once **globally**. They are useful for high-level management of all stores which is why the devtools plugin is a good use-case for a plugin.

## Official Extensions

- [Action](/extensibility/extensions/action) (`@harlem/extension-action`) - Extends a store to support cancellable async actions.
- [Compose](/extensibility/extensions/compose) (`@harlem/extension-compose`) - Extends a store to to add simple read/write convenience methods.
- [History (Preview)](/extensibility/extensions/history) (`@harlem/extension-history`) - Extends a store to support undo and redo capabilities.
- [Lazy](/extensibility/extensions/lazy) (`@harlem/extension-lazy`) - Extends a store to support lazy async getters.
- [Reset](/extensibility/extensions/reset) (`@harlem/extension-reset`) - Extends a store to support resetting a store back to it's original state.
- [Snapshot](/extensibility/extensions/snapshot) (`@harlem/extension-snapshot`) - Extends a store to support taking snapshots of state and applying it at a later stage.
- [Storage](/extensibility/extensions/storage) (`@harlem/extension-storage`) - Extends a store to support synchronising state to/from `localStorage` or `sessionStorage`.
- [Trace](/extensibility/extensions/trace) (`@harlem/extension-trace`) - Extends a store to support tracing granular changes to state during mutations. Useful for auditing during development.
- [Transaction](/extensibility/extensions/transaction) (`@harlem/extension-transaction`) - Extends a store to support rolling back multiple mutations if one fails.

## Official Plugins

- [Devtools](/extensibility/plugins/devtools) (`@harlem/plugin-devtools`) - The devtools plugin adds Vue devtools integration with your stores to show updates to your state in realtime.
- [SSR](/extensibility/plugins/server-side-rendering) (`@harlem/plugin-ssr`) - The SSR plugin enables support for using Harlem stores in a server-side rendered application.