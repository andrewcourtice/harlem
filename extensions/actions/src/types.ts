import {
    Mutator
} from '../../../core/dist';

export type ActionBody<TState, TPayload = undefined, TResult = void> = (payload: TPayload, mutator: (mutate: Mutator<TState, undefined, void>) => void) => Promise<TResult>;
export type Action<TPayload, TResult = void> = undefined extends TPayload ? (payload?: TPayload) => Promise<TResult> : (payload: TPayload) => Promise<TResult>;
export type ActionPredicate<TPayload = unknown> = (payload?: TPayload) => boolean;
export type ComposedAction<TPayload, TResult = void> = [Action<TPayload, TResult>, (predicate: ActionPredicate<TPayload>) => boolean];

export interface ActionStoreState {
    $actions: Record<string, Map<symbol, unknown>>;
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