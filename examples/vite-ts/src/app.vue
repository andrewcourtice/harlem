<template>
    <div>
        <h1>Welcome {{ fullName }}</h1>
        <input v-model="firstName" type="text" placeholder="First name">
        <input v-model="lastName" type="text" placeholder="Last name">
        <div>
            <button @click="reset()">Reset</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {
    computeState,
    fullName,
    reset,
} from './store';

const firstName = computeState(state => state.firstName);
const lastName = computeState(state => state.lastName);
</script>
