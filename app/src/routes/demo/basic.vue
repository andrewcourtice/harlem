<template>
    <main-layout class="route basic-demo-route">
        <header class="basic-demo-route__header">
            <h1 class="basic-demo-route__title">Basic Demo</h1>
            <container>
                <p>This page demonstrates a basic example using 2 stores. The first store (Main) is being used to store general user information. The second store (Settings) is storing some basic app settings.</p>
                <p>Type into any of the inputs below to see the store information updated in realtime.</p>
            </container>
        </header>
        <section class="basic-demo-route__section">
            <container>
                <div class="basic-demo-route__form">
                    <div>
                        <label for="given-name">Given Name</label>
                        <input id="given-name" type="text" v-model="givenName" placeholder="Given name" autocomplete="off" autofocus="true">
                    </div>
                    <div>
                        <label for="surname">Surname</label>
                        <input id="surname" type="text" v-model="surname" placeholder="Surname" autocomplete="off">
                    </div>
                    <div>
                        <label for="">Date of Birth</label>
                        <input type="date" v-model="dateOfBirth">
                    </div>
                    <div>
                        <label for="reveal-sensitive-info">
                            <input id="reveal-sensitive-info" type="checkbox" v-model="revealSensitiveInfo"> Reveal Sensitive Info
                        </label>
                    </div>
                </div>
                <div class="basic-demo-route__stores">
                    <div class="basic-demo-route__store">
                        <h3>Main Store</h3>
                        <code-block>{{ mainStateOutput }}</code-block>
                    </div>
                    <div class="basic-demo-route__store">
                        <h3>Settings Store</h3>
                        <code-block>{{ settingsState }}</code-block>
                    </div>
                </div>
                <div class="margin__top--large">
                    <div>
                        <h3>Tips</h3>
                        <ul>
                            <li>To see the Harlem devtools plugin at work, install the Vue devtools (Beta) and open them up on this page to see your changes reflected in the devtools.</li>
                            <li>To see the harlem storage plugin at work, open a copy of this tab side-by-side with the current one and toggle the <em>Reveal Sensitive Info</em> checkbox on and off to see your changes synced across tabs.</li>
                        </ul>
                    </div>
                </div>
            </container>
        </section>
    </main-layout>
</template>

<script lang="ts">
import MainLayout from '../../components/layouts/main.vue';

import {
    defineComponent,
    computed
} from 'vue';

import {
    state as mainState,
    fullName,
    setGivenName,
    setSurname,
    setDateOfBirth
} from '../../stores/main';

import {
    state as settingsState,
    updateSettings
} from '../../stores/settings';

function conceal(value: string | number | Date): string {
    return '*'.repeat(value.toString().length);
}

export default defineComponent({

    components: {
        MainLayout
    },
   
    setup() {
        const mainStateOutput = computed(() => {
           if (settingsState.revealSensitiveInfo) {
               return mainState;
           }

           const {
               surname,
               dateOfBirth
           } = mainState;

           return {
               ...mainState,
               surname: conceal(surname),
               dateOfBirth: conceal(dateOfBirth)
           }
       });

       const givenName = computed({
           get: () => mainState.givenName,
           set: setGivenName
       });

       const surname = computed({
           get: () => mainState.surname,
           set: setSurname
       });

       const dateOfBirth = computed({
           get: () => mainState.dateOfBirth.toISOString().split('T')[0],
           set: value => setDateOfBirth(new Date(value))
       })

       const revealSensitiveInfo = computed({
           get: () => settingsState.revealSensitiveInfo,
           set: revealSensitiveInfo => updateSettings({
               revealSensitiveInfo
           })
       });

       return {
           mainState,
           settingsState,
           mainStateOutput,
           givenName,
           surname,
           dateOfBirth,
           revealSensitiveInfo
       };
   }

});
</script>

<style lang="scss">

    .basic-demo-route__header,
    .basic-demo-route__section {
        padding: var(--spacing__large) var(--spacing__medium);
    }

    .basic-demo-route__header {
        text-align: center;
    }

    .basic-demo-route__form {
        display: grid;
        grid-template-columns: repeat(3, auto);
        gap: var(--spacing__small);

        & label {
            display: block;
            margin-bottom: var(--spacing__x-small);
            font-size: var(--font__size--small);
            font-weight: var(--font__weight--heavy);
        }

        & input:not([type="checkbox"]) {
            display: block;
            width: 100%;
        }
    }

    .basic-demo-route__stores {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--spacing__medium);
    }

    .basic-demo-route__store {
        overflow: hidden;
    }

</style>