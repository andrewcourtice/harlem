<template>
    <div class="app">
        <h1>Hello {{ fullName }}</h1>
        <input type="text" v-model="givenName" placeholder="Given name">
        <input type="text" v-model="surname" placeholder="Surname">
        <input type="text" v-model="state.surname" placeholder="Surname">
    </div>
</template>

<script lang="ts" setup>
import {
    computed
} from 'vue';

import {
    state,
    setGivenName,
    setSurname
} from './stores/user';

export {
    state,
    fullName
} from './stores/user';

export const givenName = computed({
    get: () => state.givenName,
    set: setGivenName
});

export const surname = computed({
    get: () => state.surname,
    set: setSurname
});
</script>
