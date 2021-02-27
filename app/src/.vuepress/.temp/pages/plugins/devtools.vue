<template><h1 id="devtools-plugin"><a class="header-anchor" href="#devtools-plugin">#</a> Devtools Plugin</h1>
<p><img src="https://img.shields.io/npm/v/@harlem/plugin-devtools" alt="npm"></p>
<p>This is the official Harlem devtools plugin for adding Vue devtools integration to Harlem.</p>
<p><strong>Note:</strong> The Vue 3 compatible devtools are currently in beta and subject to change. Please ensure you have the beta version of the Vue devtools installed in your browser and disable the stable Vue devtools to prevent conflict.</p>
<p><img src="https://user-images.githubusercontent.com/11718453/95668309-aa5ade00-0bb5-11eb-99f5-1fea4d2061ff.gif" alt="Harlem Devtools"></p>
<h2 id="getting-started"><a class="header-anchor" href="#getting-started">#</a> Getting started</h2>
<p>Before installing the devtools plugin make sure you installed <code>@harlem/core</code>.</p>
<ol>
<li>Install <code>@harlem/plugin-devtools</code>:</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>npm install @harlem/plugin-devtools
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Or if you're using Yarn:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>yarn add @harlem/plugin-devtools
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ol start="2">
<li>Create an instance of the plugin and register it with Harlem:</li>
</ol>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">'./app.vue'</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> harlem <span class="token keyword">from</span> <span class="token string">'@harlem/core'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> createDevtoolsPlugin <span class="token keyword">from</span> <span class="token string">'@harlem/plugin-devtools'</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> devtoolsPlugin <span class="token operator">=</span> <span class="token function">createDevtoolsPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    label<span class="token operator">:</span> <span class="token string">'My State'</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">createApp</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>harlem<span class="token punctuation">,</span> <span class="token punctuation">{</span>
        plugins<span class="token operator">:</span> <span class="token punctuation">[</span>devtoolsPlugin<span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">mount</span><span class="token punctuation">(</span><span class="token string">'#app'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><ol start="3">
<li>Open your Vue devtools to see your stores.</li>
</ol>
<h2 id="options"><a class="header-anchor" href="#options">#</a> Options</h2>
<ul>
<li><strong>label</strong> (string?): The name that will appear in the Vue devtools pane. The default is 'Harlem'.</li>
<li><strong>color</strong> (number?): A Hexadecimal number indicating the color to be used on the timeline for Harlem events. The default is <code>0x40c48d</code>.</li>
</ul>
<p><em>(?) indicates an optional field</em></p>
<h2 id="known-issues"><a class="header-anchor" href="#known-issues">#</a> Known issues</h2>
<p>There is currently an issue where the devtools may not show your stores the first time they are opened. Simply hit the refresh button in the top right of the devtools to force it to show your stores/state.</p>
</template>