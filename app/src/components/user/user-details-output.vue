<template>
    <div class="user-details-output">
        <div>
            <strong>ID:</strong><span>{{ state.id }}</span>
        </div>
        <div>
            <strong>Name:</strong><span>{{ fullName }}</span>
        </div>
        <div>
            <strong>Age:</strong><span>{{ age }}</span>
        </div>
        <div>
            <strong>Email:</strong><span>{{ state.details.email }}</span>
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent
} from 'vue';

import {
    state,
    fullName,
    age
} from '../../stores/user';

export default defineComponent({

    setup() {
        return {
            state,
            fullName,
            age
        };
    }

});
</script>