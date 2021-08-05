<template>
    <div class="app" layout="row center-center">
        <div>
            <h1>Harlem Demo App</h1>
            <button @click="loadTimezones()">Load Timezones</button>
            <div layout="rows top-spread">
                <clock v-for="clock in clocks" :key="clock.timezone" v-bind="clock"></clock>
            </div>
            <div v-if="isLoading">Loading...</div>
            <div v-else>
                <select name="" id="">
                    <option v-for="option in timezoneOptions" :key="option" :value="option">{{ option }}</option>
                </select>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Clock from './components/clock.vue';

import {
    computed
} from 'vue';

import {
    clocks,
    timezoneOptions,
    loadTimezones,
    isActionRunning
} from './stores/time';

const isLoading = computed(() => isActionRunning('load-timezones'));

</script>

<style>

    .app {
        width: 100%;
        height: 100%;
    }

</style>