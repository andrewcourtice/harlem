<template>
    <div class="app">
        <h1>Hello {{ fullName }}</h1>
        <input type="text" v-model="givenName" placeholder="Given name">
        <input type="text" v-model="surname" placeholder="Surname">
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    computed
} from 'vue';

import {
    state,
    fullName,
    setGivenName,
    setSurname
} from './stores/user';

export default defineComponent({

    setup() {
        const givenName = computed({
            get: () => state.givenName,
            set: setGivenName
        });
        
        const surname = computed({
            get: () => state.surname,
            set: setSurname
        });

        return {
            givenName,
            surname,
            fullName
        }
    }

});
</script>
