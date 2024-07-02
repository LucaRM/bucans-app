export interface Roll {
    roll: string;
    dice: number;
    result: number;
}

export const roll = (): Roll => {
    return {
        roll: "",
        dice: 0,
        result: 0,
    };
};
