import {User} from "@/app/[locale]/models/user/user.model";

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

export async function fetchUserByEmail(email: string) {
    const response = await fetch(`http://localhost:3030/users?_id=${email}`);
    const data = await response.json();
    const character: User = data.data;
    return character;
}

export async function createUser(user: User, token: string) {
    try {
        const response = await fetch("http://localhost:3030/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE2ODY4NjQ4NzEsImV4cCI6MTY4Njk1MTI3MSwiYXVkIjoiaHR0cHM6Ly95b3VyZG9tYWluLmNvbSIsInN1YiI6IjY0NWFhMjcwZjc5YmFkMmExYzJjZGYxNCIsImp0aSI6IjNlNDFhMjg0LTI0ODQtNDMxNi04OWIwLTEyMTJiMzY2YTk5MCJ9.BeImVlIg5BsBHKalGaDLpRWoLviKiIy6WZvCaimBL4I`,
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error("Failed to create user");
        }

        const createdUser = await response.json();
        return createdUser;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
}

// export async function login(user: User) {
//     try {
//         const response = await fetch("http://localhost:3030/authentication", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: {
//                 startegy: "local",
//                 email: user.email,
//                 password: user.email,
//             },
//         });

//         if (!response.ok) {
//             throw new Error("Failed to create user");
//         }

//         const createdUser = await response.json();
//         return createdUser;
//     } catch (error) {
//         console.error("Error creating user:", error);
//         throw error;
//     }
// }
