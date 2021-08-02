export interface Snapshot<TState> {
    state: Readonly<TState>;
    apply(): void;
}