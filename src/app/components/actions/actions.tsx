import { calculateModifier } from "@/app/functions";
import { AbilityScoreGeneric } from "@/app/models/character-sheet/characterSheet.model";
import { useEffect, useState } from "react";
import styles from "./actions.module.scss";

export default function ActionsComponent({
    abilityScores,
    rollNewDice,
}: {
    abilityScores: AbilityScoreGeneric;
    rollNewDice: (data: string) => void;
}) {
    const [result, setResult] = useState(0);
    const [rolling, setRolling] = useState(false);
    const [abilityScore, setAbilityScore] = useState<AbilityScoreGeneric>({});
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
                        `1d20${calculateModifier(abilityScore.strength)}`
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
                        `1d20${calculateModifier(abilityScore.dexterity)}`
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
                        `1d20${calculateModifier(abilityScore.intelligence)}`
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
                    rollNewDice(`1d20${calculateModifier(abilityScore.wisdom)}`)
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
                        `1d20${calculateModifier(abilityScore.charisma)}`
                    )
                }
            >
                Charisma Spell Attack{" "}
            </button>
        </div>
    );
}
