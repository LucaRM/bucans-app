import { calculateModifier } from "@/app/functions";
import { AbilityScore } from "@/app/models/character-sheet/characterSheet.model";
import styles from "./ability-score.module.scss";

export default function AbilityScoreComponent({
    abilityScores,
}: {
    abilityScores: AbilityScore[];
}) {
    const abilityScoreNames = [
        "STRENGTH",
        "DEXTERITY",
        "CONSTITUTION",
        "INTELLIGENCE",
        "WISDOM",
        "CHARISMA",
    ];

    return (
        <div className={styles.abilityScoreContainer}>
            {/* <h1>Ability Scores</h1> */}
            {[...Array(abilityScoreNames.length)].map((e, i) => (
                <div className={styles.abilityScore} key={i}>
                    <h2>
                        {abilityScores.length > 1
                            ? abilityScores[i].ability
                            : ""}
                    </h2>
                    <p>
                        {abilityScores.length > 1 ? abilityScores[i].value : 0}
                    </p>
                    <p>
                        {abilityScores.length > 1
                            ? calculateModifier(abilityScores[i]?.value) ===
                              "-0"
                                ? "0"
                                : calculateModifier(abilityScores[i]?.value)
                            : 0}
                    </p>
                </div>
            ))}
        </div>
    );
}
