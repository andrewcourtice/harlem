<template>
    <div class="app">
        <container>
            <header class="app__header">
                <a href="https://harlemjs.com" target="_blank" rel="noopener noreferrer">
                    <img class="app__logo" src="/images/logo-192.svg" alt="Harlem">
                </a>
                <h1 class="app__title">Harlem</h1>
                <p class="app__intro">
                    This world clock application is a basic demonstration of some of the core features of Harlem.
                    <br>
                    <br>
                    Each clock is synchronised by a single time value stored on <strong>state</strong>. A timer is set to run a <strong>mutation</strong> each second to update the stored time. A <strong>getter</strong> then recalculates each clock's time based on it's timezone. State is synchronised with localStorage using the <strong>storage extension</strong>. Open this URL in multiple tabs to see your changes synced across tabs.
                    <br>
                    <br>
                    If you have the Vue <strong>devtools</strong> installed, open them up and change the inspector to Harlem to see the store. The source code for this demo is available <a href="https://github.com/andrewcourtice/harlem/tree/main/app" target="_blank" rel="noopener noreferrer">here</a>.
                </p>
                <choice-group class="app__theme">
                    <choice v-for="{ label, value } in state.themes"
                        :key="value"
                        v-model="theme"
                        :id="value"
                        :value="value">
                        {{ label }}
                    </choice>
                </choice-group>
            </header>
            <div class="app__options" layout="rows center-justify">
                <choice-group self="sm-full">
                    <choice v-for="{ label, value } in state.clockTypes"
                        :key="value"
                        v-model="clockType"
                        :id="value"
                        :value="value">
                        {{ label }}
                    </choice>
                </choice-group>
                <button class="button button--primary" self="sm-full" @click="openAddClockModal()">Add Clock</button>
            </div>
            <div class="app__clocks">
                <transition-group name="clocks">
                    <div v-for="{ time, timezone } in clocks" :key="timezone" class="app__clock">
                        <component :is="clockComponent" :time="time"></component>
                        <div class="app__clock-label">
                            <div class="app__clock-timezone">{{ getTimezoneLabel(timezone) }}</div>
                            <div class="app__clock-date">{{ getClockDateLabel(time, timezone) }}</div>
                        </div>
                        <div class="app__clock-shade" layout="row bottom-stretch">
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
import AddClockModal from './components/modals/add-clock.vue';

import getTimezoneLabel from './utilities/time/get-timezone-label';

import {
    computed,
    ref,
    watchEffect,
} from 'vue';

import {
    format,
} from 'date-fns-tz';

import {
    clocks,
    computeState,
    loadTimezones,
    removeClock,
    state,
} from './stores/app';

loadTimezones();

watchEffect(() => document.body.setAttribute('theme', state.theme.toLowerCase()));

const addClockModal = ref();

const theme = computeState(state => state.theme);
const clockType = computeState(state => state.clockType);

const clockComponent = computed(() => state.clockType === 'analogue'
    ? AnalogueClock
    : DigitalClock
);

function getClockDateLabel(time: Date, timezone: string) {
    return format(time, 'EEE, do MMM yyyy', {
        timeZone: timezone,
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
        border-bottom: 1px solid var(--border__colour);
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

    .app__theme {
        margin-top: 2rem;
    }

    .app__options {
        margin: 2rem 0;
        gap: 1rem;
    }

    .app__clocks {
        display: grid;
        gap: 2rem;
        grid-template-columns: repeat(auto-fill, minmax(196px, 1fr));
        grid-auto-rows: minmax(128px, 1fr);
        justify-items: stretch;
        align-items: stretch;
    }

    .app__clock {
        position: relative;
        padding: 1.5rem;
        text-align: center;
        background-color: var(--foreground__colour);
        border-radius: 1.5rem;
        overflow: hidden;

        &:hover {

            & .app__clock-shade {
                display: flex;
                animation: clock-shade var(--animation__timing) var(--animation__easing)
            }
        }
    }

    .app__clock-label {
        margin-top: 1.5rem;
    }

    .app__clock-timezone {
        font-weight: var(--font__weight--semi-bold);
    }

    .app__clock-date {
        margin-top: 0.25rem;
        font-size: var(--font__size--meta);
        color: var(--font__colour--meta)
    }

    .app__clock-shade {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 1.5rem;
        background-color: var(--background__colour--shade);
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