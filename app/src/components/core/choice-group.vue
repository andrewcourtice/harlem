<template>
    <div class="choice-group" layout="row center-stretch">
        <slot></slot>
    </div>
</template>

<style lang="scss">

    .choice-group {
        display: inline-flex;
        width: auto;
        border-radius: 0.5rem;
        background-color: var(--foreground__colour);
        overflow: hidden;

        & .choice {
            display: block;
            border-radius: 0;
        }
    }

</style>