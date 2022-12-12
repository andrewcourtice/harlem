import type {
    BaseState,
    Mutator,
} from '@harlem/core';

import Task, {
    TaskAbortCallback,
} from '@harlem/task';

export type ActionBody<TState extends BaseState, TPayload = undefined, TResult = void> = (payload: TPayload, mutator: (mutate: Mutator<TState, undefined, void>) => void, controller: AbortController, onAbort: (callback: TaskAbortCallback) => void) => Promise<TResult>;
export type Action<TPayload, TResult = void> = undefined extends TPayload ? (payload?: TPayload, controller?: AbortController) => Task<TResult> : (payload: TPayload, controller?: AbortController) => Task<TResult>;
export type ActionPredicate<TPayload = unknown> = (payload?: TPayload) => boolean;
export type ActionAbortStrategy = (name: string, id: symbol, resolve: (value?: any) => void, reject: (reason?: unknown) => void, reason?: unknown) => void;

export interface Options {
    strategies: ActionStrategies;
    concurrent: boolean | ((payload: unknown, runningPayloads: unknown[]) => boolean);
}

export interface ActionStrategies {
    abort: ActionAbortStrategy;
}

export interface ActionAbortStrategies {
    error: ActionAbortStrategy;
    warn: ActionAbortStrategy;
}

export interface ActionState<TPayload = unknown> {
    runCount: number;
    instances: Map<symbol, TPayload>;
    errors: Map<symbol, unknown>;
}

export interface ActionOptions<TPayload> {
    concurrent: boolean | ((payload: TPayload, runningPayloads: TPayload[]) => boolean);
    autoClearErrors: boolean;
    suppressAbortErrors: boolean;
    strategies: ActionStrategies;
}