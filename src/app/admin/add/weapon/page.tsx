"use client";
import { createCharacter } from "@/apis/character-api";
import { Character } from "@/app/models/character-sheet/characterSheet.model";
import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./page.module.scss";

const CharacterAddPage5e = () => {
    const [character, setCharacter] = useState<Character>({
        user: "",
        system: "dnd5e",
        name: "",
        class: "",
        level: 0,
        abilityScore: {
            strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0,
        },
        skills: [
            {
                name: "Acrobatics",
                proficiency: "not-proficient",
                ability: "dexterity",
                order: "1",
                addon: false,
            },
            {
                name: "Animal Handling",
                proficiency: "not-proficient",
                ability: "wisdom",
                order: "2",
                addon: false,
            },
            {
                name: "Arcana",
                proficiency: "not-proficient",
                ability: "intelligence",
                order: "3",
                addon: false,
            },
            {
                name: "Athletics",
                proficiency: "not-proficient",
                ability: "strength",
                order: "4",
                addon: false,
            },
            {
                name: "Deception",
                proficiency: "not-proficient",
                ability: "charisma",
                order: "5",
                addon: false,
            },
            {
                name: "History",
                proficiency: "not-proficient",
                ability: "intelligence",
                order: "6",
                addon: false,
            },
            {
                name: "Insight",
                proficiency: "not-proficient",
                ability: "wisdom",
                order: "7",
                addon: false,
            },
            {
                name: "Intimidation",
                proficiency: "not-proficient",
                ability: "charisma",
                order: "8",
                addon: false,
            },
            {
                name: "Investigation",
                proficiency: "not-proficient",
                ability: "intelligence",
                order: "9",
                addon: false,
            },
            {
                name: "Medicine",
                proficiency: "not-proficient",
                ability: "wisdom",
                order: "10",
                addon: false,
            },
            {
                name: "Nature",
                proficiency: "not-proficient",
                ability: "intelligence",
                order: "11",
                addon: false,
            },
            {
                name: "Perception",
                proficiency: "not-proficient",
                ability: "wisdom",
                order: "12",
                addon: false,
            },
            {
                name: "Performance",
                proficiency: "not-proficient",
                ability: "charisma",
                order: "13",
                addon: false,
            },
            {
                name: "Persuasion",
                proficiency: "not-proficient",
                ability: "charisma",
                order: "14",
                addon: false,
            },
            {
                name: "Religion",
                proficiency: "not-proficient",
                ability: "intelligence",
                order: "15",
                addon: false,
            },
            {
                name: "Sleight of Hand",
                proficiency: "not-proficient",
                ability: "dexterity",
                order: "16",
                addon: false,
            },
            {
                name: "Stealth",
                proficiency: "not-proficient",
                ability: "dexterity",
                order: "17",
                addon: false,
            },
            {
                name: "Survival",
                proficiency: "not-proficient",
                ability: "wisdom",
                order: "18",
                addon: false,
            },
        ],
        savingThrow: {
            strength: "not-proficient",
            dexterity: "not-proficient",
            constitution: "not-proficient",
            intelligence: "not-proficient",
            wisdom: "not-proficient",
            charisma: "not-proficient",
        },
    });

    const handleAbilityChange = (ability: string, value: number) => {
        setCharacter((prevCharacter) => ({
            ...prevCharacter,
            abilityScore: {
                ...prevCharacter.abilityScore,
                [ability]: value,
            },
        }));
    };

    const handleProficiencyChange = (index: number) => {
        const updatedSkills = [...character.skills];
        updatedSkills[index].proficiency =
            updatedSkills[index].proficiency === "not-proficient"
                ? "proficient"
                : "not-proficient";
        setCharacter((prevCharacter) => ({
            ...prevCharacter,
            skills: updatedSkills,
        }));
    };

    const handleSavingThrowChange = (ability: string) => {
        const updatedSavingThrow = { ...character.savingThrow };
        updatedSavingThrow[ability] =
            updatedSavingThrow[ability] !== "proficient"
                ? "proficient"
                : "not-proficient";
        setCharacter((prevCharacter) => ({
            ...prevCharacter,
            savingThrow: updatedSavingThrow,
        }));
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const parsedValue = name === "level" ? parseInt(value, 10) : value;

        setCharacter((prevCharacter) => ({
            ...prevCharacter,
            [name]: parsedValue,
        }));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        createCharacter(character, "");
    };

    return (
        <main className={styles.main}>
            <h1>CREATE YOUR CHARACTER</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label>
                    User:
                    <input
                        type="text"
                        name="user"
                        value={character.user}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={character.name}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Class:
                    <input
                        type="text"
                        name="class"
                        value={character.class}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Level:
                    <input
                        type="number"
                        name="level"
                        value={character.level}
                        onChange={handleChange}
                    />
                </label>
                <br />
                {Object.keys(character.abilityScore).map((ability) => (
                    <label key={ability}>
                        {ability}:
                        <input
                            type="number"
                            value={character.abilityScore[ability]}
                            onChange={(event) =>
                                handleAbilityChange(
                                    ability,
                                    parseInt(event.target.value, 10)
                                )
                            }
                        />
                    </label>
                ))}

                <p>Skills</p>

                {character.skills.map((skill, index) => (
                    <div key={index}>
                        <input
                            type="checkbox"
                            name={`proficiency-${index}`}
                            value="proficient"
                            checked={skill.proficiency === "proficient"}
                            onChange={() => handleProficiencyChange(index)}
                        />
                        <label>{skill.name}</label>
                    </div>
                ))}

                <p>Saving Throws</p>

                {Object.keys(character.savingThrow).map((ability, index) => (
                    <div key={ability}>
                        <input
                            key={index}
                            type="checkbox"
                            name={`proficiency-${index}`}
                            checked={
                                character.savingThrow[ability] === "proficient"
                            }
                            value={character.savingThrow[ability]}
                            onChange={() => handleSavingThrowChange(ability)}
                        />
                        <label>{ability}</label>:
                    </div>
                ))}

                <button type="submit">Submit</button>
            </form>
        </main>
    );
};

export default CharacterAddPage5e;
