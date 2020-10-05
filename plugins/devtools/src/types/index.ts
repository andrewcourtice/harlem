import type {
    HookHandler,
    HookPayloads,
    Hooks
} from '@vue/devtools-api';

export type TreeHookHandler = HookHandler<HookPayloads[Hooks.GET_INSPECTOR_TREE], any>;
export type StateHookHandler = HookHandler<HookPayloads[Hooks.GET_INSPECTOR_STATE], any>;

export interface Options {
    label: string;
}