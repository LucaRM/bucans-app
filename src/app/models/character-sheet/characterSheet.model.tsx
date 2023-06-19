export interface Character {
    _id?: string;
    user: string;
    system: string;
    name: string;
    level: number;
    class: string;
    abilityScore: AbilityScoreGeneric;
    skills: Skill[];
}

export interface AbilityScoreGeneric {
    [key: string]: number;
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
        abilityScore: {},
        skills: [],
    };
};
