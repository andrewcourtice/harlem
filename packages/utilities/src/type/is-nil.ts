/* eslint-disable eqeqeq */
export default function isNil(value: unknown): value is null | undefined {
    return value == null;
}