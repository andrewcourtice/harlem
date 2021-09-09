import type {
    BaseState,
    ReadState,
} from '@harlem/core';

import type {
    ComputedRef,
} from 'vue';

export type InvalidateCallback = (...args: any[]) => void;
export type ComputedAsyncCallback<TResult> = (onInvalidate: InvalidateCallback) => Promise<TResult>;
export type ComputedAsyncResult<TResult> = [value: ComputedRef<TResult>, isEvaluating: ComputedRef<boolean>];
export type LazyBody<TState extends BaseState, TResult> = (state: ReadState<TState>, onInvalidate: InvalidateCallback) => Promise<TResult>;