export interface Character {
    _id?: string;
    user: string;
    name: string;
    level: number;
    class: string;
    abilityScore: AbilityScoreGeneric;
}

export interface AbilityScore5e {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
}

export interface AbilityScoreGeneric {
    [key: string]: number;
}

export const constructorCharacter5e = (): Character => {
    return {
        _id: "",
        user: "",
        name: "",
        level: 0,
        class: "",
        abilityScore: {
            strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0,
        },
    };
};
