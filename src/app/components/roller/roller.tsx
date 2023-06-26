import { roll } from "@/app/functions";
import { Roll } from "@/app/models/roll/roll.model";
import { useEffect, useState } from "react";
import styles from "./roller.module.scss";

export default function RollerComponent({ diceRoll }: { diceRoll: string }) {
    const [result, setResult] = useState(0);
    const [rolling, setRolling] = useState(false);
    const [argument, setArgument] = useState("");
    const [rollHistory, setRollHistory] = useState<Roll[]>([]);

    useEffect(() => {
        console.log("rolling: ", diceRoll);
        rollDice(diceRoll);
    }, [diceRoll]);

    function rollDice(argument: string) {
        setRolling(true);
        setTimeout(() => {
            setArgument(argument);
            setResult(roll(argument));
            setRolling(false);
        }, 200);
        setRollHistory([...rollHistory, { roll: argument, result: result }]);
        return result;
    }

    return (
        <>
            <div className={styles.rollingContainer}>
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
                <div className={styles.history}>
                    {rollHistory &&
                        rollHistory.map((roll, index) => <p>{roll.roll}</p>)}
                </div>
            </div>
        </>
    );
}
