import React, { useState } from "react";
import { HeaderComponent } from "./HeaderComponent";
import { NavComponent } from "./NavComponent";
import { MostrarTiposComponent } from "./MostrarTiposComponent";
import { SearchPokemonComponent } from "./SearchPokemonComponent";
import {
  getPokemonByquery,
  getPokemonTypeByQuery,
} from "../actions/getPokemonByquery";
import type { Pokemon } from "../pokemons/interfaces/PokeApiresponse";
import { PokemoncardComponent } from "./PokemoncardComponent";
import { ListaPokemonTipoComponent } from "./ListaPokemonTipoComponent";

export const PokemonApiController = () => {
  const [query, setquery] = useState("");
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [pokemonFiltrados, setPokemonFiltrados] = useState<Pokemon[]>([]);

  const handleSearch = async () => {
    const searchQuery = query.toLowerCase().trim();
    if (!searchQuery) return;

    console.log(`Buscando: ${searchQuery}`);

    try {
      const pokemonBuscado = await getPokemonByquery(searchQuery);
      console.log(pokemonBuscado);
      setPokemon(pokemonBuscado);
      setPokemonFiltrados([]); // Limpiar filtros al buscar uno específico
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const ontipoclick = async (tipoOriginal: string) => {
    console.log("1️⃣ Click recibido en abuelo, tipo:", tipoOriginal);
    try {
      const pokemonsDeltipo = await getPokemonTypeByQuery(tipoOriginal);
      console.log("2️⃣ Pokémon recibidos:", pokemonsDeltipo);
      setPokemonFiltrados(pokemonsDeltipo);
      setPokemon(null); // Limpiar búsqueda individual
      console.log("3️⃣ Estado actualizado");
    } catch (error) {
      console.error("Error al obtener pokémon por tipo:", error);
    }
  };

  return (
    <>
      <HeaderComponent />
      <NavComponent />
      <MostrarTiposComponent ontipoclick={ontipoclick} />
      <SearchPokemonComponent
        descripcion="Busca tu pokemon favorito"
        query={query}
        setquery={setquery}
        handleSearch={handleSearch}
      />

      {/* Mostrar uno u otro */}
      {pokemon && <PokemoncardComponent pokemon={pokemon} />}
      {pokemonFiltrados.length > 0 && (
        <ListaPokemonTipoComponent pokemonFiltrado={pokemonFiltrados} />
      )}
    </>
  );
};
