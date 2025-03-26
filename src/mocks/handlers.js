import { http, HttpResponse } from "msw";
import getPokemons from "./fixtures/getPokemons.json";
import conf from "../conf.ts";

export const handlers = [
    http.get(conf.baseUrl, ({ request }) => {
        const url = new URL(request.url);
        const params = new URLSearchParams(url.search);
        const limit = Number(params.get("limit"));
        const offset = Number(params.get("offset")) || 0;
        const length = getPokemons.results.length;
        return HttpResponse.json({
            next: offset + limit < length ? `${conf.baseUrl}?limit=${limit}&offset=${offset + limit}` : null,
            previous: offset - limit >= 0 ? `${conf.baseUrl}?limit=${limit}&offset=${offset - limit}` : null,
            count: length,
            results: getPokemons.results.slice(offset, offset + limit),
        });
    }),

    http.get(`${conf.baseUrl}:id`, ({ params }) => {
        return HttpResponse.json({
            name: getPokemons.results.find(({ url }) => url.split("/").reverse()[1] === params.id).name,
            id: params.id,
            sprites: {
                front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${params.id}.png`,
            },
        });
    }),
];