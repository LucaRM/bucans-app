"use client";
import { fetchCharacters } from "@/apis/character-api";
import { Character } from "@/app/models/character-sheet/characterSheet.model";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CharacterList() {
    const [result, setResult] = useState(0);
    const [characters, setCharacters] = useState<Character[]>([]);

    useEffect(() => {
        fetchCharacters().then((data) => {
            setCharacters(data);
        });
    }, []);

    return (
        <>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                    <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                        Character List &nbsp;
                    </p>
                </div>

                <div className="flex flex-col items-center justify-between w-full max-w-5xl mt-24 space-y-4">
                    {characters.map((character) => (
                        <div className="flex flex-col items-center justify-between w-full max-w-5xl mt-24 space-y-4">
                            <Link href={`/character/${character._id}`}>
                                <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
                                    {character.name}
                                </h1>
                                <h2>{character._id}</h2>
                            </Link>
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
}
