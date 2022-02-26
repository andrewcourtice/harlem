<template>
    <div>
        <div>
            <div>{{ state }}</div>
            <input type="text" v-model="firstName">
            <input type="text" v-model="lastName">
            <div>
                <button @click="reset()">Reset</button>
            </div>
        </div>
        <NuxtWelcome />
    </div>
</template>

<script lang="ts" setup>
import {
    state,
    reset,
    computeState
} from './store';

const firstName = computeState(s => s.firstName);
const lastName = computeState(s => s.lastName);
</script>
