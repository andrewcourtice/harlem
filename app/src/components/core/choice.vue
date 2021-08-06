<template>
    <label class="choice" :class="choiceClass" :for="id">
        <input class="choice__input"
            type="radio"
            name="clock-type"
            :id="id"
            :value="value"
            v-model="model">
        <slot></slot>
    </label>
</template>

<script lang="ts" setup>
import {
    computed
} from 'vue';

const props = defineProps({

    id: {
        type: String,
        default: `choice-${Math.round(Math.random() * 100000)}`
    },

    modelValue: {
        type: null
    },

    value: {
        type: null
    }

});

const emit = defineEmits(['update:modelValue'])

const model = computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value)
});

const choiceClass = computed(() => ({
    'choice--checked': props.modelValue === props.value
}));
</script>

<style lang="scss">

    .choice {
        display: inline-block;
        padding: 0.5rem 1rem;
        font-weight: 600;
        border-radius: 0.5rem;
        cursor: pointer;
        transition: color var(--animation__timing) var(--animation__easing),
                    background var(--animation__timing) var(--animation__easing);
    }

    .choice--checked {
        color: #FFFFFF;
        background-color: #76D1A7;
    }

    .choice__input {
        display: none;
    }

</style>