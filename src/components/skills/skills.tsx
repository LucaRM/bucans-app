import {calculateBonus5e} from "@/app/[locale]/functions";
import {
    AbilityScore,
    Skill,
} from "@/app/[locale]/models/character-sheet/characterSheet.model";
import {useTranslation} from "react-i18next";

import styles from "./skills.module.scss";

export default function SkillsComponent({
    system,
    skills,
    abilityScores,
    rollNewDice,
    proficiencyBonus,
}: {
    system: string;
    skills: Skill[];
    abilityScores: AbilityScore;
    rollNewDice: (data: string, rollDescription: string) => void;
    proficiencyBonus: number;
}) {
    const {t} = useTranslation("dnd5e-character-sheet");

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
