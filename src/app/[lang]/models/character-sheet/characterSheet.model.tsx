export interface Character {
    _id?: string;
    user: string;
    system: string;
    name: string;
    level: number;
    class: string;
    abilityScores: AbilityScore;
    skills: Skill[];
    savingThrows: SavingThrow;
}

export interface AbilityScore {
    [key: string]: number;
}

export interface SavingThrow {
    [key: string]: string;
}

export interface Skill {
    name: string;
    proficiency: string;
    ability: string;
    order: string;
    addon: boolean;
}

export const constructorCharacter5e = (): Character => {
    return {
        _id: "",
        user: "",
        system: "",
        name: "",
        level: 0,
        class: "",
        abilityScores: {},
        skills: [],
        savingThrows: {},
    };
};
