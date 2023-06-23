"use client";
import { createUser } from "@/apis/user-api";
import { ChangeEvent, FormEvent, useState } from "react";
import { User } from "../models/user/user.model";
import styles from "./page.module.scss";

const Login = () => {
    const [user, setUser] = useState<User>({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const parsedValue = value;

        setUser((prevCharacter) => ({
            ...prevCharacter,
            [name]: parsedValue,
        }));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        createUser(user, "");
    };

    return (
        <main className={styles.main}>
            <h1>Login</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="text"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </main>
    );
};

export default Login;
