<template>
    <div class="analogue-clock">
        <div class="analogue-clock__face">
            <div class="analogue-clock__hand analogue-clock__hand--hour" :style="handStyles.hour"></div>
            <div class="analogue-clock__hand analogue-clock__hand--minute" :style="handStyles.minute"></div>
            <div class="analogue-clock__hand analogue-clock__hand--second" :style="handStyles.second"></div>
            <div class="analogue-clock__hand-spindle"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import scale from '../../utilities/number/scale';

import {
    computed
} from 'vue';

const props = defineProps({

    time: {
        type: Date,
        default: () => new Date()
    },

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
            transform: `translateX(var(--clock__hand-offset)) rotate(${hourScale(hours + relativeMinSecScale(minutes))}deg)`
        },
        minute: {
            transform: `translateX(var(--clock__hand-offset)) rotate(${minSecScale(minutes + relativeMinSecScale(seconds))}deg)`
        },
        second: {
            transform: `translateX(var(--clock__hand-offset)) rotate(${minSecScale(seconds)}deg)`
        }
    };
});

function getMarkerStyle(index: number) {
    return 
}
</script>

<style lang="scss">

    .analogue-clock {
        --clock__hand-width: 2px;
        
        width: 100%;
        aspect-ratio: 1 / 1;
        padding: 0.75rem;
        background-color: #000;
        border-radius: 50%;
    }

    .analogue-clock__face {
        position: relative;
        width: 100%;
        height: 100%;
        background: transparent url(../../assets/images/clock.svg) no-repeat center;
    }

    .analogue-clock__hand,
    .analogue-clock__hand-spindle {
        position: absolute;
        left: 50%;
    }

    .analogue-clock__hand {
        --clock__hand-offset: calc(var(--clock__hand-width) / -2);

        top: 0;
        width: var(--clock__hand-width);
        height: 100%;
        transform-origin: 50% 50%;
        transform: translateX(var(--clock__hand-offset));

        &::after {
            position: absolute;
            display: block;
            content: '';
            top: 15%;
            left: 0;
            width: 100%;
            height: 35%;
            border-radius: var(--clock__hand-width);
            background-color: rgb(200, 200, 200);
        }
    }

    .analogue-clock__hand-spindle {
        top: 50%;
        width: 6px;
        height: 6px;
        border-radius: 100%;
        background-color: #76D1A7;
        transform: translate(-50%, -50%);
    }

    .analogue-clock__hand--hour {
        --clock__hand-width: 3px;

        &::after {
            top: 20%;
            height: 30%;
        }
    }

    .analogue-clock__hand--second {
        transition: transform 250ms cubic-bezier(0.4, 2.08, 0.55, 0.44);

        &::after {
            height: 45%;
            background-color: #76D1A7;
        }
    }

</style>