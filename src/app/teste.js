const input = "1d20+3-2";

function roll(input) {
    let numberOfDice = parseInt(input.split("d")[0]);
    let sizeOfDice = parseInt(input.split("d")[1]);
    let Positivebonus = parseInt(input.split("+")[1]);
    let negativeBonus = parseInt(input.split("-")[1]);
    console.log("input", input);
    console.log("numberOfDice", numberOfDice);
    console.log("sizeOfDice", sizeOfDice);
    console.log("Positivebonus", Positivebonus);
    console.log("negativeBonus", negativeBonus);
    let sum = 0;
    for (let i = 0; i < numberOfDice; i++) {
        sum += Math.floor(Math.random() * sizeOfDice) + 1;
    }
    console.log("rolled", sum);
    if (Positivebonus) {
        sum += Positivebonus;
    }
    if (negativeBonus) {
        sum -= negativeBonus;
    }
    return sum;
}

console.log(roll(input));
