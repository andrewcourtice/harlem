import composeExtension from '@harlem/extension-compose';
import storageExtension from '@harlem/extension-storage';
import resetExtension from '@harlem/extension-reset';

export const {
    state,
    getter,
    reset,
    computeState,
} = createStore('app', {
    firstName: 'John',
    lastName: 'Smith',
}, {
    extensions: [
        composeExtension(),
        storageExtension({
            prefix: 'nuxt',
            restore: true,
        }),
        resetExtension(), // order is important!
    ],
});

export const fullName = getter('fullname', ({ firstName, lastName }) => `${firstName} ${lastName}`);