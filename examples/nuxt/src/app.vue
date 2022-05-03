<template>
    <div>
        <h1>Welcome {{ fullName }}</h1>
        <input type="text" placeholder="First name" v-model="firstName">
        <input type="text" placeholder="Last name" v-model="lastName">
        <div>
            <button @click="loadDetails()">Load Details</button>
            <button @click="reset()">Reset</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {
    computeState,
    fullName,
    loadDetails,
    reset,
} from './store';

const firstName = computeState(state => state.firstName);
const lastName = computeState(state => state.lastName);
</script>
