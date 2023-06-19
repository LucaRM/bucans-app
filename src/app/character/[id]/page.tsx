"use client";
import { fetchCharacter } from "@/apis/character-api";
import AbilityScoreComponent from "@/app/components/ability-score/ability-score";
import ActionsComponent from "@/app/components/actions/actions";
import RollerComponent from "@/app/components/roller/roller";
import SkillsComponent from "@/app/components/skills/skills";
import { Character } from "@/app/models/character-sheet/characterSheet.model";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";

const CharacterDetailsPage = ({ params }: { params: { id: string } }) => {
    const id = params.id;

    const [character, setCharacter] = useState<Character | null>(null);
    const [diceRoll, setDiceRoll] = useState<string>("");

    const rollNewDice = (data: string) => {
        setDiceRoll(data);
    };

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
            />
            <SkillsComponent
                rollNewDice={rollNewDice}
                skills={character.skills}
                abilityScores={character.abilityScore}
            />
            <ActionsComponent
                rollNewDice={rollNewDice}
                abilityScores={character.abilityScore}
            />
            <RollerComponent diceRoll={diceRoll} />
        </main>
    );
};

export default CharacterDetailsPage;
