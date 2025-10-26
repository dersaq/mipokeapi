import type { Pokemon } from "../pokemons/interfaces/PokeApiresponse";
import axios from "axios";

export const pokeapi = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});
export const getPokemonByquery = async (query: string): Promise<Pokemon> => {
  const response = await pokeapi.get<Pokemon>(`pokemon/${query}`, {});
  console.log(response.data);

  return response.data;
};

export const getPokemonTypeByQuery = async (query: string) => {
  const response = await pokeapi.get(`type/${query}`);

  // Filtrar mega-evoluciones y formas que no existen como pokémon individuales
  const pokemonValidos = response.data.pokemon.filter((p: any) => {
    const name = p.pokemon.name;
    return (
      !name.includes("-mega") &&
      !name.includes("-gmax") &&
      !name.includes("-primal")
    );
  });

  // Traer datos completos de cada pokémon válido
  const pokemonCompletos = await Promise.all(
    pokemonValidos.map((p: any) => getPokemonByquery(p.pokemon.name))
  );

  return pokemonCompletos;
};

// https://pokeapi.co/api/v2/type/fire
