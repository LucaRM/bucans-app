import {calculateBonus5e} from "@/app/[locale]/functions";
import {
    AbilityScore,
    Skill,
} from "@/app/[locale]/models/character-sheet/characterSheet.model";
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
    rollNewDice: (data: string) => void;
    proficiencyBonus: number;
}) {
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
                                )}`
                            )
                        }
                        className={styles.skills}
                        key={index}
                    >
                        <p>{skill.name}</p>
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
