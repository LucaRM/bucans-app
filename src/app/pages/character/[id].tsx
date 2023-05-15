import { Character } from "@/app/models/character-sheet/characterSheet.model";
import { GetStaticPaths, GetStaticProps } from "next";

type Props = {
    character: Character;
};

const CharacterPage = ({ character }: Props) => {
    return (
        <div>
            <h1>{character.name}</h1>
            <p>{character._id}</p>
        </div>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const res = await fetch("http://localhost:3030/characters");
    const characters = await res.json();

    const paths = characters.map((character: Character) => ({
        params: { id: character._id.toString() },
    }));

    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
    const res = await fetch(
        `http://localhost:3030/characters?_id=${params?.id}`
    );
    const character = await res.json();

    return { props: { character } };
};

export default CharacterPage;
