<template>
    <teleport to="body">
        <transition-group name="modal">
            <div v-if="isShowing" class="modal" layout="row center-center" v-bind="$attrs">
                <div class="modal__content" self="size-small">
                    <div v-if="$slots.header" class="modal__header">
                        <slot name="header" v-bind="{ open, close }"></slot>
                    </div>
                    <div class="modal__body">
                        <slot v-bind="{ open, close }"></slot>
                    </div>
                    <div v-if="$slots.footer" class="modal__footer">
                        <slot name="footer" v-bind="{ open, close }"></slot>
                    </div>
                </div>
            </div>
        </transition-group>
    </teleport>
</template>

<script lang="ts">
export default {
    inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import {
    ref,
} from 'vue';

const isShowing = ref(false);

const open = () => isShowing.value = true;
const close = () => isShowing.value = false;

defineExpose({
    open,
    close,
});
</script>

<style lang="scss">

    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 2rem;
        background-color: var(--background__colour--shade);
        z-index: 1000;
    }

    .modal__content {
        max-height: 100%;
        display: grid;
        padding: 1.5rem;
        grid-template-rows: auto 1fr auto;
        background-color: var(--background__colour);
        border-radius: 0.5rem;
        overflow: hidden;
    }

    .modal__header {
        padding: 0 0 1.5rem 0;
    }

    .modal__body {
        overflow-y: auto;
    }

    .modal__footer {
        padding: 1.5rem 0 0 0;
    }

    .modal-enter-from,
    .modal-leave-to {
        opacity: 0;

        & .modal__content {
            transform: scale(0);
        }
    }

    .modal-enter-active,
    .modal-leave-active {
        transition: opacity var(--animation__timing) var(--animation__easing);

        & .modal__content {
            transition: transform var(--animation__timing) var(--animation__easing);
        }
    }

</style>