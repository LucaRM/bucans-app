export const roll = (roll: string): number => {
    let numberOfDice = parseInt(roll.split("d")[0]);
    let sizeOfDice = parseInt(roll.split("d")[1]);
    let sum = 0;
    for (let i = 0; i < numberOfDice; i++) {
        sum += Math.floor(Math.random() * sizeOfDice) + 1;
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
    console.log(rolls);
    return rolls.reduce((partialSum, a) => partialSum + a, 0);
};
