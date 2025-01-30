import { roll } from "@/app/[lang]/functions";
import { Roll } from "@/app/[lang]/models/roll/roll.model";
import { useEffect, useRef, useState } from "react";
import styles from "./roller.module.scss";

export default function RollerComponent({
    diceRoll,
    rollDescription,
}: {
    diceRoll: string;
    rollDescription: string;
}) {
    const [result, setResult] = useState(0);
    const [rolling, setRolling] = useState(false);
    const [argument, setArgument] = useState("");
    const [rollHistory, setRollHistory] = useState<Roll[]>([]);
    const historyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (diceRoll) {
            rollDice(diceRoll);
        }
    }, [diceRoll]);

    useEffect(() => {
        if (historyRef.current) {
            historyRef.current.scrollTop = historyRef.current.scrollHeight;
        }
    }, [rollHistory]);

    function rollDice(argument: string) {
        setRolling(true);
        setArgument(argument);

        setTimeout(() => {
            const rollResult = roll(argument);
            const modifier = extractModifier(argument);
            const finalResult = rollResult + modifier;
            setResult(finalResult);
            setRolling(false);
            setRollHistory((prevHistory) => [
                ...prevHistory,
                {
                    roll: argument,
                    dice: 0,
                    result: finalResult,
                    description: rollDescription,
                },
            ]);
        }, 200);
    }

    function extractModifier(roll: string): number {
        const match = roll.match(/([+-]\d+)$/);
        return match ? parseInt(match[1], 10) : 0;
    }

    function clearHistory() {
        setRollHistory([]);
    }

    return (
        <div className={styles.rollingContainer}>
            <div className={styles.text}>
                {argument !== "" && <p>Rolling: {argument}</p>}
                <div className={styles.rollingBox}>
                    {rolling ? (
                        <div className={styles.rolling}></div>
                    ) : (
                        <p>Total: {result}</p>
                    )}
                </div>
            </div>
            <button onClick={clearHistory} className={styles.clearButton}>
                Clear History
            </button>
            <div className={styles.history} ref={historyRef}>
                {rollHistory.map((roll, index) => {
                    const modifier = extractModifier(roll.roll);
                    const diceResult = roll.result - modifier;
                    return (
                        <div key={index} className={styles.rollHistoryBox}>
                            <p>{roll.description}</p>
                            <p>{`${roll.roll} (${diceResult}${modifier >= 0 ? "+" : ""
                                }${modifier}) Result: ${roll.result}`}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
