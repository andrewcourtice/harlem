---
layout: home

hero:
    name: Harlem
    text: Global State Management
    tagline: Simple, unopinionated, lightweight and extensible state management for Vue 3
    actions:
    - theme: brand
      text: Get Started →
      link: /guide/introduction/getting-started.html
    - theme: alt
      text: View Demo
      link: https://andrewcourtice.github.io/harlem

features:
- title: Simple 
  details: Harlem has a simple functional API for creating, reading and mutating state. At it's heart, Harlem just uses Vue reactive objects and computeds which means if you know how to use Vue, you'll know how to use Harlem.
- title: Unopinionated
  details: Harlem doesn't impose any standards or conventions on your codebase. Because of it's simple functional API you can structure your code anyway you want and Harlem will just work.
- title: Immutable
  details: All state provided from a Harlem store is immutable by default. The only write access to state is through mutations. This ensures all updates to your store are tracable, thereby reducing the amount of bugs produced by code unpredictably mutating state.
- title: Lightweight
  details: Harlem weighs in at around 1.5KB (minified) which makes it the perfect solution for codebases of all sizes. Harlem is also designed to be tree-shakable - unused stores, getters, or mutations will be removed from your code at build time (provided you are using a build tool that supports tree-shaking). It's also worth noting that Harlem has zero dependencies (apart from Vue obviously).
- title: Extensible
  details: Harlem is architectured with extensibility in mind so you can extend it any way you want through extensions and plugins. Some of the official plugins and extensions include Vue devtools integration, local/session storage sync, snapshots, history (undo/redo) and more.
- title: Great DX
  details: Harlem has a great developer experience. It's built using TypeScript so all of your state, getters, and mutations are strongly typed. Harlem also has devtools integration so you can explore your stores and see mutation events on the timeline in realtime.
---