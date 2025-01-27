import React, { useEffect, useState } from 'react';
import Carousel from '../components/Carousel'; // Asegúrate de que la ruta sea correcta
import { fetchAllPokemon, fetchPokemonByIdOrName } from '../utils/fetchPokemon'; // Incluye esta función si no lo habías hecho

const DashboardPage = () => {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const data = await fetchAllPokemon(15, 0); // Obtén los primeros 10 Pokémon
        const formattedData = await Promise.all(
          data.results.map(async (pokemon, index) => {
            const details = await fetchPokemonByIdOrName(index + 1); // Llamada adicional para obtener detalles del Pokémon
            return {
              name: details.name,
              image: details.sprites.other['official-artwork'].front_default,
              types: details.types.map((type) => type.type.name), // Extraer tipos
            };
          })
        );
        setPokemonList(formattedData);
      } catch (error) {
        console.error('Error al cargar los Pokémon:', error);
      }
    };
    fetchPokemon();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      {pokemonList.length > 0 ? (
        <Carousel items={pokemonList} />
      ) : (
        <p>Cargando Pokémon...</p>
      )}
    </div>
  );
};

export default DashboardPage;
