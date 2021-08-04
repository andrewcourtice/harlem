import {
    EVENTS,
    BaseState,
    EventPayload,
    InternalStore,
    MutationEventData,
} from '@harlem/core';

import type {
    Options,
} from './types';

export * from './types';

export default function storageExtension<TState extends BaseState>(options?: Partial<Options<TState>>) {
    const {
        type,
        prefix,
        sync,
        serialiser,
        parser,
    } = {
        type: 'local',
        prefix: 'harlem',
        sync: true,
        serialiser: state => JSON.stringify(state),
        parser: value => JSON.parse(value),
        ...options,
    } as Options<TState>;

    const storage = type === 'session' ? sessionStorage : localStorage;

    return (store: InternalStore<TState>) => {
        const storageKey = prefix ? `${prefix}:${store.name}` : store.name;

        store.on(EVENTS.mutation.after, (event?: EventPayload<MutationEventData>) => {
            if (!event || event.data.mutation === '$storage') {
                return;
            }

            try {
                storage.setItem(storageKey, serialiser(store.state));
            } catch {
                console.warn('Failed to write to storage');
            }
        });

        if (!sync) {
            return {};
        }

        const write = store.mutation('$storage', (state, value: string) => Object.assign(state, parser(value)));

        const listener = ({ key, storageArea, newValue }: StorageEvent) => {
            console.log(key, newValue);
            if (storageArea === storage && key === storageKey && newValue) {
                write(newValue);
            }
        };

        window.addEventListener('storage', listener);
        store.on(EVENTS.store.destroyed, () => window.removeEventListener('storage', listener));

        return {};
    };
}