import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import Skeleton from "react-loading-skeleton";
import { PokeAPI } from "pokeapi-types";
import { addParamsToUrl } from "@services/url";
import conf from "@conf";
import "react-loading-skeleton/dist/skeleton.css";

export const Pokemons = () => {
    const [pokemons, setPokemons] = useState<{ name: string; image: string; url: string }[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [limit, setLimit] = useState("10");
    const [count, setCount] = useState("0");
    const [urlToFetch, setUrlToFetch] = useState(conf.baseUrl);
    const [previousUrl, setPreviousUrl] = useState(null);
    const [nextUrl, setNextUrl] = useState(null);

    useEffect(() => {
        setPokemons([]);
        async function fetchData() {
            const res = await fetch(addParamsToUrl({ url: urlToFetch, params: { limit, anyParam: "anAwesomeParam" } }));
            if (res.ok) {
                const body = await res.json();
                setNextUrl(body.next);
                setPreviousUrl(body.previous);
                setCount(body.count.toString());
                setPokemons(
                    await Promise.all(
                        body.results.map(async (pkm: PokeAPI.NamedAPIResource) => {
                            const resp = await fetch(pkm.url);
                            const detail = await resp.json();
                            return {
                                name: detail.name,
                                image: detail.sprites.front_default,
                                url: pkm.url,
                            };
                        })
                    )
                );
            } else {
                alert(`FAIL : ${res.status}`);
            }
        }
        fetchData();
    }, [urlToFetch, limit]);

    return (
        <>
            <label>Limit : </label>
            <select name="" id="" onChange={(e) => setLimit(e.target.value)}>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value={count}>all</option>
            </select>
            {limit === count ? (
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            ) : null}
            <ul>
                {pokemons.length > 0 ? (
                    pokemons
                        .filter(({ name }) => name.includes(searchQuery))
                        .map((pokemon: { image: string; name: string; url: string }) => {
                            return (
                                <li key={pokemon.name}>
                                    <img src={pokemon.image} alt="" />
                                    <NavLink to={pokemon.url.split("/").reverse()[1]}>{pokemon.name}</NavLink>
                                </li>
                            );
                        })
                ) : (
                    <Skeleton count={10} />
                )}
            </ul>
            {pokemons.length > 0 && (
                <>
                    {previousUrl ? <button onClick={() => setUrlToFetch(previousUrl)}>Previous</button> : null}
                    {nextUrl ? <button onClick={() => setUrlToFetch(nextUrl)}>Next</button> : null}
                </>
            )}
        </>
    );
};