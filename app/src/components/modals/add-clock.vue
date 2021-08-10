<template>
    <modal class="add-clock-modal" ref="modal">
        <template #header>
            <h2 class="add-clock-modal__title">Add Clock</h2>
        </template>
        <label class="form-label" for="">Timezone</label>
        <input class="add-clock-modal__filter" v-model="model.filter" type="text" placeholder="Search for a timezone..." autofocus>
        <select class="add-clock-modal__timezones" v-model="model.selection" multiple="true">
            <option v-for="timezone in filteredTimezones" :key="timezone" :value="timezone">{{ timezone }}</option>
        </select>
        <div class="add-clock-modal__tip">
            <meta-text>
                <strong>Tip:</strong> select multiple timezones by holding ctrl/cmd when clicking an item
            </meta-text>
        </div>
        <template #footer="{ close }">
            <div class="add-clock-modal__actions" layout="row center-right">
                <button class="button" @click="close()">Cancel</button>
                <button class="button button--primary" :disabled="!canComplete" @click="complete()">Add {{ model.selection.length }} Clocks</button>
            </div>
        </template>
    </modal>
</template>

<script lang="ts" setup>
import Modal from '../core/modal.vue';
import MetaText from '../core/meta-text.vue';

import isEqual from '../../utilities/string/is-equal';

import {
    computed,
    reactive,
    ref
} from 'vue';

import {
    addClocks,
    timezones
} from '../../stores/time';

const modal = ref();

const model = reactive({
    filter: '',
    selection: [] as string[]
});

const filteredTimezones = computed(() => {
    return timezones.value.filter(timezone => isEqual(timezone, model.filter));
});

const canComplete = computed(() => model.selection.length > 0);

function reset() {
    model.filter = '';
    model.selection = [];
}

function complete() {
    if (model.selection.length === 0) {
        return;
    }

    addClocks(model.selection);

    modal.value.close();
}

defineExpose({
    open: () => (reset(), modal.value.open()),
    close: () => modal.value.close(),
});
</script>

<style lang="scss">

    .add-clock-modal__title {
        margin: 0;
    }

    .add-clock-modal__filter,
    .add-clock-modal__timezones {
        display: block;
        width: 100%;
    }

    .add-clock-modal__filter {
        margin-bottom: 1rem;
    }

    .add-clock-modal__tip {
        margin: 1rem 0;
    }

    .add-clock-modal__actions {

        & .button {
            margin-left: 1rem;
        }
    }

</style>