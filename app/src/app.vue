<template>
    <div class="app">
        <h1>Hello {{ fullName }}</h1>
        <input type="text" v-model="givenName" placeholder="Given name">
        <input type="text" v-model="surname" placeholder="Surname">
        <input type="text" v-model="mainState.surname" placeholder="Surname">
        <div>{{ settingsState }}</div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    computed
} from 'vue';

import {
    state as settingsState
} from './stores/settings';

import {
    state as mainState,
    fullName,
    setGivenName,
    setSurname
} from './stores/main';

export default defineComponent({

    setup() {
        const givenName = computed({
            get: () => mainState.givenName,
            set: setGivenName
        });
        
        const surname = computed({
            get: () => mainState.surname,
            set: setSurname
        });

        return {
            mainState,
            settingsState,
            givenName,
            surname,
            fullName
        }
    }

});
</script>
