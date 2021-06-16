export type ActionBody<TPayload, TResult = void> = undefined extends TPayload ? (payload?: TPayload) => Promise<TResult> : (payload: TPayload) => Promise<TResult>;
//export type Action<TPayload, TResult = void> = undefined extends TPayload ? (payload?: TPayload) => Promise<TResult> : (payload: TPayload) => Promise<TResult>;
export type ActionPredicate<TPayload = any> = (payload?: TPayload) => boolean;
export type ComposedAction<TPayload, TResult = void> = [Action<TPayload, TResult>, (predicate: ActionPredicate<TPayload>) => boolean];

export interface Action<TPayload, TResult = void> {
    (payload?: TPayload): Promise<TResult>;
    name: string
}

export interface ActionStoreState {
    $actions: {
        [key: string]: Map<symbol, any>;
    }
}

export interface AddActionInstancePayload {
    actionName: string;
    instanceId: symbol;
    instancePayload?: any;
}

export interface RemoveActionInstancePayload {
    actionName: string;
    instanceId: symbol;
}