export default function clamp(value: number, lower: number, upper: number) {
    return Math.max(lower, Math.min(upper, value));
}