<template>
    <div class="main-layout">
        <div class="main-layout__header" layout="row center-justify">
            <div>
                <router-link class="main-layout__link" layout="row center-left" to="/">
                    <img class="main-layout__logo" :src="logo" alt="">
                    <h1 class="main-layout__title">Harlem</h1>
                </router-link>
            </div>
            <div>
                <a class="main-layout__link text--no-wrap" href="https://github.com/andrewcourtice/harlem" target="_blank">View Source</a>
            </div>
        </div>
        <div class="main-layout__body">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import logo from '../../assets/images/logo-192.svg';

import {
    defineComponent
} from 'vue';

export default defineComponent({
   
    setup() {
        return {
            logo
        };
    }

});
</script>

<style lang="scss">

    .main-layout__header {
        position: sticky;
        top: 0;
        padding: var(--spacing__small) var(--spacing__medium);
        text-align: center;
        background-color: var(--background__colour);
    }

    .main-layout__logo {
        display: block;
        width: 1rem;
    }

    .main-layout__title {
        margin: 0 0 0 var(--spacing__x-small);
        color: var(--font__colour);
        font-size: var(--font__size--large);
        font-family: var(--font__family--title);
    }

</style>