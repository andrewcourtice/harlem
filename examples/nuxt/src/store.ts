import actionExtension from '@harlem/extension-action';
import composeExtension from '@harlem/extension-compose';
import storageExtension from '@harlem/extension-storage';
import resetExtension from '@harlem/extension-reset';

export const {
    state,
    getter,
    action,
    reset,
    computeState,
} = createStore('app', {
    firstName: 'John',
    lastName: 'Smith',
}, {
    extensions: [
        actionExtension(),
        composeExtension(),
        storageExtension({
            prefix: 'nuxt',
            restore: true,
        }),
        resetExtension(), // order is important!
    ],
});

export const fullName = getter('fullname', ({ firstName, lastName }) => `${firstName} ${lastName}`);

export const loadDetails = action('load-details', async (_, mutate) => {
    return new Promise(resolve => {
        setTimeout(() => {
            mutate(state => {
                state.firstName = 'Jane';
                state.lastName = 'Doe';
            });

            resolve(true);
        }, 3000);
    });
});