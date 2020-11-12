export interface User {
    id: number;
    firstname: string;
    lastname: string;
    login: string;
    password: string;
    status: string;
    save?: boolean;
}
