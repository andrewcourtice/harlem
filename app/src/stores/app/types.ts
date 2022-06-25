export type Theme = 'light' | 'dark';
export type ClockType = 'analogue' | 'digital';
export type Timezone = typeof import('../../assets/data/timezones.json')[number];

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