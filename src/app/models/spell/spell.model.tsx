export interface Spell {
    _id?: string;
    system: string;
    sourceBook: string;
    magicSource?: string;
    name: string;
    level: string;
    duration: string;
    castingAction: string;
    school: string;
    range: string;
    attackType: string;
    savingThrow: string;
    components: string;
    damageType: string;
    effect: string;
    description: string;
    dice: string;
    targets: string;
    image: string;
}

export const constructorSpell = (): Spell => {
    return {
        _id: "",
        system: "",
        sourceBook: "",
        name: "",
        level: "",
        duration: "",
        castingAction: "",
        school: "",
        range: "",
        attackType: "",
        savingThrow: "",
        components: "",
        damageType: "",
        effect: "",
        description: "",
        dice: "",
        targets: "",
        image: "",
    };
};
