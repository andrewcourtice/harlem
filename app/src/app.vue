<template>
    <div class="app">
        <container>
            <header class="app__header">
                <a href="https://harlemjs.com" target="_blank">
                    <img class="app__logo" src="/images/logo-192.svg" alt="Harlem">
                </a>
                <h1 class="app__title">Harlem</h1>
                <p class="app__intro">
                    This world clock application is a basic demonstration of some of the core features of Harlem.
                    <br>
                    <br>
                    Each clock is synchronised by a single time value stored on <strong>state</strong>. A timer is set to run a <strong>mutation</strong> each second to update the stored time. A <strong>getter</strong> then recalculates each clock's time based on it's timezone.
                    <br>
                    <br>
                    If you have the Vue <strong>devtools</strong> installed, open them up and change the inspector to Harlem to see the store. The source code for this demo is available <a href="https://github.com/andrewcourtice/harlem/tree/main/app" target="_blank">here</a>. 
                </p>
            </header>
            <div class="app__options" layout="rows center-justify">
                <choice-group>
                    <choice v-for="{ label, value } in state.clockTypes" :key="value" :id="value" :value="value" v-model="clockType">
                        <span>{{ label }}</span>
                    </choice>
                </choice-group>
                <div layout="rows center-right" self="size-auto">
                    <button class="button button--primary" @click="openAddClockModal()">Add Clock</button>
                </div>
            </div>
            <div class="clocks">
                <transition-group name="clocks">
                    <div class="clock" v-for="{ time, timezone } in clocks" :key="timezone">
                        <component :is="clockComponent" :time="time"></component>
                        <div class="clock__label">
                            <div class="clock__timezone">{{ timezone }}</div>
                            <div class="clock__date">{{ getClockDateLabel(time, timezone) }}</div>
                        </div>
                        <div class="clock__shade" layout="row bottom-stretch">
                            <button class="button button--alert" @click="removeClock(timezone)">Remove</button>
                        </div>
                    </div>
                </transition-group>
            </div>
            <footer class="app__footer">
                <meta-text>MIT Licensed | Copyright © 2020-present Andrew Courtice</meta-text>
            </footer>
        </container>
        <add-clock-modal ref="addClockModal"></add-clock-modal>
    </div>
</template>

<script lang="ts" setup>
import Container from './components/core/container.vue';
import ChoiceGroup from './components/core/choice-group.vue';
import Choice from './components/core/choice.vue';
import MetaText from './components/core/meta-text.vue';
import AnalogueClock from './components/clocks/analogue-clock.vue';
import DigitalClock from './components/clocks/digital-clock.vue';
import AddClockModal from './components/modals/add-clock.vue'

import {
    computed,
    ref,
} from 'vue';

import {
    format,
} from 'date-fns-tz';

import {
    state,
    clocks,
    setClockType,
    removeClock,
    undo,
    redo,
    loadTimezones
} from './stores/time';

loadTimezones();

const addClockModal = ref();

const clockType = computed({
    get: () => state.clockType,
    set: type => setClockType(type)
});

const clockComponent = computed(() => state.clockType === 'analogue'
    ? AnalogueClock
    : DigitalClock
);

function getClockDateLabel(time: Date, timezone: string) {
    return format(time, 'EEE, do MMM yyyy', {
        timeZone: timezone
    });
}

function openAddClockModal() {
    addClockModal.value.open();
}
</script>

<style lang="scss">

    .app {
        padding: 0 2rem;
    }

    .app__header,
    .app__footer {
        padding: 2rem 0;
        text-align: center;
    }

    .app__header {
        border-bottom: 1px solid #EDEDED;
    }

    .app__logo {
        width: 64px;
    }

    .app__title {
        margin: 1rem 0;
        font-family: 'Pacifico', cursive;
        font-weight: 400;
        text-align: center;
    }

    .app__options {
        margin: 2rem 0;
    }

    .clocks {
        display: grid;
        gap: 2rem;
        grid-template-columns: repeat(auto-fill, minmax(196px, 1fr));
        grid-auto-rows: minmax(128px, 1fr);
        justify-items: stretch;
        align-items: stretch;
    }
    
    .clock {
        position: relative;
        padding: 1.5rem;
        text-align: center;
        background-color: #EEE;
        border-radius: 1.5rem;
        overflow: hidden;

        &:hover {

            & .clock__shade {
                display: flex;
                animation: clock-shade var(--animation__timing) var(--animation__easing)
            }
        }
    }

    .clock__label {
        margin-top: 1.5rem;
    }
    
    .clock__timezone {
        font-weight: var(--font__weight--semi-bold);
    }

    .clock__date {
        margin-top: 0.25rem;
        font-size: var(--font__size--meta);
        color: var(--font__colour--meta)
    }

    .clock__shade {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 1.5rem;
        background-color: rgba(0, 0, 0, 0.5);
    }

    .clocks-enter-from,
    .clocks-leave-to {
        opacity: 0;
        transform: scale(0);
    }

    .clocks-enter-active,
    .clocks-leave-active {
        transition: opacity var(--animation__timing) var(--animation__easing),
                    transform var(--animation__timing) var(--animation__easing);
                }
                
    .clocks-move {
        transition: transform var(--animation__timing) var(--animation__easing);
    }

    @keyframes clock-shade {

        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }

    }

</style>