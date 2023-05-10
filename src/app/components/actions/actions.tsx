import { calculateModifier, getValueByName, roll } from "@/app/functions";
import { AbilityScore } from "@/app/models/character-sheet/characterSheet.model";
import { useEffect, useState } from "react";
import styles from "./actions.module.scss";

export default function Actions({
    abilityScores,
}: {
    abilityScores: AbilityScore[];
}) {
    const [result, setResult] = useState(0);
    const [abilityScore, setAbilityScore] = useState<AbilityScore[]>([]);
    const [argument, setArgument] = useState("");

    //create a useeffect that will run on load and set the ability scores from the abilityScores prop

    useEffect(() => {
        setAbilityScore(abilityScores);
    }, [abilityScores]);

    function rollDice(argument: string) {
        setArgument(argument);
        setResult(roll(argument));
        return result;
    }

    return (
        <div className={styles.container}>
            {/* <h1>Ability Scores</h1> */}
            <div>
                {argument !== "" ? <p>Rolling: {argument}</p> : <></>}
                <p>Total: {result}</p>
            </div>
            {/* Longsword */}
            <button
                className={styles.action}
                onClick={() =>
                    rollDice(
                        `1d20${calculateModifier(
                            getValueByName(abilityScore, "STRENGTH")
                        )}`
                    )
                }
            >
                Longsword{" "}
            </button>
            {/* Shortsword */}
            <button
                className={styles.action}
                onClick={() =>
                    rollDice(
                        `1d20${calculateModifier(
                            getValueByName(abilityScore, "DEXTERITY")
                        )}`
                    )
                }
            >
                Shortsword{" "}
            </button>
            {/* Intelligence attack */}
            <button
                className={styles.action}
                onClick={() =>
                    rollDice(
                        `1d20${calculateModifier(
                            getValueByName(abilityScore, "INTELLIGENCE")
                        )}`
                    )
                }
            >
                Intelligence Spell Attack{" "}
            </button>
            {/* Wisdom attack */}
            <button
                className={styles.action}
                onClick={() =>
                    rollDice(
                        `1d20${calculateModifier(
                            getValueByName(abilityScore, "WISDOM")
                        )}`
                    )
                }
            >
                Wisdom Spell Attack{" "}
            </button>
            {/* Charisma attack */}
            <button
                className={styles.action}
                onClick={() =>
                    rollDice(
                        `1d20${calculateModifier(
                            getValueByName(abilityScore, "CHARISMA")
                        )}`
                    )
                }
            >
                Charisma Spell Attack{" "}
            </button>
        </div>
    );
}
