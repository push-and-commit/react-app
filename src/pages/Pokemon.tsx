import { useEffect, useState } from "react";
import { PokeAPI } from "pokeapi-types";

import { useParams } from "react-router";
const Pokemon = () => {
    const [pokemon, setPokemon] = useState<PokeAPI.Pokemon | null>(null);

    const { name } = useParams();

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            if (res.ok) {
                const body = await res.json();
                setPokemon(body);
            } else {
                alert(`FAIL : ${res.status}`);
            }
        }
        fetchData();
    }, []);

    return pokemon ? (
        <>
            <img src={pokemon.sprites.front_default} alt="" />
            <h2>
                {pokemon.id} : {pokemon.name}
            </h2>
        </>
    ) : (
        <div>Loading...</div>
    );
};

export default Pokemon;