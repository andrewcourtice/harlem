<template>
    <div class="digital-clock">
        <span class="digital-clock__time">{{ labels.time }}</span><span class="digital-clock__phase">{{ labels.phase }}</span>    
    </div>
</template>

<script lang="ts" setup>
import {
    computed
} from 'vue';

import {
    format,
} from 'date-fns-tz';

const props = defineProps({

    time: {
        type: Date,
        default: () => new Date()
    },

    timezone: {
        type: String
    }

});

const labels = computed(() => ({
    time: format(props.time, 'h:mm', {
        timeZone: props.timezone
    }),
    phase: format(props.time, 'a', {
        timeZone: props.timezone
    })
}));
</script>

<style lang="scss">

    @font-face {
        font-family: 'Digital';
        src: url('../../assets/fonts/digital/digital.ttf') format('truetype');
    }

    .digital-clock {
        font-family: 'Digital', 'Open Sans';
        padding: 1rem;
        color: rgb(200, 200, 200);
        background-color: var(--background__colour--inverse);
        border-radius: 0.5rem;
    }

    .digital-clock__time {
        font-size: 2.25em;
    }

    .digital-clock__phase {
        margin-left: 0.5em;
        color: #76D1A7;
        font-size: 1.25em;
    }

</style>