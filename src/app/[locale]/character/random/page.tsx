"use client";
import {roll} from "@/app/[locale]/functions";
import {AbilityScore} from "@/app/[locale]/models/character-sheet/characterSheet.model";
import Actions from "@/components/actions/actions";
import ModalCritico from "@/components/modal";
import {useState} from "react";
import styles from "./page.module.scss";

export default function Home() {
    const [result, setResult] = useState(0);
    const [userRoll, setUserRoll] = useState("");
    const [AbilityScore, setAbilityScore] = useState<AbilityScore>({});

    function rollDice(argument: string) {
        setResult(roll(argument));
    }

    const onAbilityScoreGeneration = (abilityScores: AbilityScore) => {
        setAbilityScore(abilityScores);
    };

    return (
        <>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <div className={styles.container}>
                    <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                            Character Sheet &nbsp;
                        </p>
                    </div>
                    {/* <AbilityScoreComponent
                        onAbilityScoreGeneration={onAbilityScoreGeneration}
                    /> */}

                    <Actions
                        abilityScores={AbilityScore}
                        proficiencyBonus={2}
                        rollNewDice={(data: string) => rollDice(data)}
                    />

                    {/* Roll a d20 */}
                    <button
                        className={styles.buttonRoll}
                        onClick={() => rollDice("1d20")}
                    >
                        Roll a d20
                    </button>
                </div>
            </main>
            <ModalCritico rolled={result} />
        </>
    );
}
