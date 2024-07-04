"use client";
import {fetchCharacter} from "@/apis/character-api";
import {getProficiencyBonus} from "@/app/[locale]/functions";
import {Character} from "@/app/[locale]/models/character-sheet/characterSheet.model";
import initTranslations from "@/app/i18n";
import AbilityScoreComponent from "@/components/ability-score/ability-score";
import ActionsComponent from "@/components/actions/actions";
import RollerComponent from "@/components/roller/roller";
import SavingThrowComponent from "@/components/saving-throw/saving-throw";
import SkillsComponent from "@/components/skills/skills";
import {useEffect, useState} from "react";
import styles from "./page.module.scss";

type Params = {
    id: string;
    locale: string;
};

const CharacterDetailsPage = ({params}: {params: Params}) => {
    const id = params.id;
    const [t, setT] = useState<(key: string) => string>(
        () => (key: string) => key
    );

    const [character, setCharacter] = useState<Character | null>(null);
    const [diceRoll, setDiceRoll] = useState<string>("");
    const [proficiencyBonus, setProficiencyBonus] = useState<number>(0);
    const [rollDescription, setRollDescription] = useState<string>("");

    const rollNewDice = (data: string, rollDescription: string) => {
        setDiceRoll(data);
        setRollDescription(rollDescription);
    };

    useEffect(() => {
        const initializeTranslations = async () => {
            const {t} = await initTranslations(params.locale, [
                "dnd5e character sheet",
            ]);
            setT(() => t);
        };
    }, []);

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
            {t("skill.Survival")}
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
                    <RollerComponent
                        diceRoll={diceRoll}
                        rollDescription={rollDescription}
                    />
                </div>
            </div>
        </main>
    );
};

export default CharacterDetailsPage;
