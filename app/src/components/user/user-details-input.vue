<template>
    <div class="user-details-input">
        <div>
            <label for="">First Name</label>
            <input type="text" v-model="firstName">
        </div>
        <div>
            <label for="">Last Name</label>
            <input type="text" v-model="lastName">
        </div>
        <div>
            <label for="">Email Address</label>
            <input type="email" v-model="email">
        </div>
        <div>
            <label for="">Date of Birth</label>
            <input type="date" v-model="dateOfBirth">
        </div>
        <div>
            <button @click="reset()">Reset</button>
        </div>
    </div>
</template>

<script lang="ts">
import {
    computed,
    defineComponent
} from 'vue';

import {
    state,
    reset,
    setUserDetails
} from '../../stores/user';

export default defineComponent({

    setup() {
        const firstName = computed({
            get: () => state.details.firstName,
            set: firstName => setUserDetails({ firstName })
        });

        const lastName = computed({
            get: () => state.details.lastName,
            set: lastName => setUserDetails({ lastName })
        });

        const email = computed({
            get: () => state.details.email,
            set: email => setUserDetails({ email })
        });

        const dateOfBirth = computed({
            get: () => state.details.dateOfBirth?.toISOString().split('T')[0],
            set: dob => setUserDetails({ dateOfBirth: new Date(dob) })
        });

        return {
            firstName,
            lastName,
            email,
            dateOfBirth,
            reset
        };
    }

});
</script>