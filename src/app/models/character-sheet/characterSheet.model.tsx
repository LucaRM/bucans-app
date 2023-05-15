export interface AbilityScore {
    ability: string;
    value: number;
}

export interface Character {
    _id: string;
    name: string;
    level: number;
    class: string;
    abilityScore: AbilityScore[];
}

export const constructorAbilityScore = (): AbilityScore => {
    return {
        ability: "",
        value: 0,
    };
};

export const constructorCharacter = (): Character => {
    return {
        _id: "",
        name: "",
        level: 0,
        class: "",
        abilityScore: [],
    };
};
