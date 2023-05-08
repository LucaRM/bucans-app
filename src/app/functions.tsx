import {AbilityScore} from "./models/character-sheet/characterSheet.model";

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
    } else if (negativeBonus) {
        sum -= negativeBonus;
    }
    return sum;
};

export const AbilityScoreGenerator = (): number => {
    let rolls = [];
    for (let j = 0; j < 4; j++) {
        rolls.push(roll("1d6"));
    }
    rolls.sort();
    rolls.shift();
    return rolls.reduce((partialSum, a) => partialSum + a, 0);
};

export const calculateModifier = (abilityScore: number): string => {
    if (abilityScore > 10) {
        return "+" + Math.ceil((abilityScore - 10) / 2);
    } else {
        return "-" + Math.ceil((10 - abilityScore) / 2);
    }
};

export const getValueByName = (
    abilityScores: AbilityScore[],
    abilityScoreName: string
): number => {
    const ability = abilityScores.find(
        (abilityScore) => abilityScore.ability === abilityScoreName
    );
    return ability?.value || 0;
};
