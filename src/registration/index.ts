import eventEmitter from '../event-emitter';

import type {
    ReadState,
    RegistrationEvent
} from '../interfaces';

export default class StoreRegistration<T = any> {

    private name: string;
    private state: () => ReadState<T>;
    private getters: Set<string>;
    private mutations: Set<string>;

    constructor(name: string, state: ReadState<T>) {
        this.name = name;

        this.state = () => state;
        this.getters = new Set();
        this.mutations = new Set();
    }

    public registerGetter(name: string): void {
        if (this.getters.has(name)) {
            throw new Error(`A getter named: ${name} has already been registered.`);
        }

        this.getters.add(name);
    }

    public registerMutation(name: string): void {
        if (this.mutations.has(name)) {
            throw new Error(`A mutation named: ${name} has already been registered.`);
        }

        this.mutations.add(name);
    }

    public log(event: RegistrationEvent, ...args: any[]): void {
        eventEmitter.emit(event, this.name, ...args);
    }

}