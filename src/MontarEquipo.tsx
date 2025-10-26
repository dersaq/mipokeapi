import React, { useState } from "react";
import { CirculoEquipo } from "./CirculoEquipo";
import { StatEquipo } from "./Components/StatEquipo";
import type { Pokemon } from "./pokemons/interfaces/PokeApiresponse";
import { getPokemonByquery } from "./actions/getPokemonByquery";
import { SearchPokemonComponent } from "./Components/SearchPokemonComponent";
import { Miniequipocirculos } from "./Components/miniequipocirculos";

export const MontarEquipo = () => {
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [equipo, setequipo] = useState<(Pokemon | null)[]>(Array(6).fill(null));
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    if (selectedSlot === null) {
      alert("Selecciona un slot primero");
      return;
    }

    const searchQuery = query.toLowerCase().trim();
    if (!searchQuery) return;

    console.log(`Buscando: ${searchQuery}`);
    try {
      const pokemonBuscado = await getPokemonByquery(searchQuery);
      console.log(pokemonBuscado);

      // Validar si ya existe
      const yaExiste = equipo.some(
        (pokemon) => pokemon?.id === pokemonBuscado.id
      );

      if (yaExiste) {
        alert("Este Pokémon ya está en tu equipo");
        return;
      }

      // Añadir el pokemon al slot seleccionado
      const nuevoEquipo = [...equipo];
      nuevoEquipo[selectedSlot] = pokemonBuscado;
      setequipo(nuevoEquipo);

      setQuery("");
    } catch (error) {
      console.error("Error:", error);
      alert("No se encontró el Pokémon");
    }
  };

  return (
    <>
      <SearchPokemonComponent
        descripcion="Elige pokemon para formar tu equipo"
        query={query}
        setquery={setQuery}
        handleSearch={handleSearch}
      />
      <div className="container-pokemon-stats">
        <div className="montar-equipo-container">
          {equipo.map((pokemon, index) => (
            <div
              key={index}
              className={
                selectedSlot === index
                  ? "circulo-pokemon-selected"
                  : "circulo-pokemon"
              }
              onClick={() => setSelectedSlot(index)}
            >
              <CirculoEquipo pokemon={pokemon} />
            </div>
          ))}
        </div>
        <div className="stats-miniequipo">
          <Miniequipocirculos equipo={equipo} />
          <StatEquipo equipo={equipo} />
        </div>
      </div>
    </>
  );
};
