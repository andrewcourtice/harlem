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
        padding: 0.75rem 2rem;
        font-weight: var(--font__weight--semi-bold);
        text-align: center;
        text-overflow: ellipsis;
        white-space: nowrap;
        border-radius: 0.5rem;
        cursor: pointer;
        transition: color var(--animation__timing) var(--animation__easing),
                    background var(--animation__timing) var(--animation__easing);

        &:not(.choice--checked):hover {
            background-color: var(--foreground__colour--dark);
        }
    }

    .choice--checked {
        color: var(--font__colour--inverse);
        background-color: var(--colour__primary);
    }

    .choice__input {
        display: none;
    }

</style>