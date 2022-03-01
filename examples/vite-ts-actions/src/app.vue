<template>
    <div>
        <h1>Welcome {{ fullName }}</h1>
        <input type="text" placeholder="First name" v-model="firstName">
        <input type="text" placeholder="Last name" v-model="lastName">
        <input type="number" step="100" v-model.number="timeout">
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
    ref
} from 'vue';

import {
    reset,
    fullName,
    computeState,
    getNewName,
} from './store';

const timeout = ref(3000);

const firstName = computeState(state => state.firstName);
const lastName = computeState(state => state.lastName);
</script>
