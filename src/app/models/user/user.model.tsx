export interface User {
    _id: string;
    name: string;
    email: string;
}

export const constructorUser = (): User => {
    return {
        _id: "",
        name: "",
        email: "",
    };
};
