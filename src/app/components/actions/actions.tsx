import { calculateModifier, roll } from "@/app/functions";
import { AbilityScore } from "@/app/models/character-sheet/characterSheet.model";
import { useEffect, useState } from "react";
import styles from "./actions.module.scss";

export default function Actions({
    abilityScores,
}: {
    abilityScores: AbilityScore;
}) {
    const [result, setResult] = useState(0);
    const [rolling, setRolling] = useState(false);
    const [abilityScore, setAbilityScore] = useState<AbilityScore>({});
    const [argument, setArgument] = useState("");

    useEffect(() => {
        setAbilityScore(abilityScores);
    }, [abilityScores]);

    function rollDice(argument: string) {
        setRolling(true);
        setTimeout(() => {
            setArgument(argument);
            setResult(roll(argument));
            setRolling(false);
        }, 200);
        return result;
    }

    return (
        <div className={styles.actionsContainer}>
            <div className={styles.text}>
                {argument !== "" ? <p>Rolling: {argument}</p> : <></>}
                <div className={styles.rollingBox}>
                    {rolling ? (
                        <div className={styles.rolling}></div>
                    ) : (
                        <p>Total: {result}</p>
                    )}
                </div>
            </div>
            {/* Longsword */}
            <button
                className={styles.action}
                onClick={() =>
                    rollDice(`1d20${calculateModifier(abilityScore.strength)}`)
                }
            >
                Longsword{" "}
            </button>
            {/* Shortsword */}
            <button
                className={styles.action}
                disabled={rolling}
                onClick={() =>
                    rollDice(`1d20${calculateModifier(abilityScore.dexterity)}`)
                }
            >
                Shortsword{" "}
            </button>
            {/* Intelligence attack */}
            <button
                className={styles.action}
                disabled={rolling}
                onClick={() =>
                    rollDice(
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
                    rollDice(`1d20${calculateModifier(abilityScore.wisdom)}`)
                }
            >
                Wisdom Spell Attack{" "}
            </button>
            {/* Charisma attack */}
            <button
                className={styles.action}
                disabled={rolling}
                onClick={() =>
                    rollDice(`1d20${calculateModifier(abilityScore.charisma)}`)
                }
            >
                Charisma Spell Attack{" "}
            </button>
        </div>
    );
}
