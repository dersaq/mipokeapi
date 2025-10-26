import React, { useRef, useEffect, useState } from "react";
import type { Pokemon } from "../pokemons/interfaces/PokeApiresponse";

interface props {
  pokemon: Pokemon;
}

export const PokemonQuizCard = ({ pokemon }: props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pixelLevel, setPixelLevel] = useState(10);
  const [userGuess, setUserGuess] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">(
    "playing"
  );
  const [message, setMessage] = useState("");
  const [revealedTypes, setRevealedTypes] = useState<string[]>([]);
  const maxAttempts = 5;

  useEffect(() => {
    pixelateImage();
  }, [pixelLevel, pokemon]);

  const pixelateImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src =
      pokemon.sprites.other?.["official-artwork"]?.front_default ||
      pokemon.sprites.front_default;

    img.onload = () => {
      const displaySize = 300;
      canvas.width = displaySize;
      canvas.height = displaySize;

      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = pixelLevel;
      tempCanvas.height = pixelLevel;
      const tempCtx = tempCanvas.getContext("2d");

      if (!tempCtx) return;

      tempCtx.drawImage(img, 0, 0, pixelLevel, pixelLevel);
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, displaySize, displaySize);
      ctx.drawImage(tempCanvas, 0, 0, displaySize, displaySize);
    };
  };

  const handleGuess = () => {
    if (gameStatus !== "playing") return;

    const guess = userGuess.toLowerCase().trim();
    const correctName = pokemon.name.toLowerCase();
    const correctTypes = pokemon.types.map((t) => t.type.name.toLowerCase());

    // Verificar si acertó el NOMBRE
    if (guess === correctName) {
      setGameStatus("won");
      setMessage("🎉 ¡SÍ! ¡HAS GANADO! Es " + pokemon.name.toUpperCase());
      setPixelLevel(200);
      setRevealedTypes(correctTypes); // Revelar todos los tipos
      setUserGuess("");
      return;
    }

    // Verificar si acertó un TIPO (aunque no sea el nombre)
    const isType = correctTypes.includes(guess);

    if (isType && !revealedTypes.includes(guess)) {
      setRevealedTypes([...revealedTypes, guess]);
      setMessage(
        `✅ ¡Correcto! ${guess.toUpperCase()} es un tipo de este Pokémon`
      );
      setPixelLevel(pixelLevel + 15); // Despixelar un poco como recompensa
      setUserGuess("");
      return;
    }

    if (isType && revealedTypes.includes(guess)) {
      setMessage(`⚠️ Ya descubriste el tipo ${guess.toUpperCase()}`);
      setUserGuess("");
      return;
    }

    // Si no acertó ni nombre ni tipo
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (newAttempts >= maxAttempts) {
      setGameStatus("lost");
      setMessage("😢 Game Over! Era " + pokemon.name.toUpperCase());
      setPixelLevel(200);
      setRevealedTypes(correctTypes); // Mostrar todos los tipos
    } else {
      setPixelLevel(pixelLevel + 20);
      setMessage(
        `❌ Incorrecto. Intento ${newAttempts}/${maxAttempts}. ¡Sigue intentando!`
      );
    }
    setUserGuess("");
  };

  const resetGame = () => {
    setPixelLevel(10);
    setUserGuess("");
    setAttempts(0);
    setGameStatus("playing");
    setMessage("");
    setRevealedTypes([]);
  };

  return (
    <div className="quiz-container">
      <div className="quiz-card">
        <h2 className="quiz-title">🎮 ¿Quién es ese Pokémon?</h2>

        <div className="canvas-wrapper">
          <canvas ref={canvasRef} className="pokemon-canvas" />

          {/* Mostrar tipos revelados encima del canvas */}
          {revealedTypes.length > 0 && (
            <div className="types-overlay">
              {revealedTypes.map((type) => (
                <span key={type} className={`type-badge type-${type}`}>
                  {type}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="quiz-info">
          Intentos: {attempts}/{maxAttempts} | Nivel pixelado: {pixelLevel}
        </div>

        {message && (
          <div className={`quiz-message ${gameStatus}`}>{message}</div>
        )}

        {gameStatus === "playing" && (
          <>
            <input
              type="text"
              className="quiz-input"
              placeholder="Escribe el nombre o un tipo del Pokémon"
              value={userGuess}
              onChange={(e) => setUserGuess(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleGuess()}
            />

            <button onClick={handleGuess} className="btn-guess">
              Adivinar
            </button>

            <div className="quiz-hint">
              💡 Escribe el nombre completo o un tipo (fire, water, grass, etc.)
            </div>
          </>
        )}

        {gameStatus !== "playing" && (
          <button onClick={resetGame} className="btn-reset">
            🔄 Jugar de Nuevo
          </button>
        )}
      </div>
    </div>
  );
};
