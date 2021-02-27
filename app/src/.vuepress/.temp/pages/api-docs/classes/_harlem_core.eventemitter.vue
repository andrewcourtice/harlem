<template><p><strong><RouterLink to="/api-docs/">Harlem</RouterLink></strong></p>
<blockquote>
<p><RouterLink to="/api-docs/">Globals</RouterLink> / <RouterLink to="/api-docs/modules/_harlem_core.html">@harlem/core</RouterLink> / EventEmitter</p>
</blockquote>
<h1 id="class-eventemitter"><a class="header-anchor" href="#class-eventemitter">#</a> Class: EventEmitter</h1>
<h2 id="hierarchy"><a class="header-anchor" href="#hierarchy">#</a> Hierarchy</h2>
<ul>
<li><strong>EventEmitter</strong></li>
</ul>
<h2 id="implements"><a class="header-anchor" href="#implements">#</a> Implements</h2>
<ul>
<li><RouterLink to="/api-docs/interfaces/_harlem_core.emittable.html">Emittable</RouterLink></li>
</ul>
<h2 id="index"><a class="header-anchor" href="#index">#</a> Index</h2>
<h3 id="constructors"><a class="header-anchor" href="#constructors">#</a> Constructors</h3>
<ul>
<li><RouterLink to="/api-docs/classes/_harlem_core.eventemitter.html#constructor">constructor</RouterLink></li>
</ul>
<h3 id="methods"><a class="header-anchor" href="#methods">#</a> Methods</h3>
<ul>
<li><RouterLink to="/api-docs/classes/_harlem_core.eventemitter.html#emit">emit</RouterLink></li>
<li><RouterLink to="/api-docs/classes/_harlem_core.eventemitter.html#off">off</RouterLink></li>
<li><RouterLink to="/api-docs/classes/_harlem_core.eventemitter.html#on">on</RouterLink></li>
<li><RouterLink to="/api-docs/classes/_harlem_core.eventemitter.html#once">once</RouterLink></li>
</ul>
<h2 id="constructors-1"><a class="header-anchor" href="#constructors-1">#</a> Constructors</h2>
<h3 id="constructor"><a class="header-anchor" href="#constructor">#</a> constructor</h3>
<p>+ <strong>new EventEmitter</strong>(): <RouterLink to="/api-docs/classes/_harlem_core.eventemitter.html">EventEmitter</RouterLink></p>
<p><em>Defined in <a href="https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/event-emitter.ts#L10" target="_blank" rel="noopener noreferrer">core/src/event-emitter.ts:10<OutboundLink/></a></em></p>
<p><strong>Returns:</strong> <RouterLink to="/api-docs/classes/_harlem_core.eventemitter.html">EventEmitter</RouterLink></p>
<h2 id="methods-1"><a class="header-anchor" href="#methods-1">#</a> Methods</h2>
<h3 id="emit"><a class="header-anchor" href="#emit">#</a> emit</h3>
<p>▸ <strong>emit</strong>(<code>event</code>: string, <code>payload?</code>: <RouterLink to="/api-docs/interfaces/_harlem_core.eventpayload.html">EventPayload</RouterLink>): void</p>
<p><em>Implementation of <RouterLink to="/api-docs/interfaces/_harlem_core.emittable.html">Emittable</RouterLink></em></p>
<p><em>Defined in <a href="https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/event-emitter.ts#L51" target="_blank" rel="noopener noreferrer">core/src/event-emitter.ts:51<OutboundLink/></a></em></p>
<h4 id="parameters"><a class="header-anchor" href="#parameters">#</a> Parameters:</h4>
<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>event</code></td>
<td>string</td>
</tr>
<tr>
<td><code>payload?</code></td>
<td><RouterLink to="/api-docs/interfaces/_harlem_core.eventpayload.html">EventPayload</RouterLink></td>
</tr>
</tbody>
</table>
<p><strong>Returns:</strong> void</p>
<hr>
<h3 id="off"><a class="header-anchor" href="#off">#</a> off</h3>
<p>▸ <strong>off</strong>(<code>event</code>: string, <code>handler</code>: <RouterLink to="/api-docs/modules/_harlem_core.html#eventhandler">EventHandler</RouterLink>): void</p>
<p><em>Implementation of <RouterLink to="/api-docs/interfaces/_harlem_core.emittable.html">Emittable</RouterLink></em></p>
<p><em>Defined in <a href="https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/event-emitter.ts#L28" target="_blank" rel="noopener noreferrer">core/src/event-emitter.ts:28<OutboundLink/></a></em></p>
<h4 id="parameters-1"><a class="header-anchor" href="#parameters-1">#</a> Parameters:</h4>
<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>event</code></td>
<td>string</td>
</tr>
<tr>
<td><code>handler</code></td>
<td><RouterLink to="/api-docs/modules/_harlem_core.html#eventhandler">EventHandler</RouterLink></td>
</tr>
</tbody>
</table>
<p><strong>Returns:</strong> void</p>
<hr>
<h3 id="on"><a class="header-anchor" href="#on">#</a> on</h3>
<p>▸ <strong>on</strong>(<code>event</code>: string, <code>handler</code>: <RouterLink to="/api-docs/modules/_harlem_core.html#eventhandler">EventHandler</RouterLink>): <RouterLink to="/api-docs/interfaces/_harlem_core.eventlistener.html">EventListener</RouterLink></p>
<p><em>Implementation of <RouterLink to="/api-docs/interfaces/_harlem_core.emittable.html">Emittable</RouterLink></em></p>
<p><em>Defined in <a href="https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/event-emitter.ts#L16" target="_blank" rel="noopener noreferrer">core/src/event-emitter.ts:16<OutboundLink/></a></em></p>
<h4 id="parameters-2"><a class="header-anchor" href="#parameters-2">#</a> Parameters:</h4>
<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>event</code></td>
<td>string</td>
</tr>
<tr>
<td><code>handler</code></td>
<td><RouterLink to="/api-docs/modules/_harlem_core.html#eventhandler">EventHandler</RouterLink></td>
</tr>
</tbody>
</table>
<p><strong>Returns:</strong> <RouterLink to="/api-docs/interfaces/_harlem_core.eventlistener.html">EventListener</RouterLink></p>
<hr>
<h3 id="once"><a class="header-anchor" href="#once">#</a> once</h3>
<p>▸ <strong>once</strong>(<code>event</code>: string, <code>handler</code>: <RouterLink to="/api-docs/modules/_harlem_core.html#eventhandler">EventHandler</RouterLink>): <RouterLink to="/api-docs/interfaces/_harlem_core.eventlistener.html">EventListener</RouterLink></p>
<p><em>Implementation of <RouterLink to="/api-docs/interfaces/_harlem_core.emittable.html">Emittable</RouterLink></em></p>
<p><em>Defined in <a href="https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/event-emitter.ts#L42" target="_blank" rel="noopener noreferrer">core/src/event-emitter.ts:42<OutboundLink/></a></em></p>
<h4 id="parameters-3"><a class="header-anchor" href="#parameters-3">#</a> Parameters:</h4>
<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>event</code></td>
<td>string</td>
</tr>
<tr>
<td><code>handler</code></td>
<td><RouterLink to="/api-docs/modules/_harlem_core.html#eventhandler">EventHandler</RouterLink></td>
</tr>
</tbody>
</table>
<p><strong>Returns:</strong> <RouterLink to="/api-docs/interfaces/_harlem_core.eventlistener.html">EventListener</RouterLink></p>
</template>