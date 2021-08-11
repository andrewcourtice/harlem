export type Theme = 'light' | 'dark';
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
    version: number;
    theme: Theme;
    themes: {
        label: string;
        value: Theme;
    }[];
    time: Date;
    timezones: Timezone[];
    clockType: ClockType;
    clockTypes: {
        label: string;
        value: ClockType;
    }[];
    clocks: string[];
}