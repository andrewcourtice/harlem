# Extensibility

Harlem uses a combination of [extensions](/extensibility/extensions/introduction.html) and [plugins](/extensibility/plugins/introduction.html) to extend core functionality. Although extensions and plugins may appear similar, they serve different purposes. Here is a brief summary on the difference between extensions and plugins:

- **Extensions**: extensions are registered **per-store**. They have deep integration with how the store is created, managed and typed.
- **Plugins**: plugins are registered once **globally**. They are useful for high-level management of all stores which is why the devtools plugin is a good use-case for a plugin.

## Official Extensions

- [Action](/extensibility/extensions/action.html) (`@harlem/extension-action`) - Extends a store to support cancellable async actions.
- [Compose](/extensibility/extensions/compose.html) (`@harlem/extension-compose`) - Extends a store to to add simple read/write convenience methods.
- [History (Preview)](/extensibility/extensions/history.html) (`@harlem/extension-history`) - Extends a store to support undo and redo capabilities.
- [Lazy](/extensibility/extensions/lazy.html) (`@harlem/extension-lazy`) - Extends a store to support lazy async getters.
- [Reset](/extensibility/extensions/reset.html) (`@harlem/extension-reset`) - Extends a store to support resetting a store back to it's original state.
- [Snapshot](/extensibility/extensions/snapshot.html) (`@harlem/extension-snapshot`) - Extends a store to support taking snapshots of state and applying it at a later stage.
- [Storage](/extensibility/extensions/storage.html) (`@harlem/extension-storage`) - Extends a store to support synchronising state to/from `localStorage` or `sessionStorage`.
- [Trace](/extensibility/extensions/trace.html) (`@harlem/extension-trace`) - Extends a store to support tracing granular changes to state during mutations. Useful for auditing during development.
- [Transaction](/extensibility/extensions/transaction.html) (`@harlem/extension-transaction`) - Extends a store to support rolling back multiple mutations if one fails.

## Official Plugins

- [Devtools](/extensibility/plugins/devtools.html) (`@harlem/plugin-devtools`) - The devtools plugin adds Vue devtools integration with your stores to show updates to your state in realtime.
- [SSR](/extensibility/plugins/server-side-rendering.html) (`@harlem/plugin-ssr`) - The SSR plugin enables support for using Harlem stores in a server-side rendered application.