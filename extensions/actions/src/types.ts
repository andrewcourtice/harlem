import type {
    Mutator
} from '@harlem/core';

import type {
    Task,
    TaskAbortCallback
} from '@harlem/utilities';

export type ActionBody<TState, TPayload = undefined, TResult = void> = (payload: TPayload, mutator: (mutate: Mutator<TState, undefined, void>) => void, controller: AbortController, onAbort: (callback: TaskAbortCallback) => void) => Promise<TResult>;
export type Action<TPayload, TResult = void> = undefined extends TPayload ? (payload?: TPayload, controller?: AbortController) => Task<TResult> : (payload: TPayload, controller?: AbortController) => Task<TResult>;
export type ActionPredicate<TPayload = unknown> = (payload?: TPayload) => boolean;
export type ComposedAction<TPayload, TResult = void> = [Action<TPayload, TResult>, (predicate: ActionPredicate<TPayload>) => boolean];

export interface ActionTaskState {
    runCount: number;
    instances: Map<symbol, unknown>;
}

export interface ActionStoreState {
    $actions: Record<string, ActionTaskState>;
}

export interface ActionOptions {
    parallel: boolean;
}

export interface AddActionInstancePayload {
    actionName: string;
    instanceId: symbol;
    instancePayload?: unknown;
}

export interface RemoveActionInstancePayload {
    actionName: string;
    instanceId: symbol;
}