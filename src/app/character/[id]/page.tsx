"use client";
import { fetchCharacter } from "@/apis/character-api";
import AbilityScoreComponent from "@/app/components/ability-score/ability-score";
import Actions from "@/app/components/actions/actions";
import { Character } from "@/app/models/character-sheet/characterSheet.model";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";

const CharacterDetailsPage = ({ params }: { params: { id: string } }) => {
    const id = params.id;
    console.log("id", id);
    console.log("params", params);

    const [character, setCharacter] = useState<Character | null>(null);

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
                <p>Loading...</p>
            </div>
        );
    }

    console.log(character);

    return (
        <main className={styles.main}>
            {character.name}
            <AbilityScoreComponent abilityScores={character.abilityScore} />
            <Actions abilityScores={character.abilityScore} />
        </main>
    );
};

export default CharacterDetailsPage;
