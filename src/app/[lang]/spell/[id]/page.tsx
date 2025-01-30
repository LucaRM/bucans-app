"use client";
import { fetchCharacter } from "@/apis/character-api";
import { getProficiencyBonus } from "@/app/[lang]/functions";
import { Character } from "@/app/[lang]/models/character-sheet/characterSheet.model";
import AbilityScoreComponent from "@/components/ability-score/ability-score";
import ActionsComponent from "@/components/actions/actions";
import RollerComponent from "@/components/roller/roller";
import SavingThrowComponent from "@/components/saving-throw/saving-throw";
import SkillsComponent from "@/components/skills/skills";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";

const CharacterDetailsPage = ({ params }: { params: { id: string } }) => {
    const id = params.id;

    const [character, setCharacter] = useState<Character | null>(null);
    const [diceRoll, setDiceRoll] = useState<string>("");
    const [proficiencyBonus, setProficiencyBonus] = useState<number>(0);

    const rollNewDice = (data: string) => {
        setDiceRoll(data);
    };

    useEffect(() => {
        if (character) {
            setProficiencyBonus(getProficiencyBonus(character.level));
        }
    }, [character]);

    useEffect(() => {
        const fetchCharacterDetails = async () => {
            try {
                if (typeof id === "string") {
                    const data = await fetchCharacter(id);
                    setCharacter(data);
                }
            } catch (error) {
                console.error("Error fetching character details:", error);
            }
        };

        if (id) {
            fetchCharacterDetails();
        }
    }, [id]);

    if (!character) {
        return (
            <div>
                <p>Character not found</p>
            </div>
        );
    }

    return (
        <main className={styles.main}>
            {character.name}
            <AbilityScoreComponent
                rollNewDice={rollNewDice}
                abilityScores={character.abilityScore}
                proficiencyBonus={proficiencyBonus}
            />
            <div className={styles.sheet}>
                <div className={styles.skillList}>
                    <SkillsComponent
                        system={character.system}
                        rollNewDice={rollNewDice}
                        skills={character.skills}
                        abilityScores={character.abilityScore}
                        proficiencyBonus={proficiencyBonus}
                    />
                </div>
                <div className={styles.body}>
                    <SavingThrowComponent
                        system={character.system}
                        rollNewDice={rollNewDice}
                        savingThrows={character.savingThrow}
                        abilityScores={character.abilityScore}
                        proficiencyBonus={proficiencyBonus}
                    />
                    <ActionsComponent
                        rollNewDice={rollNewDice}
                        abilityScores={character.abilityScore}
                        proficiencyBonus={proficiencyBonus}
                    />
                    <RollerComponent diceRoll={diceRoll} />
                </div>
            </div>
        </main>
    );
};

export default CharacterDetailsPage;
