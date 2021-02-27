<template><h1 id="introduction"><a class="header-anchor" href="#introduction">#</a> Introduction</h1>
<p>At it's heart, Harlem uses a plugin system to extend functionality and create powerful additions to your stores.</p>
<h1 id="official-plugins"><a class="header-anchor" href="#official-plugins">#</a> Official plugins</h1>
<p>Here is a list of officially support Harlem plugins. These plugins are not designed to suit every use-case but instead add basic functionality for common use-cases.</p>
<ul>
<li><RouterLink to="/plugins/devtools.html">Devtools</RouterLink> (<code>@harlem/plugin-devtools</code>) - The devtools plugin adds Vue devtools integration with your stores to show updates to your state in realtime.</li>
<li><a href="reset">Reset</a> (<code>@harlem/plugin-reset</code>) - The reset plugin provides an API to reset stores to their initial state.</li>
<li><a href="snapshot">Snapshot</a> (<code>@harlem/plugin-snapshot</code>) - The snapshot plugin provides an API to snapshot a store's state at a given point and apply it when convenient.</li>
<li><a href="ssr">SSR</a> (<code>@harlem/plugin-ssr</code>) - The SSR plugin enables support for using Harlem stores in a server-side rendered application.</li>
<li><a href="storage">Storage</a> (<code>@harlem/plugin-storage</code>) - The storage plugin provides simple local/session storage synchronisation with your state. This plugin relieves the burden of having to manually save your state to a web storage resource.</li>
<li><a href="transaction">Transactions</a> (<code>@harlem/plugin-transaction</code>) - The transaction plugin provides an API for defining transactions that run multiple mutations. A transaction can safely rollback mutations in the event of an error.</li>
</ul>
<p>If you require functionality to suit a specific use-case you can write your own plugin. See <a href="#writing-your-own-plugin">Writing your own plugin</a> below.</p>
<p>If you feel that there is a piece of common functionality that should be included as an official Harlem plugin please open an issue providing a description of the plugin, the intended API and, if possible, a working example in a codesandbox.</p>
<h1 id="writing-your-own-plugin"><a class="header-anchor" href="#writing-your-own-plugin">#</a> Writing your own plugin</h1>
<p>Writing your own plugin for Harlem is very straightforward. The plugin architecture mimics Vue's plugin system except for a few minor differences.</p>
<h2 id="basic-example"><a class="header-anchor" href="#basic-example">#</a> Basic example</h2>
<p>Here is an example of a Harlem plugin in it's most basic form:</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token keyword">type</span> <span class="token punctuation">{</span>
    HarlemPlugin
<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@harlem/core'</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>

    name<span class="token operator">:</span> <span class="token string">'my-plugin'</span><span class="token punctuation">,</span>

    <span class="token function">install</span><span class="token punctuation">(</span>app<span class="token punctuation">,</span> eventEmitter<span class="token punctuation">,</span> stores<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// Your plugin logic here</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span> <span class="token keyword">as</span> HarlemPlugin<span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p><strong>Note:</strong> If you're using Typescript it is recommended that you add <code>@harlem/core</code> as a devDependency and export your plugin object cast as a <code>HarlemPlugin</code> (as shown in the example above). This will give you full typing support when authoring your plugin.</p>
<p>As you can see the plugin is similar to Vue in that it has a single <code>install</code> method. Note however that Harlem plugins require a name field to identify your plugin and the install method has <code>eventEmitter</code> and <code>stores</code> args as opposed to <code>options</code>.</p>
<p>The <code>eventEmitter</code> arg allows you to listen and react to store events such as mutations and errors. You can also emit events and listen to events emitted from other plugins.</p>
<p>The <code>stores</code> arg is a <code>Map</code> of all the registered store instances. In your plugin you have complete control to read it's state, enumerate getters/mutations, listen to events, and even reset or mutate state. Because plugins have so much control over the store be very careful not to cause unexpected side-effects to stores.</p>
<h2 id="providing-options"><a class="header-anchor" href="#providing-options">#</a> Providing options</h2>
<p>As you can see in the example above there is no obvious mechanism to accept options to your plugin. To accept options you can just export a function taking an <code>options</code> arg that returns your plugin instance. In fact, this is how the official Harlem plugins are designed.</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token keyword">type</span> <span class="token punctuation">{</span>
    HarlemPlugin
<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@harlem/core'</span><span class="token punctuation">;</span>

<span class="token keyword">interface</span> <span class="token class-name">Options</span> <span class="token punctuation">{</span>
    someOption<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    someOtherOption<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span><span class="token punctuation">(</span>options<span class="token operator">:</span> Options<span class="token punctuation">)</span><span class="token operator">:</span> HarlemPlugin <span class="token punctuation">{</span>

    <span class="token keyword">return</span> <span class="token punctuation">{</span>

        name<span class="token operator">:</span> <span class="token string">'my-plugin'</span><span class="token punctuation">,</span>

        <span class="token function">install</span><span class="token punctuation">(</span>app<span class="token punctuation">,</span> eventEmitter<span class="token punctuation">,</span> stores<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// Your plugin logic here</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h2 id="publishing-your-plugin"><a class="header-anchor" href="#publishing-your-plugin">#</a> Publishing your plugin</h2>
<p>To make it easy for users to find Harlem plugins it is recommended that you name your plugin with a <code>harlem-plugin-</code> prefix if publishing to the NPM registry.</p>
</template>