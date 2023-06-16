"use client";
import { createCharacter } from "@/apis/character-api";
import { Character } from "@/app/models/character-sheet/characterSheet.model";
import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./page.module.scss";

const CharacterAddPage = () => {
    const [character, setCharacter] = useState<Character>({
        user: "",
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
        console.log(character);
        createCharacter(character, "");
        // Perform submit logic
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
                <button type="submit">Submit</button>
            </form>
        </main>
    );
};

export default CharacterAddPage;
