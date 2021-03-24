export interface UserDetails {
    firstName: string;
    lastName: string;
    email: string | null;
    dateOfBirth: Date | null;
}

export interface State {
    id: number;
    details: UserDetails;
}