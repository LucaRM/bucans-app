"use client";
import { createSpell } from "@/apis/spell-api";
import { Spell, constructorSpell } from "@/app/[lang]/models/spell/spell.model";
import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./page.module.scss";

const SpellAddPage5e = () => {
    const [spell, setSpell] = useState<Spell>(constructorSpell());

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const parsedValue = name === "level" ? parseInt(value, 10) : value;

        setSpell((prevSpell) => ({
            ...prevSpell,
            [name]: parsedValue,
        }));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        createSpell(spell, "");
    };

    return (
        <main className={styles.main}>
            <h1>Add your spell</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={spell.name}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    sourceBook:
                    <input
                        type="text"
                        name="sourceBook"
                        value={spell.sourceBook}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    magicSource:
                    <input
                        type="text"
                        name="magicSource"
                        value={spell.magicSource}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    system:
                    <input
                        type="text"
                        name="system"
                        value={spell.system}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    level:
                    <input
                        type="text"
                        name="level"
                        value={spell.level}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    duration:
                    <input
                        type="text"
                        name="duration"
                        value={spell.duration}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    castingAction:
                    <input
                        type="text"
                        name="castingAction"
                        value={spell.castingAction}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    school:
                    <input
                        type="text"
                        name="school"
                        value={spell.school}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    range:
                    <input
                        type="text"
                        name="range"
                        value={spell.range}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    attackType:
                    <input
                        type="text"
                        name="attackType"
                        value={spell.attackType}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    savingThrow:
                    <input
                        type="text"
                        name="attackType"
                        value={spell.savingThrow}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    components:
                    <input
                        type="text"
                        name="components"
                        value={spell.components}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    damageType:
                    <input
                        type="text"
                        name="damageType"
                        value={spell.damageType}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    effect:
                    <input
                        type="text"
                        name="effect"
                        value={spell.effect}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    description:
                    <input
                        type="text"
                        name="description"
                        value={spell.description}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    dice:
                    <input
                        type="text"
                        name="dice"
                        value={spell.dice}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    targets:
                    <input
                        type="text"
                        name="targets"
                        value={spell.targets}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    image:
                    <input
                        type="text"
                        name="image"
                        value={spell.image}
                        onChange={handleChange}
                    />
                </label>

                <button type="submit">Submit</button>
            </form>
        </main>
    );
};

export default SpellAddPage5e;
