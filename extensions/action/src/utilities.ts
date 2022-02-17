export function getAbortMessage(name: string, reason: unknown) {
    return `Action ${name} has been cancelled. Reason: ${reason || 'unknown'}`;
}