import {calculateBonus5e} from "@/app/[locale]/functions";
import {AbilityScore} from "@/app/[locale]/models/character-sheet/characterSheet.model";
import {useEffect, useState} from "react";
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

    function rollDice(ability: string) {
        console.log("click");
        rollNewDice(
            `1d20${calculateBonus5e(
                abilityScore[ability],
                proficiencyBonus,
                "not-proficient"
            )}`
        );
    }

    useEffect(() => {
        setAbilityScore(abilityScores);
    }, [abilityScores]);

    return (
        <div className={styles.actionsContainer}>
            {/* Longsword */}
            <button
                className={styles.action}
                onClick={() => rollDice("strength")}
            >
                Longsword{" "}
            </button>
            {/* Shortsword */}
            <button
                className={styles.action}
                disabled={rolling}
                onClick={() => rollDice("dexterity")}
            >
                Shortsword{" "}
            </button>
            {/* Intelligence attack */}
            <button
                className={styles.action}
                disabled={rolling}
                onClick={() => rollDice("intelligence")}
            >
                Intelligence Spell Attack{" "}
            </button>
            {/* Wisdom attack */}
            <button
                className={styles.action}
                disabled={rolling}
                onClick={() => rollDice("wisdom")}
            >
                Wisdom Spell Attack{" "}
            </button>
            {/* Charisma attack */}
            <button
                className={styles.action}
                disabled={rolling}
                onClick={() => rollDice("charisma")}
            >
                Charisma Spell Attack{" "}
            </button>
        </div>
    );
}
