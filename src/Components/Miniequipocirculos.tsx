import React from "react";
import type { Pokemon } from "../pokemons/interfaces/PokeApiresponse";
import { CirculoEquipo } from "../CirculoEquipo";

interface props {
  equipo: (Pokemon | null)[];
}
export const Miniequipocirculos = ({ equipo }: props) => {
  return (
    <>
      <div className="mini-equipo-container">
        {equipo.map((pokemon, index) => {
          return (
            <div key={index}    className="mini-circulo">
              <CirculoEquipo pokemon={pokemon} />
            </div>
          );
        })}
      </div>
    </>
  );
};
