import type { Pokemon } from "./pokemons/interfaces/PokeApiresponse";

export const calculoStatsEquipo = (equipo: (Pokemon | null)[]) => {
  // Filtrar solo los Pokémon válidos (no nulls)
  const pokemonsValidos = equipo.filter((p) => p !== null) as Pokemon[];

  // Si no hay pokémon, devolver 0 en todas las stats
  if (pokemonsValidos.length === 0) {
    return {
      hp: 0,
      ataque: 0,
      defensa: 0,
      ataqueEspecial: 0,
      defensaEspecial: 0,
      velocidad: 0,
    };
  }

  // Sumar todas las stats
  const sumaStats = pokemonsValidos.reduce(
    (totales, pokemon) => ({
      hp: totales.hp + pokemon.stats[0].base_stat,
      ataque: totales.ataque + pokemon.stats[1].base_stat,
      defensa: totales.defensa + pokemon.stats[2].base_stat,
      ataqueEspecial: totales.ataqueEspecial + pokemon.stats[3].base_stat,
      defensaEspecial: totales.defensaEspecial + pokemon.stats[4].base_stat,
      velocidad: totales.velocidad + pokemon.stats[5].base_stat,
    }),
    {
      hp: 0,
      ataque: 0,
      defensa: 0,
      ataqueEspecial: 0,
      defensaEspecial: 0,
      velocidad: 0,
    }
  );

  // Calcular promedios y redondear
  return {
    hp: Math.round(sumaStats.hp / pokemonsValidos.length),
    ataque: Math.round(sumaStats.ataque / pokemonsValidos.length),
    defensa: Math.round(sumaStats.defensa / pokemonsValidos.length),
    ataqueEspecial: Math.round(
      sumaStats.ataqueEspecial / pokemonsValidos.length
    ),
    defensaEspecial: Math.round(
      sumaStats.defensaEspecial / pokemonsValidos.length
    ),
    velocidad: Math.round(sumaStats.velocidad / pokemonsValidos.length),
  };
};
