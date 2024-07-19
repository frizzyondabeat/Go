export type User = {
    id: string;
    name: string;
    role: 'administrator' | 'sales-manager' | 'sales-representative';
    email: string;
    password?: string;
};
