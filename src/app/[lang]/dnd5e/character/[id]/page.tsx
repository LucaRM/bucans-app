// CharacterDetailsPage.tsx
"use client";
import { fetchCharacter } from "@/apis/character-api";
import { getProficiencyBonus } from "@/app/[lang]/functions";
import { Character } from "@/app/[lang]/models/character-sheet/characterSheet.model";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/language-provider/TranslationsProvider";
import AbilityScoreComponent from "@/components/ability-score/ability-score";
import Tabs from "@/components/character-sheet-tabs/tabs";
import RollerComponent from "@/components/roller/roller";
import SavingThrowComponent from "@/components/saving-throw/saving-throw";
import SkillsComponent from "@/components/skills/skills";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";

type Params = {
    id: string;
    locale: string;
};

const CharacterDetailsPage = ({ params }: { params: Params }) => {
    const i18nNamespaces = ["dnd5e-character-sheet"];
    const id = params.id;
    const [t, setT] = useState<(key: string) => string>(
        () => (key: string) => key
    );
    const [resources, setResources] = useState<any>({});

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
            const { t, resources } = await initTranslations(
                params.locale,
                i18nNamespaces
            );
            setT(() => t);
            setResources(resources);
        };
        initializeTranslations();
    }, [params.locale]);

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
        <TranslationsProvider
            resources={resources}
            locale={params.locale}
            namespaces={i18nNamespaces}
        >
            <main className={styles.main}>
                {character.name}
                <AbilityScoreComponent
                    rollNewDice={rollNewDice}
                    abilityScores={character.abilityScores}
                    proficiencyBonus={proficiencyBonus}
                />
                <div className={styles.sheet}>
                    <div className={styles.skillList}>
                        <SkillsComponent
                            system={character.system}
                            rollNewDice={rollNewDice}
                            skills={character.skills}
                            abilityScores={character.abilityScores}
                            proficiencyBonus={proficiencyBonus}
                        />
                    </div>
                    <div className={styles.body}>
                        <SavingThrowComponent
                            system={character.system}
                            rollNewDice={rollNewDice}
                            savingThrows={character.savingThrows}
                            abilityScores={character.abilityScores}
                            proficiencyBonus={proficiencyBonus}
                        />
                        <Tabs
                            rollNewDice={rollNewDice}
                            abilityScores={character.abilityScores}
                            proficiencyBonus={proficiencyBonus}
                        />
                        {/* <ActionsComponent
                            rollNewDice={rollNewDice}
                            abilityScores={character.abilityScore}
                            proficiencyBonus={proficiencyBonus}
                        /> */}
                        <RollerComponent
                            diceRoll={diceRoll}
                            rollDescription={rollDescription}
                        />
                    </div>
                </div>
            </main>
        </TranslationsProvider>
    );
};

export default CharacterDetailsPage;
