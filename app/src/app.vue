<template>
    <div class="app">
        <container>
            <header>
                <h1>Harlem</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, recusandae enim expedita iusto, esse voluptatum odio itaque delectus voluptatem dolorum dolores sint quam excepturi, consequatur aliquam nesciunt distinctio! Ullam, excepturi!
                </p>
                <div>{{ thing }}</div>
                <input type="text" v-model="thing">
            </header>
            <div layout="rows center-justify">
                <div layout="row center-right">
                    <div>Clock type:</div>
                    <choice-group>
                        <choice v-for="{ label, value } in state.clockTypes" :key="value" :id="value" :value="value" v-model="clockType">
                            <span>{{ label }}</span>
                        </choice>
                    </choice-group>
                </div>
            </div>
            <div class="clocks">
                <div class="clock" v-for="{ time, timezone } in clocks" :key="timezone">
                    <component  :is="clockComponent" :time="time"></component>
                    <div class="clock__label">
                        <div class="clock__timezone">{{ timezone }}</div>
                        <div class="clock__date">{{ getClockDateLabel(time, timezone) }}</div>
                    </div>
                </div>
                <div class="add-clock">
                    Add Clock
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
    ref,
    watchEffect,
} from 'vue';

import {
    format,
} from 'date-fns-tz';

import {
    state,
    clocks,
    setClockType
} from './stores/time';

const thing = ref('');

watchEffect(() => console.log(state.clockType));

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
</script>

<style>

    .app {
        padding: 2rem;
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

</style>