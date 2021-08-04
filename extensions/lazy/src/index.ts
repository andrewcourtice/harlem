import type {
    InternalStore,
    BaseState,
} from '@harlem/core';

import {
    ref,
    watchEffect,
    Ref,
    computed,
} from 'vue';

import type {
    ComputedAsyncResult,
    ComputedAsyncCallback,
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

        function lazy<TResult>(name: string, body: LazyBody<TState, TResult>, defaultValue?: TResult) {
            return computedAsync(async onInvalidate => body(store.state, onInvalidate), defaultValue);
        }

        return {
            lazy,
        };
    };
}