import type {
    EventBus,
    EventHandler,
    EventPayload,
} from './types';

import type {
    Disposable,
} from '@harlem/utilities';

export default function createEventBus(): EventBus {

    const listeners = new Map<string, Set<EventHandler>>();

    function on(event: string, handler: EventHandler): Disposable {
        const handlers = listeners.get(event) || new Set();

        handlers.add(handler);
        listeners.set(event, handlers);

        return {
            dispose: () => off(event, handler),
        };
    }

    function off(event: string, handler: EventHandler): void {
        const handlers = listeners.get(event);

        if (!handlers) {
            return;
        }

        handlers.delete(handler);

        if (!handlers.size) {
            listeners.delete(event);
        }
    }

    function once(event: string, handler: EventHandler): Disposable {
        const callback = (payload?: EventPayload) => {
            handler(payload);
            off(event, callback);
        };

        return on(event, callback);
    }

    function emit(event: string, payload?: EventPayload): void {
        const handlers = listeners.get(event);

        if (handlers) {
            handlers.forEach(handler => handler(payload));
        }
    }

    return {
        on,
        off,
        once,
        emit,
    };
}