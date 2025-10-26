import React from "react";
import type { Pokemon } from "../pokemons/interfaces/PokeApiresponse";
import { calculoStatsEquipo } from "../calculoequipoStat";

interface StatEquipoProps {
  equipo: (Pokemon | null)[];
}

export const StatEquipo = ({ equipo }: StatEquipoProps) => {
  const stats = calculoStatsEquipo(equipo);

  // Array con los nombres y valores de las stats
  const statsArray = [
    { name: "HP", value: stats.hp, color: "success" },
    { name: "Ataque", value: stats.ataque, color: "info" },
    { name: "Defensa", value: stats.defensa, color: "warning" },
    { name: "Ataque Especial", value: stats.ataqueEspecial, color: "danger" },
    {
      name: "Defensa Especial",
      value: stats.defensaEspecial,
      color: "primary",
    },
    { name: "Velocidad", value: stats.velocidad, color: "secondary" },
  ];

  return (
    <div className="pokemon-stats">
      <h3>Estadísticas del Equipo (Promedio):</h3>
      {statsArray.map((stat, index) => {
        const percentage = (stat.value / 255) * 100;

        return (
          <div key={index} className="mb-2">
            <label className="form-label text-capitalize">
              {stat.name}: {stat.value}
            </label>
            <div
              className="progress"
              role="progressbar"
              aria-label={stat.name}
              aria-valuenow={stat.value}
              aria-valuemin={0}
              aria-valuemax={255}
            >
              <div
                className={`progress-bar text-bg-${stat.color}`}
                style={{ width: `${percentage}%` }}
              >
                {stat.value}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
