import createEventBus from '../src/event-emitter';

import {
    createStore,
    createVuePlugin,
} from '../src';

import {
    App,
    isRef,
    Plugin,
    ref,
} from 'vue';

import {
    afterEach,
    beforeAll,
    describe,
    expect,
    test,
    vi,
} from 'vitest';

import {
    sleep,
} from '@harlem/testing';

function getId() {
    return Math.round(Math.random() * 100000);
}

function getStore() {
    const {
        getter,
        mutation,
        action,
        ...store
    } = createStore('main', {
        id: 0,
        details: {
            firstName: 'John',
            lastName: 'Smith',
        },
        traits: null,
    }, {
        allowsOverwrite: false,
    });

    const fullName = getter('fullname', ({ details }) => `${details.firstName} ${details.lastName}`);

    const setId = mutation('set-id', (state, payload: number | undefined) => {
        const id = payload || getId();

        state.id = id;
        return id;
    });

    const setDetails = mutation('set-details', (state, payload: Partial<typeof state.details>) => {
        state.details = {
            ...state.details,
            ...payload,
        };
    });

    return {
        getter,
        mutation,
        action,
        fullName,
        setId,
        setDetails,
        ...store,
    };
}

describe('Harlem Core', () => {

    let store = getStore();

    beforeAll(() => {
        const app = {
            use: (plugin: Plugin, options?: any) => {
                if (plugin && plugin.install){
                    plugin.install(app, options);
                }
            },
        } as App;

        app.use(createVuePlugin());
    });

    afterEach(() => {
        store?.destroy();
        store = getStore();
    });

    describe('Event Emitter', () => {

        test('Should handle on, once and emit', () => {
            const eventBus = createEventBus();

            const eventName = 'test-event';
            const onListener = vi.fn();
            const onceListener = vi.fn();

            const listeners = [
                eventBus.on(eventName, onListener),
                eventBus.once(eventName, onceListener),
            ];

            eventBus.emit(eventName);
            eventBus.emit(eventName);

            expect(onListener).toHaveBeenCalledTimes(2);
            expect(onceListener).toHaveBeenCalledTimes(1);

            listeners.forEach(({ dispose }) => dispose());
        });

    });

    describe('Store', () => {

        test('Should prevent duplicate creation of store objects', () => {
            const {
                getter,
                mutation,
            } = store;

            const duplicates = [
                () => createStore('main', {}),
                () => getter('fullname', () => {}),
                () => mutation('set-details', () => {}),
            ];

            duplicates.forEach(invokee => {
                expect(() => invokee()).toThrow();
            });
        });

        test('Should prevent changes after being destroyed', () => {
            const {
                setId,
                destroy,
            } = store;

            destroy();

            expect(() => setId()).toThrow();
        });

    });

    describe('State', () => {

        test('Should be populated', () => {
            const {
                state,
            } = store;

            expect(state).toHaveProperty('id');
            expect(state).toHaveProperty('details');
            expect(state.details).toHaveProperty('firstName');
            expect(state.details).toHaveProperty('lastName');
        });

        test('Should be readonly', () => {
            const {
                state,
            } = store;

            vi.spyOn(console, 'warn').getMockImplementation();

            // @ts-expect-error This is readonly
            state.details.firstName = 'Billy';

            expect(state.details.firstName).toBe('John');
            expect(console.warn).toHaveBeenCalledWith(
                expect.stringContaining('target is readonly'),
                expect.anything()
            );
        });

    });

    describe('Getters', () => {

        test('Should be populated', () => {
            const {
                fullName,
            } = store;

            expect(fullName.value).toBe('John Smith');
        });

    });

    describe('Mutations', () => {

        test('Should correctly mutate state', () => {
            const {
                state,
                setDetails,
            } = store;

            setDetails({
                firstName: 'Jane',
                lastName: 'Doe',
            });

            expect(state.details.firstName).toBe('Jane');
            expect(state.details.lastName).toBe('Doe');
        });

        test('Should return a result from a mutation', () => {
            const {
                setId,
            } = store;

            const id = setId();

            expect(id).toBeDefined();
            expect(typeof id).toBe('number');
        });

        test('Should detect a circular reference', () => {
            const {
                mutation,
            } = store;

            let circularParent = () => {};
            let circularChild = () => {};

            circularParent = mutation('circular-parent', () => circularChild());
            circularChild = mutation('circular-child', () => circularParent());

            expect(() => circularParent()).toThrow();
        });

    });

    describe('Actions', () => {

        test('Should run a basic action', async () => {
            expect.assertions(3);

            const {
                state,
                action,
            } = store;

            const loadDetails = action('load-details', async (id: number, mutate) => {
                await sleep();

                mutate(state => {
                    state.id = id;
                    state.details = {
                        firstName: 'Jane',
                        lastName: 'Doe',
                    };
                });
            });

            await loadDetails(51);

            expect(state.id).toBe(51);
            expect(state.details.firstName).toBe('Jane');
            expect(state.details.lastName).toBe('Doe');
        });

        test('Should return a result from an action', async () => {
            expect.assertions(3);

            const {
                state,
                action,
            } = store;

            const loadDetails = action('load-details', async (_, mutate) => {
                const id = getId();

                await sleep();

                mutate(state => {
                    state.id = id;
                    state.details = {
                        firstName: 'Jane',
                        lastName: 'Doe',
                    };
                });

                return id;
            });

            const id = await loadDetails();

            expect(id).toBeTypeOf('number');
            expect(state.details.firstName).toBe('Jane');
            expect(state.details.lastName).toBe('Doe');
        });

    });

    describe('Triggers', () => {

        test('Should run correctly for all valid hooks', () => {
            const {
                mutation,
                onBeforeMutation,
                onAfterMutation,
                onMutationSuccess,
                onMutationError,
            } = store;

            const name = 'test-mutation';
            const beforeTrigger = vi.fn();
            const afterTrigger = vi.fn();
            const successTrigger = vi.fn();
            const errorTrigger = vi.fn();

            const testMutation = mutation(name, (state, throwError: boolean) => {
                if (throwError) {
                    throw new Error('failed');
                }
            });

            const listeners = [
                onBeforeMutation(name, beforeTrigger),
                onAfterMutation(name, afterTrigger),
                onMutationSuccess(name, successTrigger),
                onMutationError(name, errorTrigger),
            ];

            const run = (throwError: boolean) => {
                try {
                    testMutation(throwError);
                } catch {
                    // do nothing
                }
            };

            run(true);
            run(false);

            expect(beforeTrigger).toHaveBeenCalledTimes(2);
            expect(afterTrigger).toHaveBeenCalledTimes(2);
            expect(errorTrigger).toHaveBeenCalledTimes(1);
            expect(successTrigger).toHaveBeenCalledTimes(1);

            listeners.forEach(({ dispose }) => dispose());
        });

        test('Should not fire if events are suppressed', () => {
            const {
                suppress,
                setId,
                onAfterMutation,
            } = store;

            const handler = vi.fn();

            const {
                dispose,
            } = onAfterMutation('set-id', handler);

            suppress(() => setId());

            expect(handler).not.toHaveBeenCalled();
            dispose();
        });

    });

    describe('Producers', () => {

        test('Should clean payloads by default', () => {
            const {
                state,
                mutation,
            } = store;

            const payload = {
                firstName: ref('Jim'),
            };

            const setRefToState = mutation<typeof payload>('set-ref-to-state', (state, { firstName }) => {
                state.details.firstName = firstName as unknown as string;
            });

            setRefToState(payload);

            expect(isRef(state.details.firstName)).toBe(false);
            expect(state.details.firstName).toBe('Jim');
        });

    });

    describe('Snapshots', () => {

        test('Should apply a snapshot', () => {
            const {
                state,
                snapshot,
                setId,
                setDetails,
            } = store;

            setId(5);
            setDetails({
                firstName: 'Jane',
                lastName: 'Doe',
            });

            const snap = snapshot();

            setId(7);
            setDetails({
                firstName: 'James',
                lastName: 'Halpert',
            });

            expect(state.id).toBe(7);
            expect(state.details.firstName).toBe('James');
            expect(state.details.lastName).toBe('Halpert');

            snap.apply();

            expect(state.id).toBe(5);
            expect(state.details.firstName).toBe('Jane');
            expect(state.details.lastName).toBe('Doe');
        });

        test('Should apply a partial snapshot', () => {
            const {
                state,
                setId,
                setDetails,
                snapshot,
            } = store;

            setId(5);
            setDetails({
                firstName: 'Jane',
                lastName: 'Doe',
            });

            const snap = snapshot();

            setId(7);
            setDetails({
                firstName: 'James',
                lastName: 'Halpert',
            });

            expect(state.id).toBe(7);
            expect(state.details.firstName).toBe('James');
            expect(state.details.lastName).toBe('Halpert');

            snap.apply(state => state.details);

            expect(state.id).toBe(7);
            expect(state.details.firstName).toBe('Jane');
            expect(state.details.lastName).toBe('Doe');
        });

    });

    describe('Resets', () => {

        test('Should perform a basic reset', async () => {
            const {
                state,
                reset,
                setId,
                setDetails,
            } = store;

            setId(5);
            setDetails({
                firstName: 'Jane',
                lastName: 'Doe',
            });

            expect(state.id).toBe(5);
            expect(state.details.firstName).toBe('Jane');
            expect(state.details.lastName).toBe('Doe');

            reset();

            expect(state.id).toBe(0);
            expect(state.details.firstName).toBe('John');
            expect(state.details.lastName).toBe('Smith');
        });

        test('Should perform a partial reset', () => {
            const {
                reset,
                state,
                setId,
                setDetails,
            } = store;

            setId(7);
            setDetails({
                firstName: 'Jane',
                lastName: 'Doe',
            });

            expect(state.id).toBe(7);
            expect(state.details.firstName).toBe('Jane');
            expect(state.details.lastName).toBe('Doe');

            reset(state => state.details.firstName);
            expect(state.details.firstName).toBe('John');

            reset(state => state.details);
            expect(state.id).toBe(7);
            expect(state.details.firstName).toBe('John');
            expect(state.details.lastName).toBe('Smith');
        });

        test('Should fail on null values', () => {
            const {
                reset,
                mutation,
            } = store;

            const thing = mutation('thing', state => state.traits = {
                hair: 'brown',
            });

            thing();
            expect(() => reset(state => state.traits.hair)).toThrow();
        });

    });

});