export type ClockType = 'analogue' | 'digital';

export interface Timezone {
    value: string;
    abbr: string;
    offset: number;
    isdst: boolean;
    text: string;
    utc: string[];
}

export interface State {
    time: Date;
    timezones: Timezone[];
    clockType: ClockType;
    clockTypes: {
        label: string;
        value: ClockType;
    }[];
    clocks: string[];
}