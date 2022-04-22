import {
    SENDER,
} from './constants';

import {
    BaseState,
    EVENTS,
    InternalStore,
} from '@harlem/core';

import {
    computed,
    nextTick,
    ref,
    Ref,
    watchEffect,
} from 'vue';

import type {
    ComputedAsyncCallback,
    ComputedAsyncResult,
    LazyBody,
} from './types';

export * from './types';

export default function lazyExtension<TState extends BaseState>() {

    function computedAsync<TResult>(callback: ComputedAsyncCallback<TResult>): ComputedAsyncResult<TResult | undefined>;
    function computedAsync<TResult>(callback: ComputedAsyncCallback<TResult>, defaultValue: TResult): ComputedAsyncResult<TResult>;
    function computedAsync<TResult>(callback: ComputedAsyncCallback<TResult>, defaultValue?: TResult): ComputedAsyncResult<TResult | undefined> {
        const value = ref(defaultValue) as Ref<TResult | undefined>;
        const isEvaluating = ref(false);

        watchEffect(async onInvalidate => {
            Promise.resolve().then(() => {
                isEvaluating.value = true;
            });

            try {
                value.value = await callback(onInvalidate);
            } finally {
                isEvaluating.value = false;
            }
        });

        return [
            computed(() => value.value),
            computed(() => isEvaluating.value),
        ];
    }

    return (store: InternalStore<TState>) => {
        store.register('extensions', 'lazy', () => ({}));

        function lazy<TResult>(name: string, body: LazyBody<TState, TResult>, defaultValue?: TResult) {
            const output = store.track(() => computedAsync(async onInvalidate => {
                const result = await body(store.state, onInvalidate);

                nextTick(() => store.emit(EVENTS.devtools.update, SENDER, result));

                return result;
            }, defaultValue));

            store.register('lazy', name, () => output[0].value, 'computed');

            return output;
        }

        return {
            lazy,
        };
    };
}