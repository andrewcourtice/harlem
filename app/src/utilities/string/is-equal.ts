export default function isEqual(valueA: string, valueB: string): boolean {
    return valueA.toLocaleLowerCase().includes(valueB.toLocaleLowerCase());
}