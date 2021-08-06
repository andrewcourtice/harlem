<template>
    <div class="app">
        <container>
            <header>
                <h1>Harlem</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, recusandae enim expedita iusto, esse voluptatum odio itaque delectus voluptatem dolorum dolores sint quam excepturi, consequatur aliquam nesciunt distinctio! Ullam, excepturi!
                </p>
            </header>
            <div class="app__options" layout="rows center-justify">
                <choice-group>
                    <choice v-for="{ label, value } in state.clockTypes" :key="value" :id="value" :value="value" v-model="clockType">
                        <span>{{ label }}</span>
                    </choice>
                </choice-group>
                <div>
                    <button class="button" @click="undo">Undo</button>
                    <button class="button" @click="redo">Redo</button>
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
                        <button @click="removeClock(timezone)">Remove</button>
                    </div>
                </transition-group>
                <div class="add-clock" layout="row center-center">
                    <div>
                        <div>Add a clock</div>
                        <select v-model="addClockModel">
                            <option value="">Select a timezone</option>
                            <option v-for="timezone in timezones" :key="timezone" :value="timezone">{{ timezone }}</option>
                        </select>
                    </div>
                </div>
            </div>
        </container>
    </div>
</template>

<script lang="ts" setup>
import Container from './components/core/container.vue';
import ChoiceGroup from './components/core/choice-group.vue';
import Choice from './components/core/choice.vue';
import AnalogueClock from './components/clock/analogue-clock.vue';
import DigitalClock from './components/clock/digital-clock.vue';

import {
    computed,
} from 'vue';

import {
    format,
} from 'date-fns-tz';

import {
    state,
    clocks,
    timezones,
    setClockType,
    addClock,
    removeClock,
    undo,
    redo,
    loadTimezones
} from './stores/time';

loadTimezones();

const clockType = computed({
    get: () => state.clockType,
    set: type => setClockType(type)
});

const addClockModel = computed({
    get: () => '',
    set: value => value && addClock(value)
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
</script>

<style>

    .app {
        padding: 2rem;
    }

    .app__options {
        margin: 2rem 0;
    }

    .clocks {
        display: grid;
        gap: 2rem;
        grid-template-columns: repeat(auto-fill, minmax(196px, 1fr));
        justify-items: stretch;
        align-items: stretch;
    }

    .clock,
    .add-clock {
        padding: 1.5rem;
        text-align: center;
        background-color: #EEE;
        border-radius: 1.5rem;
    }

    .clock__label {
        margin-top: 1.5rem;
    }
    
    .clock__timezone {
        font-weight: 600;
    }

    .clock__date {
        margin-top: 0.25rem;
        font-size: 0.875rem;
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

</style>