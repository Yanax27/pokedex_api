import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const typeColors = {
  fire: "#F08030",
  water: "#6890F0",
  grass: "#78C850",
  electric: "#F8D030",
  psychic: "#F85888",
  ice: "#98D8D8",
  dragon: "#7038F8",
  dark: "#705848",
  fairy: "#EE99AC",
  normal: "#A8A878",
  fighting: "#C03028",
  flying: "#A890F0",
  poison: "#A040A0",
  ground: "#E0C068",
  rock: "#B8A038",
  bug: "#A8B820",
  ghost: "#705898",
  steel: "#B8B8D0",
};

const DetallePokemon = ({ pokemon, onClose }) => {
  if (!pokemon) {
    return null; // Si no hay datos del Pokémon, no renderiza nada
  }

  // Obtener el color de fondo del tipo principal
  const primaryType = pokemon.types[0]?.toLowerCase();
  const bgColor = typeColors[primaryType] || "#333";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className="relative block w-full max-w-md mx-auto rounded-lg shadow-lg overflow-hidden group"
        style={{ backgroundColor: bgColor }}
      >
        {/* Imagen del Pokémon con animación */}
        <div className="relative flex justify-center items-center p-6 bg-gray-900 rounded-t-lg group-hover:animate-pulse">
          <img
            alt={pokemon.name}
            src={pokemon.image || "https://via.placeholder.com/300"}
            className="h-40 w-40 object-contain transition-transform duration-300 transform group-hover:scale-110"
          />
        </div>

        {/* Detalles del Pokémon */}
        <div className="p-6">
          {/* Nombre y Tipo */}
          <div className="text-center mb-4">
            <p className="text-sm font-medium uppercase tracking-widest text-white">
              {pokemon.types?.join(", ") || "Desconocido"}
            </p>
            <p className="text-2xl font-bold text-white uppercase">
              {pokemon.name || "Desconocido"}
            </p>
          </div>

          {/* Estadísticas principales */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Barra circular para HP */}
            <div className="flex flex-col items-center">
              <CircularProgressbar
                value={pokemon.hp || 0}
                maxValue={255}
                text={`${pokemon.hp || 0} HP`}
                styles={buildStyles({
                  textColor: "white",
                  pathColor: "#FF6B6B",
                  trailColor: "#333",
                })}
                className="w-20 h-20"
              />
              <p className="text-sm text-white mt-2">HP</p>
            </div>

            {/* Barra circular para Experiencia */}
            <div className="flex flex-col items-center">
              <CircularProgressbar
                value={pokemon.base_experience || 0}
                maxValue={300}
                text={`${pokemon.base_experience || 0} XP`}
                styles={buildStyles({
                  textColor: "white",
                  pathColor: "#4FC3F7",
                  trailColor: "#333",
                })}
                className="w-20 h-20"
              />
              <p className="text-sm text-white mt-2">Experiencia</p>
            </div>
          </div>

          {/* Detalles adicionales */}
          <div className="space-y-2 text-white">
            <p>
              <span className="font-semibold text-red-400">Ataque:</span>{" "}
              {pokemon.attack || "N/A"}
            </p>
            <p>
              <span className="font-semibold text-purple-400">Defensa:</span>{" "}
              {pokemon.defense || "N/A"}
            </p>
            <p>
              <span className="font-semibold text-yellow-500">Altura:</span>{" "}
              {pokemon.height || "N/A"} m
            </p>
            <p>
              <span className="font-semibold text-orange-500">Peso:</span>{" "}
              {pokemon.weight || "N/A"} kg
            </p>
            <p>
              <span className="font-semibold text-cyan-400">Habilidades:</span>{" "}
              {pokemon.abilities?.join(", ") || "N/A"}
            </p>
          </div>
        </div>

        {/* Botón de cierre */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default DetallePokemon;
