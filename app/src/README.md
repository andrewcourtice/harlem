---
home: true
heroImage: /assets/images/logo-192.svg
heroText: Harlem
tagline: Simple, unopinionated, lightweight and extensible state management for Vue 3
actions:
- text: Get Started →
  link: /guide/getting-started.html
- text: View Demo
  link: https://codesandbox.io/s/harlem-demo-lmffj
  type: Secondary
features:
- title: Simple
  details: Harlem has a simple functional API for creating, reading and mutating state. At it's heart, Harlem just uses Vue reactive objects and computeds which means if you know how to use Vue, you'll know how to use Harlem.
- title: Unopinionated
  details: Harlem doesn't impose any standards or conventions on your codebase. Because of it's simple functional API you can structure your code anyway you want and Harlem will just work.
- title: Immutable
  details: All state provided from a Harlem store is immutable by default. The only write access to state is through mutations. This ensures all updates to your store are tracable, thereby reducing the amount of bugs produced by code unpredictably mutating state.
- title: Lightweight
  details: Harlem weighs in at around 1KB (minified & gzipped) which makes it the perfect solution for codebases of all sizes. Harlem is also designed to be tree-shakable - unused stores, getters, or mutations will be removed from your code at build time (provided you are using a build tool that supports tree-shaking). It's also worth noting that Harlem has **zero** dependencies (apart from Vue obviously).
- title: Extensible
  details: Harlem uses a plugin architecture so you can extend it any way you want. Some of the official plugins include Vue devtools integration, local/session storage sync, and transactions for rolling back multiple mutations when write errors occur.
- title: Great DX
  details: Harlem has a great developer experience. It's built using TypeScript so all of your state, getters, and mutations are strongly typed. Harlem also has devtools integration so you can explore your stores and see mutation events on the timeline in realtime.
footer: MIT Licensed | Copyright © 2020-present Andrew Courtice
---