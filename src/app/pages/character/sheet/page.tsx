"use client";
import {calculateModifier, getValueByName, roll} from "@/app/functions";
import {AbilityScore} from "@/app/models/character-sheet/characterSheet.model";
import {useState} from "react";
import AbilityScoreComponent from "../../../pages/components/ability-score";
import "./page.module.scss";

export default function Home() {
    const [result, setResult] = useState(0);
    const [AbilityScore, setAbilityScore] = useState<AbilityScore[]>([]);
    const [rolling, setRolling] = useState("");

    function rollDice(argument: string) {
        setRolling(argument);
        setResult(roll(argument));
        console.log(result);
        return result;
    }

    const onAbilityScoreGeneration = (abilitScores: AbilityScore[]) => {
        console.log("Setted Ability Scores");
        setAbilityScore(abilitScores);
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                    Character Sheet &nbsp;
                </p>
                <AbilityScoreComponent
                    onAbilityScoreGeneration={onAbilityScoreGeneration}
                />
            </div>
            <div>
                {rolling !== "" ? <p>Rolled: {rolling}</p> : <></>}
                <p>Result: {result}</p>
            </div>
            <button
                onClick={() =>
                    rollDice(
                        `1d20${calculateModifier(
                            getValueByName(AbilityScore, "STRENGTH")
                        )}`
                    )
                }
            >
                Longsword{" "}
                {calculateModifier(getValueByName(AbilityScore, "STRENGTH"))}
            </button>
            <button
                onClick={() =>
                    rollDice(
                        `1d20${calculateModifier(
                            getValueByName(AbilityScore, "DEXTERITY")
                        )}`
                    )
                }
            >
                Shortsword{" "}
                {calculateModifier(getValueByName(AbilityScore, "DEXTERITY"))}
            </button>
            <button
                onClick={() =>
                    rollDice(
                        `1d20${calculateModifier(
                            getValueByName(AbilityScore, "INTELLIGENCE")
                        )}`
                    )
                }
            >
                Intelligence Spell Attack{" "}
                {calculateModifier(
                    getValueByName(AbilityScore, "INTELLIGENCE")
                )}
            </button>
            <button
                onClick={() =>
                    rollDice(
                        `1d20${calculateModifier(
                            getValueByName(AbilityScore, "WISDOM")
                        )}`
                    )
                }
            >
                Wisdom Spell Attack{" "}
                {calculateModifier(getValueByName(AbilityScore, "WISDOM"))}
            </button>
            <button
                onClick={() =>
                    rollDice(
                        `1d20${calculateModifier(
                            getValueByName(AbilityScore, "CHARISMA")
                        )}`
                    )
                }
            >
                Charisma Spell Attack{" "}
                {calculateModifier(getValueByName(AbilityScore, "CHARISMA"))}
            </button>
            <button className="button-roll" onClick={() => rollDice("1d20")}>
                Roll a d20
            </button>
        </main>
    );
}
