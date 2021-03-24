<template>
    <div class="app" layout="row center-center">
        <div>
            <h1>Harlem Demo App</h1>
            <user-details-output />
            <user-details-input />
        </div>
    </div>
</template>

<script lang="ts">
import UserDetailsInput from './components/user/user-details-input.vue';
import UserDetailsOutput from './components/user/user-details-output.vue';

import {
    defineComponent
} from 'vue';

export default defineComponent({

    components: {
        UserDetailsInput,
        UserDetailsOutput
    }

});
</script>

<style>

    .app {
        width: 100%;
        height: 100%;
    }

</style>