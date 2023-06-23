import { calculateBonus5e } from "@/app/functions";
import { AbilityScore } from "@/app/models/character-sheet/characterSheet.model";
import { useEffect, useState } from "react";
import styles from "./actions.module.scss";

export default function ActionsComponent({
    abilityScores,
    rollNewDice,
    proficiencyBonus,
}: {
    abilityScores: AbilityScore;
    rollNewDice: (data: string) => void;
    proficiencyBonus: number;
}) {
    const [result, setResult] = useState(0);
    const [rolling, setRolling] = useState(false);
    const [abilityScore, setAbilityScore] = useState<AbilityScore>({});
    const [argument, setArgument] = useState("");

    useEffect(() => {
        setAbilityScore(abilityScores);
    }, [abilityScores]);

    return (
        <div className={styles.actionsContainer}>
            {/* Longsword */}
            <button
                className={styles.action}
                onClick={() =>
                    rollNewDice(
                        `1d20${calculateBonus5e(
                            abilityScore.strength,
                            proficiencyBonus,
                            "not-proficient"
                        )}`
                    )
                }
            >
                Longsword{" "}
            </button>
            {/* Shortsword */}
            <button
                className={styles.action}
                disabled={rolling}
                onClick={() =>
                    rollNewDice(
                        `1d20${calculateBonus5e(
                            abilityScore.dexterity,
                            proficiencyBonus,
                            "not-proficient"
                        )}`
                    )
                }
            >
                Shortsword{" "}
            </button>
            {/* Intelligence attack */}
            <button
                className={styles.action}
                disabled={rolling}
                onClick={() =>
                    rollNewDice(
                        `1d20${calculateBonus5e(
                            abilityScore.intelligence,
                            proficiencyBonus,
                            "not-proficient"
                        )}`
                    )
                }
            >
                Intelligence Spell Attack{" "}
            </button>
            {/* Wisdom attack */}
            <button
                className={styles.action}
                disabled={rolling}
                onClick={() =>
                    rollNewDice(
                        `1d20${calculateBonus5e(
                            abilityScore.wisdom,
                            proficiencyBonus,
                            "not-proficient"
                        )}`
                    )
                }
            >
                Wisdom Spell Attack{" "}
            </button>
            {/* Charisma attack */}
            <button
                className={styles.action}
                disabled={rolling}
                onClick={() =>
                    rollNewDice(
                        `1d20${calculateBonus5e(
                            abilityScore.charisma,
                            proficiencyBonus,
                            "not-proficient"
                        )}`
                    )
                }
            >
                Charisma Spell Attack{" "}
            </button>
        </div>
    );
}
