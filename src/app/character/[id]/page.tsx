"use client";
import { fetchCharacter } from "@/apis/character-api";
import AbilityScoreComponent from "@/app/components/ability-score/ability-score";
import ActionsComponent from "@/app/components/actions/actions";
import RollerComponent from "@/app/components/roller/roller";
import SavingThrowComponent from "@/app/components/saving-throw/saving-throw";
import SkillsComponent from "@/app/components/skills/skills";
import { getProficiencyBonus } from "@/app/functions";
import { Character } from "@/app/models/character-sheet/characterSheet.model";
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
            <SkillsComponent
                system={character.system}
                rollNewDice={rollNewDice}
                skills={character.skills}
                abilityScores={character.abilityScore}
                proficiencyBonus={proficiencyBonus}
            />
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
        </main>
    );
};

export default CharacterDetailsPage;
