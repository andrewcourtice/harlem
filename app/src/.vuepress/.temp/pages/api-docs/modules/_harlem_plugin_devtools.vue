<template><p><strong><RouterLink to="/api-docs/">Harlem</RouterLink></strong></p>
<blockquote>
<p><RouterLink to="/api-docs/">Globals</RouterLink> / @harlem/plugin-devtools</p>
</blockquote>
<h1 id="module-harlem-plugin-devtools"><a class="header-anchor" href="#module-harlem-plugin-devtools">#</a> Module: @harlem/plugin-devtools</h1>
<h2 id="index"><a class="header-anchor" href="#index">#</a> Index</h2>
<h3 id="interfaces"><a class="header-anchor" href="#interfaces">#</a> Interfaces</h3>
<ul>
<li><RouterLink to="/api-docs/interfaces/_harlem_plugin_devtools.options.html">Options</RouterLink></li>
</ul>
<h3 id="type-aliases"><a class="header-anchor" href="#type-aliases">#</a> Type aliases</h3>
<ul>
<li><RouterLink to="/api-docs/modules/_harlem_plugin_devtools.html#edithookhandler">EditHookHandler</RouterLink></li>
<li><RouterLink to="/api-docs/modules/_harlem_plugin_devtools.html#logtype">LogType</RouterLink></li>
<li><RouterLink to="/api-docs/modules/_harlem_plugin_devtools.html#statehookhandler">StateHookHandler</RouterLink></li>
<li><RouterLink to="/api-docs/modules/_harlem_plugin_devtools.html#treehookhandler">TreeHookHandler</RouterLink></li>
</ul>
<h3 id="variables"><a class="header-anchor" href="#variables">#</a> Variables</h3>
<ul>
<li><RouterLink to="/api-docs/modules/_harlem_plugin_devtools.html#all_stores_id">ALL_STORES_ID</RouterLink></li>
<li><RouterLink to="/api-docs/modules/_harlem_plugin_devtools.html#devtools_id">DEVTOOLS_ID</RouterLink></li>
<li><RouterLink to="/api-docs/modules/_harlem_plugin_devtools.html#sender">SENDER</RouterLink></li>
</ul>
<h3 id="functions"><a class="header-anchor" href="#functions">#</a> Functions</h3>
<ul>
<li><RouterLink to="/api-docs/modules/_harlem_plugin_devtools.html#createdevtoolsplugin">createDevtoolsPlugin</RouterLink></li>
</ul>
<h3 id="object-literals"><a class="header-anchor" href="#object-literals">#</a> Object literals</h3>
<ul>
<li><RouterLink to="/api-docs/modules/_harlem_plugin_devtools.html#options">OPTIONS</RouterLink></li>
</ul>
<h2 id="type-aliases-1"><a class="header-anchor" href="#type-aliases-1">#</a> Type aliases</h2>
<h3 id="edithookhandler"><a class="header-anchor" href="#edithookhandler">#</a> EditHookHandler</h3>
<p>Ƭ  <strong>EditHookHandler</strong>: HookHandler&lt;HookPayloads[EDIT_INSPECTOR_STATE], any&gt;</p>
<p><em>Defined in <a href="https://github.com/andrewcourtice/harlem/blob/f05da99/plugins/devtools/src/types.ts#L9" target="_blank" rel="noopener noreferrer">plugins/devtools/src/types.ts:9<OutboundLink/></a></em></p>
<hr>
<h3 id="logtype"><a class="header-anchor" href="#logtype">#</a> LogType</h3>
<p>Ƭ  <strong>LogType</strong>: &quot;default&quot; | &quot;warning&quot; | &quot;error&quot;</p>
<p><em>Defined in <a href="https://github.com/andrewcourtice/harlem/blob/f05da99/plugins/devtools/src/types.ts#L11" target="_blank" rel="noopener noreferrer">plugins/devtools/src/types.ts:11<OutboundLink/></a></em></p>
<hr>
<h3 id="statehookhandler"><a class="header-anchor" href="#statehookhandler">#</a> StateHookHandler</h3>
<p>Ƭ  <strong>StateHookHandler</strong>: HookHandler&lt;HookPayloads[GET_INSPECTOR_STATE], any&gt;</p>
<p><em>Defined in <a href="https://github.com/andrewcourtice/harlem/blob/f05da99/plugins/devtools/src/types.ts#L8" target="_blank" rel="noopener noreferrer">plugins/devtools/src/types.ts:8<OutboundLink/></a></em></p>
<hr>
<h3 id="treehookhandler"><a class="header-anchor" href="#treehookhandler">#</a> TreeHookHandler</h3>
<p>Ƭ  <strong>TreeHookHandler</strong>: HookHandler&lt;HookPayloads[GET_INSPECTOR_TREE], any&gt;</p>
<p><em>Defined in <a href="https://github.com/andrewcourtice/harlem/blob/f05da99/plugins/devtools/src/types.ts#L7" target="_blank" rel="noopener noreferrer">plugins/devtools/src/types.ts:7<OutboundLink/></a></em></p>
<h2 id="variables-1"><a class="header-anchor" href="#variables-1">#</a> Variables</h2>
<h3 id="all-stores-id"><a class="header-anchor" href="#all-stores-id">#</a> ALL_STORES_ID</h3>
<p>• <code>Const</code> <strong>ALL_STORES_ID</strong>: &quot;$all&quot; = &quot;$all&quot;</p>
<p><em>Defined in <a href="https://github.com/andrewcourtice/harlem/blob/f05da99/plugins/devtools/src/constants.ts#L7" target="_blank" rel="noopener noreferrer">plugins/devtools/src/constants.ts:7<OutboundLink/></a></em></p>
<hr>
<h3 id="devtools-id"><a class="header-anchor" href="#devtools-id">#</a> DEVTOOLS_ID</h3>
<p>• <code>Const</code> <strong>DEVTOOLS_ID</strong>: &quot;harlem&quot; = &quot;harlem&quot;</p>
<p><em>Defined in <a href="https://github.com/andrewcourtice/harlem/blob/f05da99/plugins/devtools/src/constants.ts#L6" target="_blank" rel="noopener noreferrer">plugins/devtools/src/constants.ts:6<OutboundLink/></a></em></p>
<hr>
<h3 id="sender"><a class="header-anchor" href="#sender">#</a> SENDER</h3>
<p>• <code>Const</code> <strong>SENDER</strong>: &quot;devtools&quot; = &quot;devtools&quot;</p>
<p><em>Defined in <a href="https://github.com/andrewcourtice/harlem/blob/f05da99/plugins/devtools/src/constants.ts#L5" target="_blank" rel="noopener noreferrer">plugins/devtools/src/constants.ts:5<OutboundLink/></a></em></p>
<h2 id="functions-1"><a class="header-anchor" href="#functions-1">#</a> Functions</h2>
<h3 id="createdevtoolsplugin"><a class="header-anchor" href="#createdevtoolsplugin">#</a> createDevtoolsPlugin</h3>
<p>▸ <strong>createDevtoolsPlugin</strong>(<code>options?</code>: Partial&lt;<RouterLink to="/api-docs/interfaces/_harlem_plugin_devtools.options.html">Options</RouterLink>&gt;): HarlemPlugin</p>
<p><em>Defined in <a href="https://github.com/andrewcourtice/harlem/blob/f05da99/plugins/devtools/src/index.ts#L200" target="_blank" rel="noopener noreferrer">plugins/devtools/src/index.ts:200<OutboundLink/></a></em></p>
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
<td><code>options</code></td>
<td>Partial&lt;<RouterLink to="/api-docs/interfaces/_harlem_plugin_devtools.options.html">Options</RouterLink>&gt;</td>
<td>OPTIONS</td>
</tr>
</tbody>
</table>
<p><strong>Returns:</strong> HarlemPlugin</p>
<h2 id="object-literals-1"><a class="header-anchor" href="#object-literals-1">#</a> Object literals</h2>
<h3 id="options"><a class="header-anchor" href="#options">#</a> OPTIONS</h3>
<p>▪ <code>Const</code> <strong>OPTIONS</strong>: object</p>
<p><em>Defined in <a href="https://github.com/andrewcourtice/harlem/blob/f05da99/plugins/devtools/src/constants.ts#L9" target="_blank" rel="noopener noreferrer">plugins/devtools/src/constants.ts:9<OutboundLink/></a></em></p>
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
<td><code>color</code></td>
<td>number</td>
<td>4244621</td>
</tr>
<tr>
<td><code>label</code></td>
<td>string</td>
<td>&quot;Harlem&quot;</td>
</tr>
</tbody>
</table>
</template>