import { Character } from "@/app/models/character-sheet/characterSheet.model";

export async function fetchCharacters() {
    const response = await fetch("http://localhost:3030/characters");
    const data = await response.json();
    const characters: Character[] = data.data;
    return characters;
}

export async function fetchCharacter(_id: string) {
    const response = await fetch(`http://localhost:3030/characters?_id=${_id}`);
    const data = await response.json();
    const character: Character = data.data;
    return character;
}
