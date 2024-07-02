import {calculateBonus5e, formatWord} from "@/app/[locale]/functions";
import {AbilityScore} from "@/app/[locale]/models/character-sheet/characterSheet.model";
import styles from "./ability-score.module.scss";

export default function AbilityScoreComponent({
    abilityScores,
    rollNewDice,
    proficiencyBonus,
}: {
    abilityScores: AbilityScore;
    rollNewDice: (data: string) => void;
    proficiencyBonus: number;
}) {
    return (
        <div className={styles.abilityScoreContainer}>
            {Object.values(abilityScores).map((value, index) => (
                <button
                    onClick={() =>
                        rollNewDice(
                            `1d20${calculateBonus5e(
                                value,
                                proficiencyBonus,
                                "not-proficiency"
                            )}`
                        )
                    }
                    className={styles.abilityScore}
                    key={index}
                >
                    <h2>{formatWord(Object.keys(abilityScores)[index])}</h2>
                    <p>{value}</p>
                    <p>
                        {value
                            ? calculateBonus5e(
                                  value,
                                  proficiencyBonus,
                                  "not-proficiency"
                              ) === "-0"
                                ? "0"
                                : calculateBonus5e(
                                      value,
                                      proficiencyBonus,
                                      "not-proficiency"
                                  )
                            : 0}
                    </p>
                </button>
            ))}
        </div>
    );
}
