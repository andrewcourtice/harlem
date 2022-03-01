export class TaskAbortError extends Error {

    public reason: any;

    constructor(reason?: any) {
        super('Task aborted');
        this.reason = reason;
    }

}