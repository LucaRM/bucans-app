import {Character} from "@/app/[locale]/models/character-sheet/characterSheet.model";

export async function fetchCharacters() {
    const response = await fetch("http://localhost:3030/characters");
    const data = await response.json();
    const characters: Character[] = data.data;
    return characters;
}

export async function fetchCharacter(_id: string) {
    const response = await fetch(`http://localhost:3030/characters?_id=${_id}`);
    const data = await response.json();
    const character: Character = data.data[0];
    return character;
}

export async function createCharacter(character: Character, token: string) {
    try {
        const response = await fetch("http://localhost:3030/characters", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE2ODY4NjQ4NzEsImV4cCI6MTY4Njk1MTI3MSwiYXVkIjoiaHR0cHM6Ly95b3VyZG9tYWluLmNvbSIsInN1YiI6IjY0NWFhMjcwZjc5YmFkMmExYzJjZGYxNCIsImp0aSI6IjNlNDFhMjg0LTI0ODQtNDMxNi04OWIwLTEyMTJiMzY2YTk5MCJ9.BeImVlIg5BsBHKalGaDLpRWoLviKiIy6WZvCaimBL4I`,
            },
            body: JSON.stringify(character),
        });

        if (!response.ok) {
            throw new Error("Failed to create character");
        }

        const createdCharacter = await response.json();
        return createdCharacter;
    } catch (error) {
        console.error("Error creating character:", error);
        throw error;
    }
}
