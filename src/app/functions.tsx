export const AbilityScoreGenerator = (): number => {
    let rolls = [];
    for (let j = 0; j < 4; j++) {
        rolls.push(roll("1d6"));
    }
    rolls.sort();
    rolls.shift();
    return rolls.reduce((partialSum, a) => partialSum + a, 0);
};

export const calculateBonus5e = (
    abilityScore: number,
    proficiencyBonus: number,
    proficient?: string
): string => {
    let result = 0;
    result = Math.floor((abilityScore - 10) / 2);

    proficient === "not-proficient"
        ? result
        : proficient === "proficient"
        ? (result = result + proficiencyBonus)
        : proficient === "expertise"
        ? (result = result + 2 * proficiencyBonus)
        : result;

    if (result < 0) {
        return `-${result}`;
    } else return `+${result}`;
};

export const roll = (roll: string): number => {
    let numberOfDice = parseInt(roll.split("d")[0]);
    let sizeOfDice = parseInt(roll.split("d")[1]);
    let Positivebonus = parseInt(roll.split("+")[1]);
    let negativeBonus = parseInt(roll.split("-")[1]);
    let sum = 0;
    for (let i = 0; i < numberOfDice; i++) {
        sum += Math.floor(Math.random() * sizeOfDice) + 1;
    }
    if (Positivebonus) {
        sum += Positivebonus;
    }
    if (negativeBonus) {
        sum -= negativeBonus;
    }
    if (sum < 0) {
        sum = 0;
    }
    return sum;
};

export const getProficiencyBonus = (level: number) => {
    return level <= 4
        ? 2
        : level <= 8
        ? 3
        : level <= 12
        ? 4
        : level <= 16
        ? 5
        : 6;
};
