import { Spell } from "@/app/[lang]/models/spell/spell.model";

export async function fetchSpells() {
    const response = await fetch("http://localhost:3030/spells");
    const data = await response.json();
    const characters: Spell[] = data.data;
    return characters;
}

export async function createSpell(spell: Spell, token: string) {
    try {
        const response = await fetch("http://localhost:3030/spells", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(spell),
        });

        if (!response.ok) {
            throw new Error("Failed to create spell");
        }

        const createdCharacter = await response.json();
        return createdCharacter;
    } catch (error) {
        console.error("Error creating spell:", error);
        throw error;
    }
}
