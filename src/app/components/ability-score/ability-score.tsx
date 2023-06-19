import { abilityScoreName5e } from "@/app/common";
import { calculateModifier } from "@/app/functions";
import { AbilityScoreGeneric } from "@/app/models/character-sheet/characterSheet.model";
import styles from "./ability-score.module.scss";

export default function AbilityScoreComponent({
    abilityScores,
    rollNewDice,
}: {
    abilityScores: AbilityScoreGeneric;
    rollNewDice: (data: string) => void;
}) {
    return (
        <div className={styles.abilityScoreContainer}>
            {Object.values(abilityScores).map((value, index) => (
                <button
                    onClick={() =>
                        rollNewDice(`1d20${calculateModifier(value)}`)
                    }
                    className={styles.abilityScore}
                    key={index}
                >
                    <h2>{abilityScoreName5e[index]}</h2>
                    <p>{value}</p>
                    <p>
                        {value
                            ? calculateModifier(value) === "-0"
                                ? "0"
                                : calculateModifier(value)
                            : 0}
                    </p>
                </button>
            ))}
        </div>
    );
}
