<template><p><strong><RouterLink to="/api-docs/">Harlem</RouterLink></strong></p>
<blockquote>
<p><RouterLink to="/api-docs/">Globals</RouterLink> / <RouterLink to="/api-docs/modules/_harlem_core.html">@harlem/core</RouterLink> / InternalStore</p>
</blockquote>
<h1 id="interface-internalstore-tstate"><a class="header-anchor" href="#interface-internalstore-tstate">#</a> Interface: InternalStore&lt;TState&gt;</h1>
<h2 id="type-parameters"><a class="header-anchor" href="#type-parameters">#</a> Type parameters</h2>
<table>
<thead>
<tr>
<th>Name</th>
<th>Default</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>TState</code></td>
<td>any</td>
</tr>
</tbody>
</table>
<h2 id="hierarchy"><a class="header-anchor" href="#hierarchy">#</a> Hierarchy</h2>
<ul>
<li>
<p><RouterLink to="/api-docs/interfaces/_harlem_core.storebase.html">StoreBase</RouterLink>&lt;TState&gt;</p>
<p>↳ <strong>InternalStore</strong></p>
</li>
</ul>
<h2 id="implemented-by"><a class="header-anchor" href="#implemented-by">#</a> Implemented by</h2>
<ul>
<li><RouterLink to="/api-docs/classes/_harlem_core.store.html">Store</RouterLink></li>
</ul>
<h2 id="index"><a class="header-anchor" href="#index">#</a> Index</h2>
<h3 id="properties"><a class="header-anchor" href="#properties">#</a> Properties</h3>
<ul>
<li><RouterLink to="/api-docs/interfaces/_harlem_core.internalstore.html#getters">getters</RouterLink></li>
<li><RouterLink to="/api-docs/interfaces/_harlem_core.internalstore.html#mutations">mutations</RouterLink></li>
<li><RouterLink to="/api-docs/interfaces/_harlem_core.internalstore.html#name">name</RouterLink></li>
<li><RouterLink to="/api-docs/interfaces/_harlem_core.internalstore.html#state">state</RouterLink></li>
</ul>
<h3 id="methods"><a class="header-anchor" href="#methods">#</a> Methods</h3>
<ul>
<li><RouterLink to="/api-docs/interfaces/_harlem_core.internalstore.html#emit">emit</RouterLink></li>
<li><RouterLink to="/api-docs/interfaces/_harlem_core.internalstore.html#exec">exec</RouterLink></li>
<li><RouterLink to="/api-docs/interfaces/_harlem_core.internalstore.html#getter">getter</RouterLink></li>
<li><RouterLink to="/api-docs/interfaces/_harlem_core.internalstore.html#mutation">mutation</RouterLink></li>
<li><RouterLink to="/api-docs/interfaces/_harlem_core.internalstore.html#write">write</RouterLink></li>
</ul>
<h2 id="properties-1"><a class="header-anchor" href="#properties-1">#</a> Properties</h2>
<h3 id="getters"><a class="header-anchor" href="#getters">#</a> getters</h3>
<p>•  <strong>getters</strong>: Map&lt;string, Function&gt;</p>
<p><em>Defined in <a href="https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/types.ts#L46" target="_blank" rel="noopener noreferrer">core/src/types.ts:46<OutboundLink/></a></em></p>
<hr>
<h3 id="mutations"><a class="header-anchor" href="#mutations">#</a> mutations</h3>
<p>•  <strong>mutations</strong>: Map&lt;string, <RouterLink to="/api-docs/modules/_harlem_core.html#mutator">Mutator</RouterLink>&lt;TState, any, any&gt;&gt;</p>
<p><em>Defined in <a href="https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/types.ts#L47" target="_blank" rel="noopener noreferrer">core/src/types.ts:47<OutboundLink/></a></em></p>
<hr>
<h3 id="name"><a class="header-anchor" href="#name">#</a> name</h3>
<p>•  <strong>name</strong>: string</p>
<p><em>Defined in <a href="https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/types.ts#L45" target="_blank" rel="noopener noreferrer">core/src/types.ts:45<OutboundLink/></a></em></p>
<hr>
<h3 id="state"><a class="header-anchor" href="#state">#</a> state</h3>
<p>• <code>Readonly</code> <strong>state</strong>: <RouterLink to="/api-docs/modules/_harlem_core.html#readstate">ReadState</RouterLink>&lt;TState&gt;</p>
<p><em>Defined in <a href="https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/types.ts#L44" target="_blank" rel="noopener noreferrer">core/src/types.ts:44<OutboundLink/></a></em></p>
<h2 id="methods-1"><a class="header-anchor" href="#methods-1">#</a> Methods</h2>
<h3 id="emit"><a class="header-anchor" href="#emit">#</a> emit</h3>
<p>▸ <strong>emit</strong>(<code>event</code>: string, <code>sender</code>: string, <code>data</code>: any): void</p>
<p><em>Defined in <a href="https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/types.ts#L48" target="_blank" rel="noopener noreferrer">core/src/types.ts:48<OutboundLink/></a></em></p>
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
<p><em>Defined in <a href="https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/types.ts#L49" target="_blank" rel="noopener noreferrer">core/src/types.ts:49<OutboundLink/></a></em></p>
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
<p><em>Inherited from <RouterLink to="/api-docs/interfaces/_harlem_core.storebase.html">StoreBase</RouterLink>.<RouterLink to="/api-docs/interfaces/_harlem_core.storebase.html#getter">getter</RouterLink></em></p>
<p><em>Defined in <a href="https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/types.ts#L39" target="_blank" rel="noopener noreferrer">core/src/types.ts:39<OutboundLink/></a></em></p>
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
<td><code>getter</code></td>
<td><RouterLink to="/api-docs/modules/_harlem_core.html#getter">Getter</RouterLink>&lt;TState, TResult&gt;</td>
</tr>
</tbody>
</table>
<p><strong>Returns:</strong> ComputedRef&lt;TResult&gt;</p>
<hr>
<h3 id="mutation"><a class="header-anchor" href="#mutation">#</a> mutation</h3>
<p>▸ <strong>mutation</strong>&lt;TPayload, TResult&gt;(<code>name</code>: string, <code>mutator</code>: <RouterLink to="/api-docs/modules/_harlem_core.html#mutator">Mutator</RouterLink>&lt;TState, TPayload, TResult&gt;): <RouterLink to="/api-docs/modules/_harlem_core.html#mutation">Mutation</RouterLink>&lt;TPayload, TResult&gt;</p>
<p><em>Inherited from <RouterLink to="/api-docs/interfaces/_harlem_core.storebase.html">StoreBase</RouterLink>.<RouterLink to="/api-docs/interfaces/_harlem_core.storebase.html#mutation">mutation</RouterLink></em></p>
<p><em>Defined in <a href="https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/types.ts#L40" target="_blank" rel="noopener noreferrer">core/src/types.ts:40<OutboundLink/></a></em></p>
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
<td><code>mutator</code></td>
<td><RouterLink to="/api-docs/modules/_harlem_core.html#mutator">Mutator</RouterLink>&lt;TState, TPayload, TResult&gt;</td>
</tr>
</tbody>
</table>
<p><strong>Returns:</strong> <RouterLink to="/api-docs/modules/_harlem_core.html#mutation">Mutation</RouterLink>&lt;TPayload, TResult&gt;</p>
<hr>
<h3 id="write"><a class="header-anchor" href="#write">#</a> write</h3>
<p>▸ <strong>write</strong>&lt;TResult&gt;(<code>name</code>: string, <code>sender</code>: string, <code>mutator</code>: <RouterLink to="/api-docs/modules/_harlem_core.html#mutator">Mutator</RouterLink>&lt;TState, undefined, TResult&gt;): TResult</p>
<p><em>Defined in <a href="https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/types.ts#L50" target="_blank" rel="noopener noreferrer">core/src/types.ts:50<OutboundLink/></a></em></p>
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