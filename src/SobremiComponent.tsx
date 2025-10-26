import React, { useState, useEffect } from "react";
import { HeaderComponent } from "./Components/HeaderComponent";
import { NavComponent } from "./Components/NavComponent";
import { PokeRandomComponent } from "./PokeRandomComponent";
import axios from "axios";
import type { Pokemon } from "./pokemons/interfaces/PokeApiresponse";

export const SobremiComponent = () => {
  const [randomPokemonsTop, setRandomPokemonsTop] = useState<Pokemon[]>([]);
  const [randomPokemonsBottom, setRandomPokemonsBottom] = useState<Pokemon[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  // Función para obtener pokémon aleatorios
  const fetchRandomPokemonData = async () => {
    const randomId = Math.floor(Math.random() * 898) + 1;
    const { data } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${randomId}`
    );
    return data;
  };

  // Obtener varios pokémon aleatorios
  const getMultipleRandomPokemons = async (
    count: number
  ): Promise<Pokemon[]> => {
    try {
      const promises = Array.from({ length: count }, () =>
        fetchRandomPokemonData()
      );
      const pokemons = await Promise.all(promises);
      return pokemons;
    } catch (error) {
      console.error("Error al cargar pokémon:", error);
      return [];
    }
  };

  // Cargar pokémon cuando el componente se monta
  useEffect(() => {
    const loadPokemons = async () => {
      setLoading(true);

      // Obtener dos grupos diferentes de pokémon
      const topPokemons = await getMultipleRandomPokemons(10);
      const bottomPokemons = await getMultipleRandomPokemons(10);

      setRandomPokemonsTop(topPokemons);
      setRandomPokemonsBottom(bottomPokemons);
      setLoading(false);
    };

    loadPokemons();
  }, []); // Solo se ejecuta una vez al montar el componente

  return (
    <>
      <HeaderComponent />
      <NavComponent />
      <div className="sobremiContainer">
        <h3>David Biedma Mesa Desarrollador web</h3>
        <div className="sobremi-flex">
          <div className="sobremiImage">
            <img src="/mipokeapi/img/yop.jpg" alt="David Biedma" />
          </div>
          <div className="sobremiTexto">
            {loading ? (
              <p>Cargando pokémon...</p>
            ) : (
              <>
                <br />
                <PokeRandomComponent pokemons={randomPokemonsTop} />
                ¡Hola! Me llamo david y soy desarrollador web, actualmente me
                encuentro terminando mi ultimo año de la FP de DAW y esto que
                estais viendo ahora ha sido mi primer proyectito hecho con React
                sobre todo para aprender y manejar el tema de utilizar APIs
                externas, espero que os guste y aprecieis el trabajo que me ha
                costado hacerla. acepto críticas constructivas via Bizum.
                <PokeRandomComponent pokemons={randomPokemonsBottom} />
              </>
            )}
            <br />
          </div>
        </div>
      </div>
    </>
  );
};
