import type {
    HookHandler,
    HookPayloads,
    Hooks,
} from '@vue/devtools-api';

export type TreeHookHandler = HookHandler<HookPayloads[Hooks.GET_INSPECTOR_TREE], any>;
export type StateHookHandler = HookHandler<HookPayloads[Hooks.GET_INSPECTOR_STATE], any>;
export type EditHookHandler = HookHandler<HookPayloads[Hooks.EDIT_INSPECTOR_STATE], any>;

export type LogType = 'default' | 'warning' | 'error';

export interface Options {
    label: string;
    color: number;
}