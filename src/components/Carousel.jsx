import React, { useEffect, useState } from 'react';

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [items]);

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Contenedor principal de la imagen y el contenido sobrepuesto */}
      <div className="relative overflow-hidden rounded-lg shadow-lg aspect-square bg-gray-100 flex items-center justify-center">
        {/* Imagen del Pokémon */}
        <img
          src={items[currentIndex].image}
          alt={items[currentIndex].name}
          className="object-contain w-full h-full"
        />

        {/* Superposición con el texto */}
        <div className="absolute inset-0 bg-black bg-opacity-20 flex flex-col items-center justify-center text-white">
          <h2 className="text-2xl font-bold capitalize">{items[currentIndex].name}</h2>
          <div className="flex space-x-2 mt-2">
            {items[currentIndex].types.map((type, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full bg-blue-500 text-sm capitalize"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Indicadores (puntos) para navegar entre los elementos */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
