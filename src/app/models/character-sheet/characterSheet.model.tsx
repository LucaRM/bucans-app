export interface AbilityScore {
    ability: string;
    value: number;
}

export const constructorAbilityScore = (): AbilityScore => {
    return {
        ability: "",
        value: 0,
    };
};
