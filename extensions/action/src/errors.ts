import {
    getAbortMessage,
} from './utilities';

export class ActionAbortError extends Error {
    public name: string;
    public instanceId: symbol;
    public reason?: unknown;

    constructor(name: string, instanceId: symbol, reason?: unknown) {
        super(getAbortMessage(name, reason));

        this.name = name;
        this.instanceId = instanceId;
        this.reason = reason;
    }
}