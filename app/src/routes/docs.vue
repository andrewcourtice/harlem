<template>
    <div class="route docs-route">
        <container>
            <div v-html="docs"></div>
        </container>
    </div>
</template>

<script lang="ts">
import docs from '../../../README.md';

import {
    defineComponent
} from 'vue';

export default defineComponent({

    setup() {
        return {
            docs
        };
    }
    
});
</script>