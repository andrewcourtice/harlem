<template><h1 id="getting-started"><a class="header-anchor" href="#getting-started">#</a> Getting Started</h1>
<p>Gettng started with Harlem is easy. Just follow the steps below and you'll be up and running in no time.</p>
<h2 id="installation"><a class="header-anchor" href="#installation">#</a> Installation</h2>
<p>Install <code>@harlem/core</code> and any plugins you wish to include (I recommend installing <code>@harlem/plugin-devtools</code> during development):</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>npm install @harlem/core
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Or if you're using Yarn:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>yarn add @harlem/core
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="register-harlem"><a class="header-anchor" href="#register-harlem">#</a> Register Harlem</h2>
<p>Register the Harlem plugin with your Vue app instance:</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">'./app.vue'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> Harlem <span class="token keyword">from</span> <span class="token string">'@harlem/core'</span><span class="token punctuation">;</span>

<span class="token function">createApp</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>Harlem<span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">mount</span><span class="token punctuation">(</span><span class="token string">'#app'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="create-a-store"><a class="header-anchor" href="#create-a-store">#</a> Create a store</h2>
<p>Create your store and write any getters/mutations:</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span>
    createStore
<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@harlem/core'</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token constant">STATE</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    firstName<span class="token operator">:</span> <span class="token string">'John'</span><span class="token punctuation">,</span>
    lastName<span class="token operator">:</span> <span class="token string">'Smith'</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token punctuation">{</span>
    state<span class="token punctuation">,</span>
    getter<span class="token punctuation">,</span>
    mutation<span class="token punctuation">,</span>
    on
<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">createStore</span><span class="token punctuation">(</span><span class="token string">'user'</span><span class="token punctuation">,</span> <span class="token constant">STATE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div></template>