import { calculateBonus5e } from "@/app/[lang]/functions";
import { AbilityScore } from "@/app/[lang]/models/character-sheet/characterSheet.model";
import { useEffect, useState } from "react";
import styles from "./actions.module.scss";

export default function ActionsComponent({
    abilityScores,
    rollNewDice,
    proficiencyBonus,
}: {
    abilityScores: AbilityScore;
    rollNewDice: (data: string, rollDescription: string) => void;
    proficiencyBonus: number;
}) {
    const [abilityScore, setAbilityScore] = useState<AbilityScore>({});

    function rollDice(ability: string, rollDescription: string) {
        const argument = `1d20${calculateBonus5e(
            abilityScore[ability],
            proficiencyBonus,
            "not-proficient"
        )}`;
        console.log("rollDescriptio: ", rollDescription);
        rollNewDice(argument, rollDescription);
    }

    useEffect(() => {
        setAbilityScore(abilityScores);
    }, [abilityScores]);

    return (
        <div className={styles.actionsContainer}>
            {/* Longsword */}
            <button
                className={styles.action}
                onClick={() => rollDice("strength", "Longsword")}
            >
                Longsword
            </button>
            {/* Shortsword */}
            <button
                className={styles.action}
                onClick={() => rollDice("dexterity", "Shortsword")}
            >
                Shortsword
            </button>
            {/* Intelligence attack */}
            <button
                className={styles.action}
                onClick={() => rollDice("intelligence", "Intelligence Attack")}
            >
                Intelligence Spell Attack
            </button>
            {/* Wisdom attack */}
            <button
                className={styles.action}
                onClick={() => rollDice("wisdom", "Wisdom Attack")}
            >
                Wisdom Spell Attack
            </button>
            {/* Charisma attack */}
            <button
                className={styles.action}
                onClick={() => rollDice("charisma", "Charisma Attack")}
            >
                Charisma Spell Attack
            </button>
        </div>
    );
}
