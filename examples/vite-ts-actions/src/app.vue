<template>
    <div>
        <h1>Welcome {{ fullName }}</h1>
        <input v-model="firstName" type="text" placeholder="First name">
        <input v-model="lastName" type="text" placeholder="Last name">
        <input v-model.number="timeout" type="number" step="100">
        <p>
            Click the <strong>Get new name</strong> button with the <strong>{{ timeout }}ms</strong> period to have the action automatically cancel running instances.
            <br>
            Open your browser devtools to the action cancellation error.
        </p>
        <div>
            <button @click="reset()">Reset</button>
            <button @click="getNewName(timeout)">Get new name</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {
    ref,
} from 'vue';

import {
    computeState,
    fullName,
    getNewName,
    reset,
} from './store';

const timeout = ref(3000);

const firstName = computeState(state => state.firstName);
const lastName = computeState(state => state.lastName);
</script>
