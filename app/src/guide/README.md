# Introduction
Harlem is a simple, unopinionated, lightweight and extensible state management solution for Vue 3.

# Features

## Simple
Harlem has a simple functional API for creating, reading and mutating state. At it's heart, Harlem just uses Vue reactive objects and computeds which means if you know how to use Vue, you'll know how to use Harlem.

## Unopinionated
Harlem doesn't impose any standards or conventions on your codebase. Because of it's simple functional API you can structure your code anyway you want and Harlem will just work.

## Immutable
All state provided from a Harlem store is immutable by default. The only write access to state is through mutations. This ensures all updates to your store are tracable, thereby reducing the amount of bugs produced by code unpredictably mutating state.

## Lightweight
Harlem weighs in at around 1KB (minified & gzipped) which makes it the perfect solution for codebases of all sizes. Harlem is also designed to be tree-shakable - unused stores, getters, or mutations will be removed from your code at build time (provided you are using a build tool that supports tree-shaking). 

It's also worth noting that Harlem has **zero** dependencies (apart from Vue obviously).

## Extensible
Harlem uses a plugin architecture so you can extend it any way you want. Some of the official plugins include Vue devtools integration, local/session storage sync, and transactions for rolling back multiple mutations when write errors occur.

## Great DX
Harlem has a great developer experience. It's built using TypeScript so all of your state, getters, and mutations are strongly typed. Harlem also has devtools integration so you can explore your stores and see mutation events on the timeline in realtime.