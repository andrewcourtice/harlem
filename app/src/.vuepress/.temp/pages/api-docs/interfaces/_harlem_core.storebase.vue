<template><p><strong><RouterLink to="/api-docs/">Harlem</RouterLink></strong></p>
<blockquote>
<p><RouterLink to="/api-docs/">Globals</RouterLink> / <RouterLink to="/api-docs/modules/_harlem_core.html">@harlem/core</RouterLink> / StoreBase</p>
</blockquote>
<h1 id="interface-storebase-tstate"><a class="header-anchor" href="#interface-storebase-tstate">#</a> Interface: StoreBase&lt;TState&gt;</h1>
<h2 id="type-parameters"><a class="header-anchor" href="#type-parameters">#</a> Type parameters</h2>
<table>
<thead>
<tr>
<th>Name</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>TState</code></td>
</tr>
</tbody>
</table>
<h2 id="hierarchy"><a class="header-anchor" href="#hierarchy">#</a> Hierarchy</h2>
<ul>
<li>
<p><strong>StoreBase</strong></p>
<p>↳ <RouterLink to="/api-docs/interfaces/_harlem_core.internalstore.html">InternalStore</RouterLink></p>
<p>↳ <RouterLink to="/api-docs/interfaces/_harlem_core.store-1.html">Store</RouterLink></p>
</li>
</ul>
<h2 id="index"><a class="header-anchor" href="#index">#</a> Index</h2>
<h3 id="methods"><a class="header-anchor" href="#methods">#</a> Methods</h3>
<ul>
<li><RouterLink to="/api-docs/interfaces/_harlem_core.storebase.html#getter">getter</RouterLink></li>
<li><RouterLink to="/api-docs/interfaces/_harlem_core.storebase.html#mutation">mutation</RouterLink></li>
</ul>
<h2 id="methods-1"><a class="header-anchor" href="#methods-1">#</a> Methods</h2>
<h3 id="getter"><a class="header-anchor" href="#getter">#</a> getter</h3>
<p>▸ <strong>getter</strong>&lt;TResult&gt;(<code>name</code>: string, <code>getter</code>: <RouterLink to="/api-docs/modules/_harlem_core.html#getter">Getter</RouterLink>&lt;TState, TResult&gt;): ComputedRef&lt;TResult&gt;</p>
<p><em>Defined in <a href="https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/types.ts#L39" target="_blank" rel="noopener noreferrer">core/src/types.ts:39<OutboundLink/></a></em></p>
<h4 id="type-parameters-1"><a class="header-anchor" href="#type-parameters-1">#</a> Type parameters:</h4>
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
<td><code>getter</code></td>
<td><RouterLink to="/api-docs/modules/_harlem_core.html#getter">Getter</RouterLink>&lt;TState, TResult&gt;</td>
</tr>
</tbody>
</table>
<p><strong>Returns:</strong> ComputedRef&lt;TResult&gt;</p>
<hr>
<h3 id="mutation"><a class="header-anchor" href="#mutation">#</a> mutation</h3>
<p>▸ <strong>mutation</strong>&lt;TPayload, TResult&gt;(<code>name</code>: string, <code>mutator</code>: <RouterLink to="/api-docs/modules/_harlem_core.html#mutator">Mutator</RouterLink>&lt;TState, TPayload, TResult&gt;): <RouterLink to="/api-docs/modules/_harlem_core.html#mutation">Mutation</RouterLink>&lt;TPayload, TResult&gt;</p>
<p><em>Defined in <a href="https://github.com/andrewcourtice/harlem/blob/f05da99/core/src/types.ts#L40" target="_blank" rel="noopener noreferrer">core/src/types.ts:40<OutboundLink/></a></em></p>
<h4 id="type-parameters-2"><a class="header-anchor" href="#type-parameters-2">#</a> Type parameters:</h4>
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
<td><code>mutator</code></td>
<td><RouterLink to="/api-docs/modules/_harlem_core.html#mutator">Mutator</RouterLink>&lt;TState, TPayload, TResult&gt;</td>
</tr>
</tbody>
</table>
<p><strong>Returns:</strong> <RouterLink to="/api-docs/modules/_harlem_core.html#mutation">Mutation</RouterLink>&lt;TPayload, TResult&gt;</p>
</template>