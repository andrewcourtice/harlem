export default function getTimezoneLabel(timezone: string): string {
    return (timezone.split('/').pop() ?? '')?.replace('_', ' ') ?? timezone;
}