# Harlem

## Foundations

### Simple
Harlem has a simple functional API for creating, reading and mutating state. At it's heart, Harlem just uses Vue reactive objects and computeds which means if you know how to use Vue, you'll know how to use Harlem.

### Unopinionated
Harlem doesn't impose any standards or conventions on your codebase. Because of it's simple functional API you can structure your code anyway you want and Harlem will just work.

### Immutable
All state provided from a Harlem store is immutable by default. The only write access to state is through mutations. This ensures all updates to your store are tracable, thereby reducing the amount of bugs produced by code unpredictably mutating state.

### Lightweight
Harlem core weighs in at around 1.5KB (minified & gzipped) which makes it the perfect solution for codebases of all sizes. It is also designed to be tree-shakable - unused stores, getters, or mutations will be removed from your code at build time (provided you are using a build tool that supports tree-shaking). 

It's also worth noting that Harlem has **zero** dependencies.

### Extensible
Harlem is architectured with extensibility in mind so you can extend it any way you want through [plugins](#plugins) and [extensions](#extensions). Some of the official plugins and extensions include Vue devtools integration, local/session storage sync, snapshots, history (undo/redo) and more.

### Great DX
Harlem has a great developer experience. It's built using TypeScript so all of your state, getters, and mutations are strongly typed. Harlem also has devtools integration so you can explore your stores and see mutation events on the timeline in realtime.