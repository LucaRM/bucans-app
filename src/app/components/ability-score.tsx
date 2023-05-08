import {AbilityScoreGenerator} from "../functions";

export default function AbilityScore() {
    const abilityScores = 6;
    const abilityScoreNames = [
        "Strength",
        "Dexterity",
        "Constitution",
        "Intelligence",
        "Wisdom",
        "Charisma",
    ];
    return (
        <div>
            <h1>Ability Scores</h1>
            <div>
                <h2>Strength</h2>
                <p>{AbilityScoreGenerator()}</p>
            </div>
            {[...Array(abilityScores)].map((e, i) => (
                <>
                    <h2>{abilityScoreNames[i]}</h2>
                    <div key={i}>{AbilityScoreGenerator()}</div>
                </>
            ))}
        </div>
    );
}
