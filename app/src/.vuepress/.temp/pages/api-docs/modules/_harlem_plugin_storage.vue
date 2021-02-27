<template><p><strong><RouterLink to="/api-docs/">Harlem</RouterLink></strong></p>
<blockquote>
<p><RouterLink to="/api-docs/">Globals</RouterLink> / @harlem/plugin-storage</p>
</blockquote>
<h1 id="module-harlem-plugin-storage"><a class="header-anchor" href="#module-harlem-plugin-storage">#</a> Module: @harlem/plugin-storage</h1>
<h2 id="index"><a class="header-anchor" href="#index">#</a> Index</h2>
<h3 id="references"><a class="header-anchor" href="#references">#</a> References</h3>
<ul>
<li><RouterLink to="/api-docs/modules/_harlem_plugin_storage.html#options">Options</RouterLink></li>
<li><RouterLink to="/api-docs/modules/_harlem_plugin_storage.html#storagemap">StorageMap</RouterLink></li>
<li><RouterLink to="/api-docs/modules/_harlem_plugin_storage.html#storagetype">StorageType</RouterLink></li>
</ul>
<h3 id="interfaces"><a class="header-anchor" href="#interfaces">#</a> Interfaces</h3>
<ul>
<li><RouterLink to="/api-docs/interfaces/_harlem_plugin_storage.options.html">Options</RouterLink></li>
</ul>
<h3 id="type-aliases"><a class="header-anchor" href="#type-aliases">#</a> Type aliases</h3>
<ul>
<li><RouterLink to="/api-docs/modules/_harlem_plugin_storage.html#storagemap">StorageMap</RouterLink></li>
<li><RouterLink to="/api-docs/modules/_harlem_plugin_storage.html#storagetype">StorageType</RouterLink></li>
</ul>
<h3 id="variables"><a class="header-anchor" href="#variables">#</a> Variables</h3>
<ul>
<li><RouterLink to="/api-docs/modules/_harlem_plugin_storage.html#sender">SENDER</RouterLink></li>
</ul>
<h3 id="functions"><a class="header-anchor" href="#functions">#</a> Functions</h3>
<ul>
<li><RouterLink to="/api-docs/modules/_harlem_plugin_storage.html#createstorageplugin">createStoragePlugin</RouterLink></li>
</ul>
<h3 id="object-literals"><a class="header-anchor" href="#object-literals">#</a> Object literals</h3>
<ul>
<li><RouterLink to="/api-docs/modules/_harlem_plugin_storage.html#options">OPTIONS</RouterLink></li>
<li><RouterLink to="/api-docs/modules/_harlem_plugin_storage.html#storage">STORAGE</RouterLink></li>
</ul>
<h2 id="references-1"><a class="header-anchor" href="#references-1">#</a> References</h2>
<h3 id="options"><a class="header-anchor" href="#options">#</a> Options</h3>
<p>Re-exports: <RouterLink to="/api-docs/interfaces/_harlem_plugin_storage.options.html">Options</RouterLink></p>
<hr>
<h3 id="storagemap"><a class="header-anchor" href="#storagemap">#</a> StorageMap</h3>
<p>Re-exports: <RouterLink to="/api-docs/modules/_harlem_plugin_storage.html#storagemap">StorageMap</RouterLink></p>
<hr>
<h3 id="storagetype"><a class="header-anchor" href="#storagetype">#</a> StorageType</h3>
<p>Re-exports: <RouterLink to="/api-docs/modules/_harlem_plugin_storage.html#storagetype">StorageType</RouterLink></p>
<h2 id="type-aliases-1"><a class="header-anchor" href="#type-aliases-1">#</a> Type aliases</h2>
<h3 id="storagemap-1"><a class="header-anchor" href="#storagemap-1">#</a> StorageMap</h3>
<p>Ƭ  <strong>StorageMap</strong>: Record&lt;<RouterLink to="/api-docs/modules/_harlem_plugin_storage.html#storagetype">StorageType</RouterLink>, Storage&gt;</p>
<p><em>Defined in <a href="https://github.com/andrewcourtice/harlem/blob/f05da99/plugins/storage/src/types.ts#L2" target="_blank" rel="noopener noreferrer">plugins/storage/src/types.ts:2<OutboundLink/></a></em></p>
<hr>
<h3 id="storagetype-1"><a class="header-anchor" href="#storagetype-1">#</a> StorageType</h3>
<p>Ƭ  <strong>StorageType</strong>: &quot;local&quot; | &quot;session&quot;</p>
<p><em>Defined in <a href="https://github.com/andrewcourtice/harlem/blob/f05da99/plugins/storage/src/types.ts#L1" target="_blank" rel="noopener noreferrer">plugins/storage/src/types.ts:1<OutboundLink/></a></em></p>
<h2 id="variables-1"><a class="header-anchor" href="#variables-1">#</a> Variables</h2>
<h3 id="sender"><a class="header-anchor" href="#sender">#</a> SENDER</h3>
<p>• <code>Const</code> <strong>SENDER</strong>: &quot;storage&quot; = &quot;storage&quot;</p>
<p><em>Defined in <a href="https://github.com/andrewcourtice/harlem/blob/f05da99/plugins/storage/src/constants.ts#L6" target="_blank" rel="noopener noreferrer">plugins/storage/src/constants.ts:6<OutboundLink/></a></em></p>
<h2 id="functions-1"><a class="header-anchor" href="#functions-1">#</a> Functions</h2>
<h3 id="createstorageplugin"><a class="header-anchor" href="#createstorageplugin">#</a> createStoragePlugin</h3>
<p>▸ <strong>createStoragePlugin</strong>(<code>stores</code>: string | string[], <code>options?</code>: Partial&lt;<RouterLink to="/api-docs/interfaces/_harlem_plugin_storage.options.html">Options</RouterLink>&gt;): HarlemPlugin</p>
<p><em>Defined in <a href="https://github.com/andrewcourtice/harlem/blob/f05da99/plugins/storage/src/index.ts#L19" target="_blank" rel="noopener noreferrer">plugins/storage/src/index.ts:19<OutboundLink/></a></em></p>
<h4 id="parameters"><a class="header-anchor" href="#parameters">#</a> Parameters:</h4>
<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>stores</code></td>
<td>string | string[]</td>
<td>-</td>
</tr>
<tr>
<td><code>options</code></td>
<td>Partial&lt;<RouterLink to="/api-docs/interfaces/_harlem_plugin_storage.options.html">Options</RouterLink>&gt;</td>
<td>OPTIONS</td>
</tr>
</tbody>
</table>
<p><strong>Returns:</strong> HarlemPlugin</p>
<h2 id="object-literals-1"><a class="header-anchor" href="#object-literals-1">#</a> Object literals</h2>
<h3 id="options-1"><a class="header-anchor" href="#options-1">#</a> OPTIONS</h3>
<p>▪ <code>Const</code> <strong>OPTIONS</strong>: object</p>
<p><em>Defined in <a href="https://github.com/andrewcourtice/harlem/blob/f05da99/plugins/storage/src/constants.ts#L8" target="_blank" rel="noopener noreferrer">plugins/storage/src/constants.ts:8<OutboundLink/></a></em></p>
<h4 id="properties"><a class="header-anchor" href="#properties">#</a> Properties:</h4>
<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Value</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>prefix</code></td>
<td>string</td>
<td>&quot;harlem&quot;</td>
</tr>
<tr>
<td><code>sync</code></td>
<td>true</td>
<td>true</td>
</tr>
<tr>
<td><code>type</code></td>
<td>&quot;local&quot;</td>
<td>&quot;local&quot;</td>
</tr>
</tbody>
</table>
<hr>
<h3 id="storage"><a class="header-anchor" href="#storage">#</a> STORAGE</h3>
<p>▪ <code>Const</code> <strong>STORAGE</strong>: object</p>
<p><em>Defined in <a href="https://github.com/andrewcourtice/harlem/blob/f05da99/plugins/storage/src/constants.ts#L14" target="_blank" rel="noopener noreferrer">plugins/storage/src/constants.ts:14<OutboundLink/></a></em></p>
<h4 id="properties-1"><a class="header-anchor" href="#properties-1">#</a> Properties:</h4>
<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Value</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>local</code></td>
<td>Storage</td>
<td>localStorage</td>
</tr>
<tr>
<td><code>session</code></td>
<td>Storage</td>
<td>sessionStorage</td>
</tr>
</tbody>
</table>
</template>