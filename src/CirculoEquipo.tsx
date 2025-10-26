import React from "react";
import type { Pokemon } from "./pokemons/interfaces/PokeApiresponse";

interface CirculoEquipoProps {
  pokemon: Pokemon | null;
}

export const CirculoEquipo = ({ pokemon }: CirculoEquipoProps) => {
  return (
    <div className="circulo-pokemon">
      {pokemon && <img src={pokemon.sprites.front_default} />}
    </div>
  );
};
