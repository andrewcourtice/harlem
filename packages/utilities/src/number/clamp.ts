export default function clamp(lower: number, upper: number, value: number) {
    return Math.max(lower, Math.min(upper, value));
}