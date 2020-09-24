export type User = {
    _id: string;
    username: string;
    isAdmin: boolean;
    isSuperAdmin: boolean;
    fullName: string;
    phone?: string;
    email: string;
    dpaAccepted?: Date;
};
