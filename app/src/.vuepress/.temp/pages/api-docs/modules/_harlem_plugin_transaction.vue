<template><p><strong><RouterLink to="/api-docs/">Harlem</RouterLink></strong></p>
<blockquote>
<p><RouterLink to="/api-docs/">Globals</RouterLink> / @harlem/plugin-transaction</p>
</blockquote>
<h1 id="module-harlem-plugin-transaction"><a class="header-anchor" href="#module-harlem-plugin-transaction">#</a> Module: @harlem/plugin-transaction</h1>
<h2 id="index"><a class="header-anchor" href="#index">#</a> Index</h2>
<h3 id="references"><a class="header-anchor" href="#references">#</a> References</h3>
<ul>
<li><RouterLink to="/api-docs/modules/_harlem_plugin_transaction.html#transaction">Transaction</RouterLink></li>
<li><RouterLink to="/api-docs/modules/_harlem_plugin_transaction.html#transactioneventdata">TransactionEventData</RouterLink></li>
<li><RouterLink to="/api-docs/modules/_harlem_plugin_transaction.html#transactionrollback">TransactionRollback</RouterLink></li>
<li><RouterLink to="/api-docs/modules/_harlem_plugin_transaction.html#transactor">Transactor</RouterLink></li>
</ul>
<h3 id="interfaces"><a class="header-anchor" href="#interfaces">#</a> Interfaces</h3>
<ul>
<li><RouterLink to="/api-docs/interfaces/_harlem_plugin_transaction.transactioneventdata.html">TransactionEventData</RouterLink></li>
</ul>
<h3 id="type-aliases"><a class="header-anchor" href="#type-aliases">#</a> Type aliases</h3>
<ul>
<li><RouterLink to="/api-docs/modules/_harlem_plugin_transaction.html#transaction">Transaction</RouterLink></li>
<li><RouterLink to="/api-docs/modules/_harlem_plugin_transaction.html#transactionrollback">TransactionRollback</RouterLink></li>
<li><RouterLink to="/api-docs/modules/_harlem_plugin_transaction.html#transactor">Transactor</RouterLink></li>
</ul>
<h3 id="variables"><a class="header-anchor" href="#variables">#</a> Variables</h3>
<ul>
<li><RouterLink to="/api-docs/modules/_harlem_plugin_transaction.html#sender">SENDER</RouterLink></li>
</ul>
<h3 id="functions"><a class="header-anchor" href="#functions">#</a> Functions</h3>
<ul>
<li><RouterLink to="/api-docs/modules/_harlem_plugin_transaction.html#createtransactionplugin">createTransactionPlugin</RouterLink></li>
<li><RouterLink to="/api-docs/modules/_harlem_plugin_transaction.html#transaction">transaction</RouterLink></li>
</ul>
<h3 id="object-literals"><a class="header-anchor" href="#object-literals">#</a> Object literals</h3>
<ul>
<li><RouterLink to="/api-docs/modules/_harlem_plugin_transaction.html#events">EVENTS</RouterLink></li>
</ul>
<h2 id="references-1"><a class="header-anchor" href="#references-1">#</a> References</h2>
<h3 id="transaction"><a class="header-anchor" href="#transaction">#</a> Transaction</h3>
<p>Re-exports: <RouterLink to="/api-docs/modules/_harlem_plugin_transaction.html#transaction">Transaction</RouterLink></p>
<hr>
<h3 id="transactioneventdata"><a class="header-anchor" href="#transactioneventdata">#</a> TransactionEventData</h3>
<p>Re-exports: <RouterLink to="/api-docs/interfaces/_harlem_plugin_transaction.transactioneventdata.html">TransactionEventData</RouterLink></p>
<hr>
<h3 id="transactionrollback"><a class="header-anchor" href="#transactionrollback">#</a> TransactionRollback</h3>
<p>Re-exports: <RouterLink to="/api-docs/modules/_harlem_plugin_transaction.html#transactionrollback">TransactionRollback</RouterLink></p>
<hr>
<h3 id="transactor"><a class="header-anchor" href="#transactor">#</a> Transactor</h3>
<p>Re-exports: <RouterLink to="/api-docs/modules/_harlem_plugin_transaction.html#transactor">Transactor</RouterLink></p>
<h2 id="type-aliases-1"><a class="header-anchor" href="#type-aliases-1">#</a> Type aliases</h2>
<h3 id="transaction-1"><a class="header-anchor" href="#transaction-1">#</a> Transaction</h3>
<p>Ƭ  <strong>Transaction</strong>&lt;T&gt;: (payload?: T) =&gt; void</p>
<p><em>Defined in <a href="https://github.com/andrewcourtice/harlem/blob/f05da99/plugins/transaction/src/types.ts#L2" target="_blank" rel="noopener noreferrer">plugins/transaction/src/types.ts:2<OutboundLink/></a></em></p>
<h4 id="type-parameters"><a class="header-anchor" href="#type-parameters">#</a> Type parameters:</h4>
<table>
<thead>
<tr>
<th>Name</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>T</code></td>
</tr>
</tbody>
</table>
<hr>
<h3 id="transactionrollback-1"><a class="header-anchor" href="#transactionrollback-1">#</a> TransactionRollback</h3>
<p>Ƭ  <strong>TransactionRollback</strong>: () =&gt; void</p>
<p><em>Defined in <a href="https://github.com/andrewcourtice/harlem/blob/f05da99/plugins/transaction/src/types.ts#L3" target="_blank" rel="noopener noreferrer">plugins/transaction/src/types.ts:3<OutboundLink/></a></em></p>
<hr>
<h3 id="transactor-1"><a class="header-anchor" href="#transactor-1">#</a> Transactor</h3>
<p>Ƭ  <strong>Transactor</strong>&lt;T&gt;: (payload?: T) =&gt; void</p>
<p><em>Defined in <a href="https://github.com/andrewcourtice/harlem/blob/f05da99/plugins/transaction/src/types.ts#L1" target="_blank" rel="noopener noreferrer">plugins/transaction/src/types.ts:1<OutboundLink/></a></em></p>
<h4 id="type-parameters-1"><a class="header-anchor" href="#type-parameters-1">#</a> Type parameters:</h4>
<table>
<thead>
<tr>
<th>Name</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>T</code></td>
</tr>
</tbody>
</table>
<h2 id="variables-1"><a class="header-anchor" href="#variables-1">#</a> Variables</h2>
<h3 id="sender"><a class="header-anchor" href="#sender">#</a> SENDER</h3>
<p>• <code>Const</code> <strong>SENDER</strong>: &quot;transaction&quot; = &quot;transaction&quot;</p>
<p><em>Defined in <a href="https://github.com/andrewcourtice/harlem/blob/f05da99/plugins/transaction/src/constants.ts#L1" target="_blank" rel="noopener noreferrer">plugins/transaction/src/constants.ts:1<OutboundLink/></a></em></p>
<h2 id="functions-1"><a class="header-anchor" href="#functions-1">#</a> Functions</h2>
<h3 id="createtransactionplugin"><a class="header-anchor" href="#createtransactionplugin">#</a> createTransactionPlugin</h3>
<p>▸ <strong>createTransactionPlugin</strong>(): HarlemPlugin</p>
<p><em>Defined in <a href="https://github.com/andrewcourtice/harlem/blob/f05da99/plugins/transaction/src/index.ts#L80" target="_blank" rel="noopener noreferrer">plugins/transaction/src/index.ts:80<OutboundLink/></a></em></p>
<p><strong>Returns:</strong> HarlemPlugin</p>
<hr>
<h3 id="transaction-2"><a class="header-anchor" href="#transaction-2">#</a> transaction</h3>
<p>▸ <strong>transaction</strong>&lt;T&gt;(<code>name</code>: string, <code>transactor</code>: <RouterLink to="/api-docs/modules/_harlem_plugin_transaction.html#transactor">Transactor</RouterLink>&lt;T&gt;): <RouterLink to="/api-docs/modules/_harlem_plugin_transaction.html#transaction">Transaction</RouterLink>&lt;T&gt;</p>
<p><em>Defined in <a href="https://github.com/andrewcourtice/harlem/blob/f05da99/plugins/transaction/src/index.ts#L30" target="_blank" rel="noopener noreferrer">plugins/transaction/src/index.ts:30<OutboundLink/></a></em></p>
<h4 id="type-parameters-2"><a class="header-anchor" href="#type-parameters-2">#</a> Type parameters:</h4>
<table>
<thead>
<tr>
<th>Name</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>T</code></td>
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
<td><code>transactor</code></td>
<td><RouterLink to="/api-docs/modules/_harlem_plugin_transaction.html#transactor">Transactor</RouterLink>&lt;T&gt;</td>
</tr>
</tbody>
</table>
<p><strong>Returns:</strong> <RouterLink to="/api-docs/modules/_harlem_plugin_transaction.html#transaction">Transaction</RouterLink>&lt;T&gt;</p>
<h2 id="object-literals-1"><a class="header-anchor" href="#object-literals-1">#</a> Object literals</h2>
<h3 id="events"><a class="header-anchor" href="#events">#</a> EVENTS</h3>
<p>▪ <code>Const</code> <strong>EVENTS</strong>: object</p>
<p><em>Defined in <a href="https://github.com/andrewcourtice/harlem/blob/f05da99/plugins/transaction/src/constants.ts#L3" target="_blank" rel="noopener noreferrer">plugins/transaction/src/constants.ts:3<OutboundLink/></a></em></p>
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
<td><code>transaction</code></td>
<td>object</td>
<td>{ after: string = &quot;transaction:after&quot;; before: string = &quot;transaction:before&quot;; error: string = &quot;transaction:error&quot; }</td>
</tr>
</tbody>
</table>
</template>