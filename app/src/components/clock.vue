<template>
    <div class="clock">
        <div class="clock__housing">
            <div class="clock__face">
                <div class="clock__hand clock__hand--hour" :style="handStyles.hour"></div>
                <div class="clock__hand clock__hand--minute" :style="handStyles.minute"></div>
                <div class="clock__hand clock__hand--second" :style="handStyles.second"></div>
            </div>
        </div>
        <div class="clock__label">{{ label }}</div>
    </div>
</template>

<script lang="ts" setup>
import scale from '../utilities/scale';

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
        type: String,
        default: 'Australia/Brisbane'
    }

});

const hourScale = scale([0, 12], [0, 360]);
const minSecScale = scale([0, 60], [0, 360]);
const relativeMinSecScale = scale([0, 60], [0, 1]);

const handStyles = computed(() => {
    const hours = props.time.getHours() % 12;
    const minutes = props.time.getMinutes();
    const seconds = props.time.getSeconds();

    return {
        hour: {
            transform: `translateX(-50%) rotate(${hourScale(hours + relativeMinSecScale(minutes))}deg)`
        },
        minute: {
            transform: `translateX(-50%) rotate(${minSecScale(minutes + relativeMinSecScale(seconds))}deg)`
        },
        second: {
            transform: `translateX(-50%) rotate(${minSecScale(seconds)}deg)`
        }
    };
});

const label = computed(() => format(props.time, 'dd MMM - HH:mm:ss zzz', {
    timeZone: props.timezone,
}));

</script>

<style>

    .clock {
        background-color: beige;
    }
    
    .clock__housing {
        width: 128px;
        aspect-ratio: 1 / 1;
        padding: 0.5rem;
        background-color: #FFFFFF;
        border-radius: 50%;
    }

    .clock__face {
        position: relative;
        width: 100%;
        height: 100%;
        background: transparent url(../assets/images/clock.svg) no-repeat center;
    }

    .clock__hand {
        position: absolute;
        top: 15%;
        left: 50%;
        width: 2px;
        height: 35%;
        background-color: black;
        border-radius: 2px;
        transform-origin: bottom center;
        transform: translate(-50%, -50%);
    }

    .clock__hand--hour {
        top: 20%;
        height: 30%;
    }

    .clock__hand--second {
        height: 45%;
        background-color: red;
        transform-origin: 50% 80%;
        transition: transform 250ms cubic-bezier(0.4, 2.08, 0.55, 0.44);
    }

</style>