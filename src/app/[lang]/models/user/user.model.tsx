export interface User {
    _id?: string;
    name: string;
    email: string;
    password: string;
}

export const constructorUser = (): User => {
    return {
        _id: "",
        name: "",
        email: "",
        password: "",
    };
};
