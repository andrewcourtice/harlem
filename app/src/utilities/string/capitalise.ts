export default function capitalise(value: string): string {
    return value.replace(/^(.)|\s+(.)/g, char => char.toUpperCase());
}