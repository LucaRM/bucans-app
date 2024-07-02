export interface Roll {
    roll: string;
    result: number;
}

export const roll = (): Roll => {
    return {
        roll: "",
        result: 0,
    };
};
