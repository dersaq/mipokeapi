import React, { useState } from "react";
import axios from "axios";
import { HeaderComponent } from "./Components/HeaderComponent";
import { NavComponent } from "./Components/NavComponent";
import { PokemonQuizCard } from "./Components/PokemonQuizCard";
import type { Pokemon } from "./pokemons/interfaces/PokeApiresponse";



export const QuizController = () => {
  const [randomPokemon, setRandomPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);

  const getRandomPokemon = async () => {
    setLoading(true);
    setRandomPokemon(null); // 👈 IMPORTANTE: Resetear primero

    try {
      const randomId = Math.floor(Math.random() * 898) + 1;
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${randomId}`
      );
      setRandomPokemon(data);
    } catch (error) {
      console.error("Error al cargar pokemon:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HeaderComponent />
      <NavComponent />

      <div className="quiz-container">
        <button onClick={getRandomPokemon} disabled={loading}>
          {loading ? "⏳ Cargando..." : "🎮 Jugar"}
        </button>

        {randomPokemon && (
          <PokemonQuizCard key={randomPokemon.id} pokemon={randomPokemon} />
        )}
      </div>
    </>
  );
};
