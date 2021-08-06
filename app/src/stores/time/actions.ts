import {
    action,
} from './store';

export const loadTimezones = action('load-timezones', async (_, mutate) => {
    const {
        default: timezones,
    } = await import('../../assets/data/timezones.json');

    mutate(state => state.timezones = timezones);
});