import clamp from './clamp';

export default function scale(
    domain: [min: number, max: number],
    range: [min: number, max: number]
) {
    const [
        domainMin,
        domainMax,
    ] = domain;

    const [
        rangeMin,
        rangeMax,
    ] = range;

    const domainLength = domainMax - domainMin;
    const rangeLength = rangeMax - rangeMin;

    return (value: number, clampValue?: boolean) => {
        const output = (value - domainMin) * rangeLength / domainLength + rangeMin;
        return clampValue ? clamp(output, rangeMin, rangeMax) : output;
    };
}