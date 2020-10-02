import type {
    EventListener
} from '../interfaces';

export class EventEmitter {

    private listeners: {
        [key: string]: Function[]
    };

    constructor() {
        this.listeners = {};
    }

    public on(event: string, handler: Function): EventListener {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(handler);

        return {
            dispose: () => this.off(event, handler)
        };
    }

    public off(event: string, handler: Function): void {
        const listeners = this.listeners[event];

        if (!listeners) {
            return;
        }

        this.listeners[event] = listeners.filter(listener => listener !== handler);

        if (this.listeners[event].length === 0) {
            delete this.listeners[event];
        }
    }

    public once(event: string, handler: Function): EventListener {
        const callback = (...args: any[]) => {
            handler(...args);
            this.off(event, callback);
        };

        return this.on(event, callback);
    }

    public emit(event: string, ...args: any[]) {
        const handlers = this.listeners[event];

        if (!handlers) {
            return;
        }

        handlers.forEach(handler => handler(...args));
    }

}

export default new EventEmitter();