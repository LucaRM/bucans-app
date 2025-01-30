"use client";
import { AbilityScore } from "@/app/[lang]/models/character-sheet/characterSheet.model";
import { useState } from "react";
import ActionsComponent from "../actions/actions";
import FeaturesComponent from "../features/features";
import styles from "./tabs.module.scss";

const Tabs = ({
    abilityScores,
    rollNewDice,
    proficiencyBonus,
}: {
    abilityScores: AbilityScore;
    rollNewDice: (data: string, rollDescription: string) => void;
    proficiencyBonus: number;
}) => {
    const [activeTab, setActiveTab] = useState("tab1");

    const renderContent = () => {
        switch (activeTab) {
            case "actions":
                return (
                    <ActionsComponent
                        rollNewDice={rollNewDice}
                        abilityScores={abilityScores}
                        proficiencyBonus={proficiencyBonus}
                    />
                );
            case "features":
                return (
                    <FeaturesComponent
                        rollNewDice={rollNewDice}
                        abilityScores={abilityScores}
                        proficiencyBonus={proficiencyBonus}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className={styles.tabsContainer}>
            <div className="flex space-x-5">
                <button
                    className={styles.tab}
                    onClick={() => setActiveTab("actions")}
                >
                    Actions
                </button>
                <button
                    className={styles.tab}
                    onClick={() => setActiveTab("features")}
                >
                    Features
                </button>
            </div>
            <div>{renderContent()}</div>
        </div>
    );
};

export default Tabs;
