import {calculateBonus5e, formatWord} from "@/app/[locale]/functions";
import {
    AbilityScore,
    SavingThrow,
} from "@/app/[locale]/models/character-sheet/characterSheet.model";
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
                        <p>{formatWord(ability)}</p>
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
