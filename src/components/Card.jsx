import React, { useState } from 'react';
import DetallePokemon from './detallePokemon';

const Card = ({ pokemon }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleShowDetails = () => {
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  return (
    <>
      <div
        onClick={handleShowDetails}
        className="cursor-pointer flex flex-col items-center bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105"
      >
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-32 h-32 object-contain mb-2"
        />
        <h3 className="text-lg font-bold text-gray-800">{pokemon.name}</h3>
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          {pokemon.types.map((type, index) => (
            <span
              key={index}
              className={`px-2 py-1 text-xs font-semibold rounded-full text-white ${
                type === 'fire'
                  ? 'bg-red-500'
                  : type === 'water'
                  ? 'bg-blue-500'
                  : type === 'grass'
                  ? 'bg-green-500'
                  : 'bg-gray-400'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
          ))}
        </div>
      </div>

      {/* Modal de detalles */}
      {showDetails && (
        <DetallePokemon pokemon={pokemon} onClose={handleCloseDetails} />
      )}
    </>
  );
};

export default Card;
