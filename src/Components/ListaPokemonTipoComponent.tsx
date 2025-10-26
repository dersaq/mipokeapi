import React from "react";
import type { Pokemon } from "../pokemons/interfaces/PokeApiresponse";

interface Props {
  pokemonFiltrado: Pokemon[]; // ← necesitas esto
}

export const ListaPokemonTipoComponent = ({ pokemonFiltrado }: Props) => {
  return (
    <>
      <div className="pokemon-type-grid">
        {pokemonFiltrado.map((pokemon) => (
          <div className="pokemon-type-element">
            <div>
              {pokemon.types.map((tipo) => {
                return (
                  <>
                    <span>{tipo.type.name}</span>
                    <span> </span>
                  </>
                );
              })}
            </div>
            <img
              src={pokemon.sprites.other["official-artwork"].front_default}
            />
            <h3>{pokemon.name}</h3>
          </div>
        ))}
      </div>
    </>
  );
};
