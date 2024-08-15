import {calculateBonus5e} from "@/app/[locale]/functions";
import {
    AbilityScore,
    SavingThrow,
} from "@/app/[locale]/models/character-sheet/characterSheet.model";
import {useTranslation} from "react-i18next";
import styles from "./saving-throw.module.scss";

export default function SavingThrowComponent({
    system,
    savingThrows,
    abilityScores,
    rollNewDice,
    proficiencyBonus,
}: {
    system: string;
    savingThrows: SavingThrow;
    abilityScores: AbilityScore;
    rollNewDice: (data: string, rollDescription: string) => void;
    proficiencyBonus: number;
}) {
    const {t} = useTranslation("dnd5e-character-sheet");

    return (
        <div className={styles.savingThrowContainer}>
            {savingThrows ? (
                Object.keys(savingThrows).map((ability, index) => (
                    <button
                        onClick={() =>
                            rollNewDice(
                                `1d20${calculateBonus5e(
                                    abilityScores[ability],
                                    proficiencyBonus,
                                    savingThrows[ability]
                                )}`,
                                ability
                            )
                        }
                        className={styles.savingThrow}
                        key={index}
                    >
                        {t(`abilityScore.${ability}`)}
                        <p>
                            {calculateBonus5e(
                                abilityScores[ability],
                                proficiencyBonus,
                                savingThrows[ability]
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
