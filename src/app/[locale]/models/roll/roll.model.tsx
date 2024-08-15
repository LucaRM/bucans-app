export interface Roll {
    roll: string;
    dice: number;
    result: number;
    description: string;
}

export const roll = (): Roll => {
    return {
        roll: "",
        dice: 0,
        result: 0,
        description: "",
    };
};
