"use client";
import { fetchUsers } from "@/apis/user-api";
import { User } from "@/app/models/user/user.model";
import { useEffect, useState } from "react";

export default function Home() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetchUsers().then((data) => {
            setUsers(data);
        });
    }, []);

    return (
        <>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                    <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                        User List &nbsp;
                    </p>
                </div>

                <div className="flex flex-col items-center justify-between w-full max-w-5xl mt-24 space-y-4">
                    {users ? (
                        users.map((users) => (
                            <div className="flex flex-col items-center justify-between w-full max-w-5xl mt-24 space-y-4">
                                <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
                                    {users.email}
                                </h1>
                                <h2>{users._id}</h2>
                            </div>
                        ))
                    ) : (
                        <></>
                    )}
                </div>
            </main>
        </>
    );
}
