export default function isEqual(a: string, b: string): boolean {
    return a.toLocaleLowerCase().includes(b.toLocaleLowerCase());
}