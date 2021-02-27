<template><p><strong><RouterLink to="/api-docs/">Harlem</RouterLink></strong></p>
<blockquote>
<p><RouterLink to="/api-docs/">Globals</RouterLink> / @harlem/plugin-ssr</p>
</blockquote>
<h1 id="module-harlem-plugin-ssr"><a class="header-anchor" href="#module-harlem-plugin-ssr">#</a> Module: @harlem/plugin-ssr</h1>
<h2 id="index"><a class="header-anchor" href="#index">#</a> Index</h2>
<h3 id="variables"><a class="header-anchor" href="#variables">#</a> Variables</h3>
<ul>
<li><RouterLink to="/api-docs/modules/_harlem_plugin_ssr.html#sender">SENDER</RouterLink></li>
</ul>
<h3 id="functions"><a class="header-anchor" href="#functions">#</a> Functions</h3>
<ul>
<li><RouterLink to="/api-docs/modules/_harlem_plugin_ssr.html#createclientssrplugin">createClientSSRPlugin</RouterLink></li>
<li><RouterLink to="/api-docs/modules/_harlem_plugin_ssr.html#createserverssrplugin">createServerSSRPlugin</RouterLink></li>
<li><RouterLink to="/api-docs/modules/_harlem_plugin_ssr.html#getbridgingscript">getBridgingScript</RouterLink></li>
<li><RouterLink to="/api-docs/modules/_harlem_plugin_ssr.html#getbridgingscriptblock">getBridgingScriptBlock</RouterLink></li>
</ul>
<h2 id="variables-1"><a class="header-anchor" href="#variables-1">#</a> Variables</h2>
<h3 id="sender"><a class="header-anchor" href="#sender">#</a> SENDER</h3>
<p>• <code>Const</code> <strong>SENDER</strong>: &quot;ssr&quot; = &quot;ssr&quot;</p>
<p><em>Defined in <a href="https://github.com/andrewcourtice/harlem/blob/f05da99/plugins/ssr/src/constants.ts#L1" target="_blank" rel="noopener noreferrer">plugins/ssr/src/constants.ts:1<OutboundLink/></a></em></p>
<h2 id="functions-1"><a class="header-anchor" href="#functions-1">#</a> Functions</h2>
<h3 id="createclientssrplugin"><a class="header-anchor" href="#createclientssrplugin">#</a> createClientSSRPlugin</h3>
<p>▸ <strong>createClientSSRPlugin</strong>(): HarlemPlugin</p>
<p><em>Defined in <a href="https://github.com/andrewcourtice/harlem/blob/f05da99/plugins/ssr/src/index.ts#L70" target="_blank" rel="noopener noreferrer">plugins/ssr/src/index.ts:70<OutboundLink/></a></em></p>
<p>Create a new instance of the client-side SSR plugin</p>
<p><strong>Returns:</strong> HarlemPlugin</p>
<hr>
<h3 id="createserverssrplugin"><a class="header-anchor" href="#createserverssrplugin">#</a> createServerSSRPlugin</h3>
<p>▸ <strong>createServerSSRPlugin</strong>(): HarlemPlugin</p>
<p><em>Defined in <a href="https://github.com/andrewcourtice/harlem/blob/f05da99/plugins/ssr/src/index.ts#L53" target="_blank" rel="noopener noreferrer">plugins/ssr/src/index.ts:53<OutboundLink/></a></em></p>
<p>Create a new instance of the server-side SSR plugin</p>
<p><strong>Returns:</strong> HarlemPlugin</p>
<hr>
<h3 id="getbridgingscript"><a class="header-anchor" href="#getbridgingscript">#</a> getBridgingScript</h3>
<p>▸ <strong>getBridgingScript</strong>(): string</p>
<p><em>Defined in <a href="https://github.com/andrewcourtice/harlem/blob/f05da99/plugins/ssr/src/index.ts#L39" target="_blank" rel="noopener noreferrer">plugins/ssr/src/index.ts:39<OutboundLink/></a></em></p>
<p>Generate a script required to transfer state from server to client</p>
<p><strong>Returns:</strong> string</p>
<hr>
<h3 id="getbridgingscriptblock"><a class="header-anchor" href="#getbridgingscriptblock">#</a> getBridgingScriptBlock</h3>
<p>▸ <strong>getBridgingScriptBlock</strong>(): string</p>
<p><em>Defined in <a href="https://github.com/andrewcourtice/harlem/blob/f05da99/plugins/ssr/src/index.ts#L46" target="_blank" rel="noopener noreferrer">plugins/ssr/src/index.ts:46<OutboundLink/></a></em></p>
<p>Generate a script block required to transfer state from server to client</p>
<p><strong>Returns:</strong> string</p>
</template>