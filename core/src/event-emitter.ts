import type {
    Emittable,
    EventHandler,
    EventListener,
    EventPayload,
} from './types';

export class EventEmitter implements Emittable {

    private listeners: Record<string, EventHandler[]>;

    constructor() {
        this.listeners = {};
    }

    public on(event: string, handler: EventHandler): EventListener {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(handler);

        return {
            dispose: () => this.off(event, handler),
        };
    }

    public off(event: string, handler: EventHandler): void {
        const listeners = this.listeners[event];

        if (!listeners) {
            return;
        }

        this.listeners[event] = listeners.filter(listener => listener !== handler);

        if (this.listeners[event].length === 0) {
            delete this.listeners[event];
        }
    }

    public once(event: string, handler: EventHandler): EventListener {
        const callback = (payload?: EventPayload) => {
            handler(payload);
            this.off(event, callback);
        };

        return this.on(event, callback);
    }

    public emit(event: string, payload?: EventPayload): void {
        const handlers = this.listeners[event];

        if (!handlers) {
            return;
        }

        handlers.forEach(handler => handler(payload));
    }

}

export default new EventEmitter();