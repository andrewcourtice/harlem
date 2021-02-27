<template><h2 id="features"><a class="header-anchor" href="#features">#</a> Features</h2>
<h3 id="simple"><a class="header-anchor" href="#simple">#</a> Simple</h3>
<p>Harlem has a simple functional API for creating, reading and mutating state. At it's heart, Harlem just uses Vue reactive objects and computeds which means if you know how to use Vue, you'll know how to use Harlem.</p>
<h3 id="unopinionated"><a class="header-anchor" href="#unopinionated">#</a> Unopinionated</h3>
<p>Harlem doesn't impose any standards or conventions on your codebase. Because of it's simple functional API you can structure your code anyway you want and Harlem will just work.</p>
<h3 id="immutable"><a class="header-anchor" href="#immutable">#</a> Immutable</h3>
<p>All state provided from a Harlem store is immutable by default. The only write access to state is through mutations. This ensures all updates to your store are tracable, thereby reducing the amount of bugs produced by code unpredictably mutating state.</p>
<h3 id="lightweight"><a class="header-anchor" href="#lightweight">#</a> Lightweight</h3>
<p>Harlem weighs in at around 1KB (minified &amp; gzipped) which makes it the perfect solution for codebases of all sizes. Harlem is also designed to be tree-shakable - unused stores, getters, or mutations will be removed from your code at build time (provided you are using a build tool that supports tree-shaking).</p>
<p>It's also worth noting that Harlem has <strong>zero</strong> dependencies (apart from Vue obviously).</p>
<h3 id="extensible"><a class="header-anchor" href="#extensible">#</a> Extensible</h3>
<p>Harlem uses a plugin architecture so you can extend it any way you want. Some of the official plugins include Vue devtools integration, local/session storage sync, and transactions for rolling back multiple mutations when write errors occur.</p>
<h3 id="great-dx"><a class="header-anchor" href="#great-dx">#</a> Great DX</h3>
<p>Harlem has a great developer experience. It's built using TypeScript so all of your state, getters, and mutations are strongly typed. Harlem also has devtools integration so you can explore your stores and see mutation events on the timeline in realtime.</p>
</template>