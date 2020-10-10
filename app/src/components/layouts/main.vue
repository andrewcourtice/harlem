<template>
    <div class="main-layout">
        <div class="main-layout__header">
            <router-link class="main-layout__link" to="/">
                <h1 class="main-layout__title">Harlem</h1>
            </router-link>
        </div>
        <div class="main-layout__body">
            <slot></slot>
        </div>
    </div>
</template>

<style lang="scss">

    .main-layout__header {
        position: sticky;
        top: 0;
        padding: var(--spacing__small) var(--spacing__medium);
        text-align: center;
        background-color: var(--background__colour);
    }

    .main-layout__title {
        margin: 0;
        font-size: var(--font__size--large);
        font-family: var(--font__family--title);
    }

</style>