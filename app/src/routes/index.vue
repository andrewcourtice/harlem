<template>
    <div class="route index-route">
        <header class="index-route__header" layout="row center-center">
            <div class="text--centre">
                <img class="index-route__logo" :src="logo" alt="Harlem">
                <div class="margin__vertical--xx-large">
                    <h1 class="index-route__title">Harlem</h1>
                    <div class="index-route__subtitle">Simple, unopinionated, lightweight and extensible state management for Vue 3</div>
                </div>
                <div class="index-route__actions">
                    <a class="button button--primary" href="#getting-started">Get started</a>
                    <router-link class="button button--primary" :to="demoRoute">View a demo</router-link>
                </div>
            </div>
        </header>
        <section class="index-route__section">
            <container>
                <h2 id="getting-started" class="index-route__section-title">Getting Started</h2>
                <div class="index-route__instructions">
                    <div class="index-route__instruction-step">1.</div>
                    <div class="index-route__instruction-detail">
                        <div>Install the Harlem core package</div>
                        <code-block class="margin__top--x-small" language="bash" value="yarn add @harlem/core"></code-block>
                        <div class="margin__top--small">Or if you're using npm</div>
                        <code-block class="margin__top--x-small" language="bash" value="npm install @harlem/core --save"></code-block>
                    </div>

                    <div class="index-route__instruction-step">2.</div>
                    <div class="index-route__instruction-detail">
                        <div>Register Harlem with your Vue app instance</div>
                        <code-block class="margin__top--small" :value="registerPluginSample"></code-block>
                    </div>

                    <div class="index-route__instruction-step">3.</div>
                    <div class="index-route__instruction-detail">
                        <div>Create your store and write any getters/mutations</div>
                        <code-block class="margin__top--small" :value="createStoreSample"></code-block>
                    </div>
                </div>
                <div class="margin__top--large text--centre">
                    <router-link class="button button--primary" :to="docsRoute">View the docs</router-link>
                </div>
            </container>
        </section>
        <footer class="index-route__footer">
            Andrew Courtice 2020
        </footer>
    </div>
</template>

<script lang="ts">
import registerPluginSample from '../samples/register-plugin.txt';
import createStoreSample from '../samples/create-store.txt';

import logo from '../assets/images/logo-192.svg';

import {
    defineComponent
} from 'vue';

export default defineComponent({

    setup() {
        const demoRoute = {
            name: 'basic-demo'
        };

        const docsRoute = {
            name: 'docs'
        };

        return {
            demoRoute,
            docsRoute,
            logo,
            registerPluginSample,
            createStoreSample
        };
    }
    
});
</script>

<style lang="scss">

    .index-route__header,
    .index-route__section,
    .index-route__footer {
        padding: var(--spacing__large) var(--spacing__medium);
    }

    .index-route__header {
        width: 100%;
        height: 100vh;
    }

    .index-route__logo {
        display: inline-block;
        width: 192px;
    }

    .index-route__title {
        margin: 0;
        font-family: var(--font__family--title);
        font-size: 5rem;
        line-height: 1;
    }

    .index-route__subtitle {
        margin-top: var(--spacing__large);
        color: var(--font__colour--meta);
    }

    .index-route__actions {
        display: inline-grid;
        width: auto;
        grid-template-columns: 1fr 1fr;
        gap: var(--spacing__medium);
    }

    .index-route__section-title {
        margin: 0 0 var(--spacing__large) 0;
        text-align: center;
    }

    .index-route__instructions {
        display: grid;
        grid-template-columns: max-content auto;
        gap: var(--spacing__xx-large) var(--spacing__large);
        justify-content: start;
    }

    .index-route__instruction-step {
        font-family: var(--font__family--title);
        font-size: 3rem;
        line-height: 1;
    }

    .index-route__instruction-detail {
        overflow: hidden;
    }

    .index-route__footer {
        text-align: center;
    }

</style>