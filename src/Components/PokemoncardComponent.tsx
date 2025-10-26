import React from "react";
import type { Pokemon } from "../pokemons/interfaces/PokeApiresponse";

interface props {
  pokemon: Pokemon;
}

export const PokemoncardComponent = ({ pokemon }: props) => {
  return (
    <div className="pokemon-container container-fluid">
      <div className="pokemon-datos">
        <h3>Datos</h3>
        <div className="pokedex-card">
          <div className="header">
            <div className="pokedex-number">Pokédex №{pokemon.id}</div>
          </div>

          <div className="info-grid">
            <div className="info-item">
              <span className="label">Introducido:</span>
              <span className="value">Generation I</span>
            </div>

            <div className="info-item">
              <span className="label">Peso:</span>
              <span className="value">{pokemon.weight / 10} kg</span>
            </div>
            <div className="pokemon-abilities">
              <div className="pokemon-skill">
                {pokemon.abilities.map((habilidad, index) => {
                  return (
                    <div key={index}>
                      <span>Habilidad: </span>
                      <span>{habilidad.ability.name}</span>

                      {habilidad.is_hidden && <span> (Oculta)</span>}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="info-item">
              <span className="label">Altura:</span>
              <span className="value">{pokemon.height / 10} m</span>
            </div>
          </div>
        </div>
      </div>

      <div className="pokemon-card">
        <h3>{pokemon.name}</h3>

        <div className="tipos-container">
          <span>Tipos:</span>
          <div className="tipos-div">
            {pokemon.types.map((tipo, index) => (
              <div key={index}>
                <span>{tipo.type.name}</span>
              </div>
            ))}
          </div>

          <div>
            <img
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.name}
            />
          </div>
        </div>

        <div className="pokemon-stats">
          <h3>Estadisticas:</h3>
          {pokemon.stats.map((stat, index) => {
            const colors = [
              "success",
              "info",
              "warning",
              "danger",
              "primary",
              "secondary",
            ];
            const percentage = (stat.base_stat / 255) * 100;

            return (
              <div key={index} className="mb-2">
                <label className="form-label text-capitalize">
                  {stat.stat.name}: {stat.base_stat}
                </label>
                <div
                  className="progress"
                  role="progressbar"
                  aria-label={stat.stat.name}
                  aria-valuenow={stat.base_stat}
                  aria-valuemin={0}
                  aria-valuemax={255}
                >
                  <div
                    className={`progress-bar text-bg-${
                      colors[index % colors.length]
                    }`}
                    style={{ width: `${percentage}%` }}
                  >
                    {stat.base_stat}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
