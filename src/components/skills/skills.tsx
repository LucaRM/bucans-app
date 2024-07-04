import {calculateBonus5e} from "@/app/[locale]/functions";
import {
    AbilityScore,
    Skill,
} from "@/app/[locale]/models/character-sheet/characterSheet.model";
import initTranslations from "@/app/i18n";
import {useEffect, useState} from "react";

import styles from "./skills.module.scss";

type Params = {
    locale: string;
};

export default function SkillsComponent({
    params,
    system,
    skills,
    abilityScores,
    rollNewDice,
    proficiencyBonus,
}: {
    params: Params;
    system: string;
    skills: Skill[];
    abilityScores: AbilityScore;
    rollNewDice: (data: string, rollDescription: string) => void;
    proficiencyBonus: number;
}) {
    const [t, setT] = useState<(key: string) => string>(
        () => (key: string) => key
    );

    useEffect(() => {
        const initializeTranslations = async () => {
            const {t} = await initTranslations(params.locale, [
                "dnd5e-character-sheet",
            ]);
            setT(() => t);
        };
        initializeTranslations();
    }, [params.locale]);
    return (
        <div className={styles.skillsContainer}>
            {skills ? (
                skills.map((skill, index) => (
                    <button
                        onClick={() =>
                            rollNewDice(
                                `1d20${calculateBonus5e(
                                    abilityScores[skill.ability],
                                    proficiencyBonus,
                                    skill.proficiency
                                )}`,
                                skill.ability
                            )
                        }
                        className={styles.skills}
                        key={index}
                    >
                        <p>{t(`skill.${skill.name}`)}</p>
                        <p>
                            {calculateBonus5e(
                                abilityScores[skill.ability],
                                proficiencyBonus,
                                skill.proficiency
                            )}
                        </p>
                    </button>
                ))
            ) : (
                <></>
            )}
        </div>
    );
}
