import scale from '../number/scale';

const hourScale = scale([0, 12], [0, 360]);
const minSecScale = scale([0, 60], [0, 360]);
const relativeMinSecScale = scale([0, 60], [0, 1]);

export function getHourRotation(hours: number, minutes: number = 0) {
    return hourScale(hours + relativeMinSecScale(minutes));
}

export function getMinuteRotation(minutes: number, seconds: number= 0) {
    return minSecScale(minutes + relativeMinSecScale(seconds));
}

export function getSecondRotation(seconds: number) {
    return minSecScale(seconds);
}