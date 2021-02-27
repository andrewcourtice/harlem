<template><p><strong><RouterLink to="/api-docs/">Harlem</RouterLink></strong></p>
<blockquote>
<p><RouterLink to="/api-docs/">Globals</RouterLink> / <RouterLink to="/api-docs/modules/_harlem_core.html">@harlem/core</RouterLink> / Store</p>
</blockquote>
<h1 id="class-store-tstate"><a class="header-anchor" href="#class-store-tstate">#</a> Class: Store&lt;TState&gt;</h1>
<h2 id="type-parameters"><a class="header-anchor" href="#type-parameters">#</a> Type parameters</h2>
<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>TState</code></td>
<td>object</td>
<td>any</td>
</tr>
</tbody>
</table>
<h2 id="hierarchy"><a class="header-anchor" href="#hierarchy">#</a> Hierarchy</h2>
<ul>
<li><strong>Store</strong></li>
</ul>
<h2 id="implements"><a class="header-anchor" href="#implements">#</a> Implements</h2>
<ul>
<li><RouterLink to="/api-docs/interfaces/_harlem_core.internalstore.html">InternalStore</RouterLink>&lt;TState&gt;</li>
</ul>
<h2 id="index"><a class="header-anchor" href="#index">#</a> Index</h2>
<h3 id="constructors"><a class="header-anchor" href="#constructors">#</a> Constructors</h3>
<ul>
<li><RouterLink to="/api-docs/classes/_harlem_core.store.html#constructor">constructor</RouterLink></li>
</ul>
<h3 id="properties"><a class="header-anchor" href="#properties">#</a> Properties</h3>
<ul>
<li><RouterLink to="/api-docs/classes/_harlem_core.store.html#getters">getters</RouterLink></li>
<li><RouterLink to="/api-docs/classes/_harlem_core.store.html#mutations">mutations</RouterLink></li>
<li><RouterLink to="/api-docs/classes/_harlem_core.store.html#name">name</RouterLink></li>
</ul>
<h3 id="accessors"><a class="header-anchor" href="#accessors">#</a> Accessors</h3>
<ul>
<li><RouterLink to="/api-docs/classes/_harlem_core.store.html#state">state</RouterLink></li>
</ul>
<h3 id="methods"><a class="header-anchor" href="#methods">#</a> Methods</h3>
<ul>
<li><RouterLink to="/api-docs/classes/_harlem_core.store.html#emit">emit</RouterLink></li>
<li><RouterLink to="/api-docs/classes/_harlem_core.store.html#exec">exec</RouterLink></li>
<li><RouterLink to="/api-docs/classes/_harlem_core.store.html#getter">getter</RouterLink></li>
<li><RouterLink to="/api-docs/classes/_harlem_core.store.html#mutation">mutation</RouterLink></li>
<li><RouterLink to="/api-docs/classes/_harlem_core.store.html#on">on</RouterLink></li>
<li><RouterLink to="/api-docs/classes/_harlem_core.store.html#once">once</RouterLink></li>
<li><RouterLink to="/api-docs/classes/_harlem_core.store.html#write">write</RouterLink></li>
</ul>
<h2 id="constructors-1"><a class="header-anchor" href="#constructors-1">#</a> Constructors</h2>
<h3 id="constructor"><a class="header-anchor" href="#constructor">#</a> constructor</h3>
<p>+ <strong>new Store</strong>(<code>name</code>: string, <code>state</code>: TState): <RouterLink to="/api-docs/classes/_harlem_core.store.html">Store</RouterLink></p>
<p><em>Defined in <a href="https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/store.ts#L47" target="_blank" rel="noopener noreferrer">core/src/store.ts:47<OutboundLink/></a></em></p>
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
<td><code>name</code></td>
<td>string</td>
</tr>
<tr>
<td><code>state</code></td>
<td>TState</td>
</tr>
</tbody>
</table>
<p><strong>Returns:</strong> <RouterLink to="/api-docs/classes/_harlem_core.store.html">Store</RouterLink></p>
<h2 id="properties-1"><a class="header-anchor" href="#properties-1">#</a> Properties</h2>
<h3 id="getters"><a class="header-anchor" href="#getters">#</a> getters</h3>
<p>•  <strong>getters</strong>: Map&lt;string, Function&gt;</p>
<p><em>Implementation of <RouterLink to="/api-docs/interfaces/_harlem_core.internalstore.html">InternalStore</RouterLink>.<RouterLink to="/api-docs/interfaces/_harlem_core.internalstore.html#getters">getters</RouterLink></em></p>
<p><em>Defined in <a href="https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/store.ts#L46" target="_blank" rel="noopener noreferrer">core/src/store.ts:46<OutboundLink/></a></em></p>
<hr>
<h3 id="mutations"><a class="header-anchor" href="#mutations">#</a> mutations</h3>
<p>•  <strong>mutations</strong>: Map&lt;string, <RouterLink to="/api-docs/modules/_harlem_core.html#mutation">Mutation</RouterLink>&lt;any&gt;&gt;</p>
<p><em>Implementation of <RouterLink to="/api-docs/interfaces/_harlem_core.internalstore.html">InternalStore</RouterLink>.<RouterLink to="/api-docs/interfaces/_harlem_core.internalstore.html#mutations">mutations</RouterLink></em></p>
<p><em>Defined in <a href="https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/store.ts#L47" target="_blank" rel="noopener noreferrer">core/src/store.ts:47<OutboundLink/></a></em></p>
<hr>
<h3 id="name"><a class="header-anchor" href="#name">#</a> name</h3>
<p>•  <strong>name</strong>: string</p>
<p><em>Implementation of <RouterLink to="/api-docs/interfaces/_harlem_core.internalstore.html">InternalStore</RouterLink>.<RouterLink to="/api-docs/interfaces/_harlem_core.internalstore.html#name">name</RouterLink></em></p>
<p><em>Defined in <a href="https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/store.ts#L45" target="_blank" rel="noopener noreferrer">core/src/store.ts:45<OutboundLink/></a></em></p>
<h2 id="accessors-1"><a class="header-anchor" href="#accessors-1">#</a> Accessors</h2>
<h3 id="state"><a class="header-anchor" href="#state">#</a> state</h3>
<p>• get <strong>state</strong>(): <RouterLink to="/api-docs/modules/_harlem_core.html#readstate">ReadState</RouterLink>&lt;TState&gt;</p>
<p><em>Defined in <a href="https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/store.ts#L58" target="_blank" rel="noopener noreferrer">core/src/store.ts:58<OutboundLink/></a></em></p>
<p><strong>Returns:</strong> <RouterLink to="/api-docs/modules/_harlem_core.html#readstate">ReadState</RouterLink>&lt;TState&gt;</p>
<h2 id="methods-1"><a class="header-anchor" href="#methods-1">#</a> Methods</h2>
<h3 id="emit"><a class="header-anchor" href="#emit">#</a> emit</h3>
<p>▸ <strong>emit</strong>(<code>event</code>: string, <code>sender</code>: string, <code>data</code>: any): void</p>
<p><em>Implementation of <RouterLink to="/api-docs/interfaces/_harlem_core.internalstore.html">InternalStore</RouterLink></em></p>
<p><em>Defined in <a href="https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/store.ts#L62" target="_blank" rel="noopener noreferrer">core/src/store.ts:62<OutboundLink/></a></em></p>
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
<td><code>sender</code></td>
<td>string</td>
</tr>
<tr>
<td><code>data</code></td>
<td>any</td>
</tr>
</tbody>
</table>
<p><strong>Returns:</strong> void</p>
<hr>
<h3 id="exec"><a class="header-anchor" href="#exec">#</a> exec</h3>
<p>▸ <strong>exec</strong>&lt;TResult&gt;(<code>name</code>: string, <code>payload?</code>: any): TResult</p>
<p><em>Implementation of <RouterLink to="/api-docs/interfaces/_harlem_core.internalstore.html">InternalStore</RouterLink></em></p>
<p><em>Defined in <a href="https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/store.ts#L131" target="_blank" rel="noopener noreferrer">core/src/store.ts:131<OutboundLink/></a></em></p>
<h4 id="type-parameters-1"><a class="header-anchor" href="#type-parameters-1">#</a> Type parameters:</h4>
<table>
<thead>
<tr>
<th>Name</th>
<th>Default</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>TResult</code></td>
<td>void</td>
</tr>
</tbody>
</table>
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
<td><code>name</code></td>
<td>string</td>
</tr>
<tr>
<td><code>payload?</code></td>
<td>any</td>
</tr>
</tbody>
</table>
<p><strong>Returns:</strong> TResult</p>
<hr>
<h3 id="getter"><a class="header-anchor" href="#getter">#</a> getter</h3>
<p>▸ <strong>getter</strong>&lt;TResult&gt;(<code>name</code>: string, <code>getter</code>: <RouterLink to="/api-docs/modules/_harlem_core.html#getter">Getter</RouterLink>&lt;TState, TResult&gt;): ComputedRef&lt;TResult&gt;</p>
<p><em>Implementation of <RouterLink to="/api-docs/interfaces/_harlem_core.internalstore.html">InternalStore</RouterLink></em></p>
<p><em>Defined in <a href="https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/store.ts#L80" target="_blank" rel="noopener noreferrer">core/src/store.ts:80<OutboundLink/></a></em></p>
<h4 id="type-parameters-2"><a class="header-anchor" href="#type-parameters-2">#</a> Type parameters:</h4>
<table>
<thead>
<tr>
<th>Name</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>TResult</code></td>
</tr>
</tbody>
</table>
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
<td><code>name</code></td>
<td>string</td>
</tr>
<tr>
<td><code>getter</code></td>
<td><RouterLink to="/api-docs/modules/_harlem_core.html#getter">Getter</RouterLink>&lt;TState, TResult&gt;</td>
</tr>
</tbody>
</table>
<p><strong>Returns:</strong> ComputedRef&lt;TResult&gt;</p>
<hr>
<h3 id="mutation"><a class="header-anchor" href="#mutation">#</a> mutation</h3>
<p>▸ <strong>mutation</strong>&lt;TPayload, TResult&gt;(<code>name</code>: string, <code>mutator</code>: <RouterLink to="/api-docs/modules/_harlem_core.html#mutator">Mutator</RouterLink>&lt;TState, TPayload, TResult&gt;): <RouterLink to="/api-docs/modules/_harlem_core.html#mutation">Mutation</RouterLink>&lt;TPayload, TResult&gt;</p>
<p><em>Implementation of <RouterLink to="/api-docs/interfaces/_harlem_core.internalstore.html">InternalStore</RouterLink></em></p>
<p><em>Defined in <a href="https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/store.ts#L117" target="_blank" rel="noopener noreferrer">core/src/store.ts:117<OutboundLink/></a></em></p>
<h4 id="type-parameters-3"><a class="header-anchor" href="#type-parameters-3">#</a> Type parameters:</h4>
<table>
<thead>
<tr>
<th>Name</th>
<th>Default</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>TPayload</code></td>
<td>-</td>
</tr>
<tr>
<td><code>TResult</code></td>
<td>void</td>
</tr>
</tbody>
</table>
<h4 id="parameters-4"><a class="header-anchor" href="#parameters-4">#</a> Parameters:</h4>
<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>name</code></td>
<td>string</td>
</tr>
<tr>
<td><code>mutator</code></td>
<td><RouterLink to="/api-docs/modules/_harlem_core.html#mutator">Mutator</RouterLink>&lt;TState, TPayload, TResult&gt;</td>
</tr>
</tbody>
</table>
<p><strong>Returns:</strong> <RouterLink to="/api-docs/modules/_harlem_core.html#mutation">Mutation</RouterLink>&lt;TPayload, TResult&gt;</p>
<hr>
<h3 id="on"><a class="header-anchor" href="#on">#</a> on</h3>
<p>▸ <strong>on</strong>(<code>event</code>: string, <code>handler</code>: <RouterLink to="/api-docs/modules/_harlem_core.html#eventhandler">EventHandler</RouterLink>): <RouterLink to="/api-docs/interfaces/_harlem_core.eventlistener.html">EventListener</RouterLink></p>
<p><em>Defined in <a href="https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/store.ts#L72" target="_blank" rel="noopener noreferrer">core/src/store.ts:72<OutboundLink/></a></em></p>
<h4 id="parameters-5"><a class="header-anchor" href="#parameters-5">#</a> Parameters:</h4>
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
<p><em>Defined in <a href="https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/store.ts#L76" target="_blank" rel="noopener noreferrer">core/src/store.ts:76<OutboundLink/></a></em></p>
<h4 id="parameters-6"><a class="header-anchor" href="#parameters-6">#</a> Parameters:</h4>
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
<h3 id="write"><a class="header-anchor" href="#write">#</a> write</h3>
<p>▸ <strong>write</strong>&lt;TResult&gt;(<code>name</code>: string, <code>sender</code>: string, <code>mutator</code>: <RouterLink to="/api-docs/modules/_harlem_core.html#mutator">Mutator</RouterLink>&lt;TState, undefined, TResult&gt;): TResult</p>
<p><em>Implementation of <RouterLink to="/api-docs/interfaces/_harlem_core.internalstore.html">InternalStore</RouterLink></em></p>
<p><em>Defined in <a href="https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/store.ts#L141" target="_blank" rel="noopener noreferrer">core/src/store.ts:141<OutboundLink/></a></em></p>
<h4 id="type-parameters-4"><a class="header-anchor" href="#type-parameters-4">#</a> Type parameters:</h4>
<table>
<thead>
<tr>
<th>Name</th>
<th>Default</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>TResult</code></td>
<td>void</td>
</tr>
</tbody>
</table>
<h4 id="parameters-7"><a class="header-anchor" href="#parameters-7">#</a> Parameters:</h4>
<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>name</code></td>
<td>string</td>
</tr>
<tr>
<td><code>sender</code></td>
<td>string</td>
</tr>
<tr>
<td><code>mutator</code></td>
<td><RouterLink to="/api-docs/modules/_harlem_core.html#mutator">Mutator</RouterLink>&lt;TState, undefined, TResult&gt;</td>
</tr>
</tbody>
</table>
<p><strong>Returns:</strong> TResult</p>
</template>