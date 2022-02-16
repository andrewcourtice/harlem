export class ActionAbortError extends Error {
    public name: string;
    public instanceId: symbol;
    public reason?: unknown;

    constructor(name: string, instanceId: symbol, reason: unknown = 'unknown') {
        super(`Action ${name} as been cancelled. Reason: ${reason}`);

        this.name = name;
        this.instanceId = instanceId;
        this.reason = reason;
    }
}