# About

Harlem is a powerfully simple global state management solution for Vue 3. It is designed to suit projects of all sizes and developers of all different levels of experience.


## Why use Harlem?

For small projects with limited shared state between components a global state management solution like Harlem or [Pinia](https://pinia.vuejs.org) may be considered overkill. In these simple cases a simple global `reactive` object would suffice.

However, as your application grows in size and complexity, a requirement to share state globally between components becomes more and more necessary. Also as your app grows the likelihood of bugs resulting from global mutable state grows as well.

That is why it is important to consider a safe, immutable global state management solution early in your project's development. This is where Harlem comes in. Harlem provides a single source of truth for your global state that exposes state immutably and forces changes to that state through an auditable gateway such as an action or mutation. This combined with many other reasons makes your state safer, scalable, and easier to debug.

## Features

- TypeScript support
- Vue devtools integration
- Lightweight & dependency-free
- Tree-shakeable
- Extensible (via plugins & extensions)
- SSR Support