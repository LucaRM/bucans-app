import { AbilityScoreGenerator, calculateModifier } from "@/app/functions";
import { AbilityScore } from "@/app/models/character-sheet/characterSheet.model";
import { useEffect, useState } from "react";
import styles from "./ability-score.module.scss";

interface AbilityScoreComponentProps {
    onAbilityScoreGeneration: (abilityScores: AbilityScore[]) => void;
}

export default function AbilityScoreComponent({
    onAbilityScoreGeneration,
}: AbilityScoreComponentProps) {
    const [AbilityScore, setAbilityScore] = useState<AbilityScore[]>([]);
    const aS = AbilityScore.length;

    const abilityScoreNames = [
        "STRENGTH",
        "DEXTERITY",
        "CONSTITUTION",
        "INTELLIGENCE",
        "WISDOM",
        "CHARISMA",
    ];

    useEffect(() => {
        generateAbilityScores();
    }, []);

    function generateAbilityScores() {
        let tempAbilityScores: AbilityScore[] = [];
        for (let i = 0; i < abilityScoreNames.length; i++) {
            tempAbilityScores.push({
                ability: abilityScoreNames[i],
                value: AbilityScoreGenerator(),
            });
        }
        setAbilityScore(tempAbilityScores);
        onAbilityScoreGeneration(tempAbilityScores);
    }

    return (
        <div className={styles.abilityScoreContainer}>
            {/* <h1>Ability Scores</h1> */}
            {[...Array(abilityScoreNames.length)].map((e, i) => (
                <div className={styles.abilityScore} key={i}>
                    <h2>
                        {AbilityScore.length > 1 ? AbilityScore[i].ability : ""}
                    </h2>
                    <p>{AbilityScore.length > 1 ? AbilityScore[i].value : 0}</p>
                    <p>
                        {AbilityScore.length > 1
                            ? calculateModifier(AbilityScore[i]?.value) === "-0"
                                ? "0"
                                : calculateModifier(AbilityScore[i]?.value)
                            : 0}
                    </p>
                </div>
            ))}
            <button onClick={() => generateAbilityScores()}>Reroll</button>
        </div>
    );
}
