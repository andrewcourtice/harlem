import {
    getter,
} from './store';

export const fullName = getter('fullname', ({ details }) => `${details.firstName} ${details.lastName}`);

export const age = getter('age', ({ details }) => {
    const dob = details.dateOfBirth || new Date();
    const currentYear = (new Date()).getFullYear();
    const birthYear = dob.getFullYear();

    return currentYear - birthYear;
});