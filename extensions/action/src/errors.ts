export class ActionAbortError extends Error {
    public name: string;
    public instanceId: symbol;

    constructor(name: string, instanceId: symbol) {
        super(`Action ${name} as been cancelled`);

        this.name = name;
        this.instanceId = instanceId;
    }
}