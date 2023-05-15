import { User } from "@/app/models/user/user.model";

export async function fetchUsers() {
    const response = await fetch("http://localhost:3030/users");
    const data = await response.json();
    const characters: User[] = data.data;
    return characters;
}

export async function fetchUser(id: string) {
    const response = await fetch(`http://localhost:3030/users?_id=${id}`);
    const data = await response.json();
    const character: User = data.data;
    return character;
}
