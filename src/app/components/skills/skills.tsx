import { calculateModifier } from "@/app/functions";
import {
    AbilityScoreGeneric,
    Skill,
} from "@/app/models/character-sheet/characterSheet.model";
import styles from "./skills.module.scss";

export default function SkillsComponent({
    skills,
    abilityScores,
    rollNewDice,
}: {
    skills: Skill[];
    abilityScores: AbilityScoreGeneric;
    rollNewDice: (data: string) => void;
}) {
    return (
        <div className={styles.abilityScoreContainer}>
            {skills.map((skill, index) => (
                <button
                    onClick={() =>
                        rollNewDice(
                            `1d20${calculateModifier(
                                abilityScores[skill.ability]
                            )}`
                        )
                    }
                    className={styles.abilityScore}
                    key={index}
                >
                    <p>{skill.name}</p>
                    <p>{calculateModifier(abilityScores[skill.ability])}</p>
                </button>
            ))}
        </div>
    );
}
