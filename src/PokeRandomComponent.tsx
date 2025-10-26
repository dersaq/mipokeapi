import React from "react";
import type { Pokemon } from "./pokemons/interfaces/PokeApiresponse";

interface props {
  pokemons: Pokemon[];
}
export const PokeRandomComponent = ({ pokemons }: props) => {
  return (
    <>
      <div className="poke-randoms-container">
        {pokemons.map((pokemon, index) => (
          <img
            className="poke-randoms-img"
            key={pokemon.id || index}
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
          />
        ))}
      </div>
    </>
  );
};
