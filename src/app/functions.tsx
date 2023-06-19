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
        return "+" + Math.floor((abilityScore - 10) / 2);
    } else {
        return Math.floor((abilityScore - 10) / 2).toString();
    }
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
