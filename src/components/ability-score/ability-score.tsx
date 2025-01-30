import { calculateBonus5e } from "@/app/[lang]/functions";
import { AbilityScore } from "@/app/[lang]/models/character-sheet/characterSheet.model";
import { useTranslation } from "react-i18next";
import styles from "./ability-score.module.scss";

export default function AbilityScoreComponent({
    abilityScores,
    rollNewDice,
    proficiencyBonus,
}: {
    abilityScores: AbilityScore;
    rollNewDice: (data: string, rollDescription: string) => void;
    proficiencyBonus: number;
}) {
    const { t } = useTranslation("dnd5e-character-sheet");
    return (
        <div className={styles.abilityScoreContainer}>
            {Object.values(abilityScores).map((value, index) => (
                <button
                    onClick={() =>
                        rollNewDice(
                            `1d20${calculateBonus5e(
                                value,
                                proficiencyBonus,
                                "not-proficiency"
                            )}`,
                            value.toString()
                        )
                    }
                    className={styles.abilityScore}
                    key={index}
                >
                    <h2>
                        {t(`abilityScore.${Object.keys(abilityScores)[index]}`)}
                    </h2>
                    <p>{value}</p>
                    <p>
                        {value
                            ? calculateBonus5e(
                                value,
                                proficiencyBonus,
                                "not-proficiency"
                            ) === "-0"
                                ? "0"
                                : calculateBonus5e(
                                    value,
                                    proficiencyBonus,
                                    "not-proficiency"
                                )
                            : 0}
                    </p>
                </button>
            ))}
        </div>
    );
}
