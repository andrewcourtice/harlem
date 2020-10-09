<template>
    <div class="code-block">
        <code>
            <pre><slot>{{ value }}</slot></pre>
        </code>
    </div>
</template>

<script lang="ts">
import {
    defineComponent
} from 'vue';

export default defineComponent({
    
    props: {

        value: {
            type: String
        }

    }

});
</script>

<style lang="scss">

    .code-block {
        display: inline-block;
        width: auto;
        max-width: 100%;
        padding: var(--spacing__small);
        background-color: #EEEEEE;
        border-radius: var(--border__radius);
        overflow-x: auto;

        & code {
            padding: 0;
        }
    }

</style>