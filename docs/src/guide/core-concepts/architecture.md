# Architecture

Harlem, much like Vuex, follows a Redux-like state management pattern. Harlem's functionality can be divided into 3 main concepts:
- State - The single source of truth for your data (read-only)
- Getters - Computed side-effects of mutations to state (read-only)
- Mutations - The means by which state is changed (read/write)

Where Harlem differs from Vuex is that as opposed to having one monolithic state tree, Harlem uses the concept of stores to create logical boundaries between disparate data.