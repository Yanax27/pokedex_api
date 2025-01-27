import React, { useEffect, useState } from 'react';
import Card from './Card';
import { fetchAllPokemon, fetchPokemonByIdOrName, fetchPokemonTypes } from '../utils/fetchPokemon';

const Pokemon = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [filters, setFilters] = useState({
    type: '',
    minAttack: 0,
    maxAttack: 100,
    minDefense: 0,
    maxDefense: 100,
  });
  const [types, setTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [pageGroupStart, setPageGroupStart] = useState(1);

  // Calcular los Pokémon a mostrar en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPokemon = filteredPokemon.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredPokemon.length / itemsPerPage);
  const maxVisiblePages = 10;

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const data = await fetchAllPokemon(1000, 0); // Obtener todos los Pokémon
        const formattedData = await Promise.all(
          data.results.map(async (pokemon, index) => {
            const details = await fetchPokemonByIdOrName(index + 1);
            return {
              id: index + 1,
              name: details.name,
              image: details.sprites.other['official-artwork'].front_default,
              types: details.types.map((type) => type.type.name),
              attack: details.stats.find((stat) => stat.stat.name === 'attack').base_stat,
              defense: details.stats.find((stat) => stat.stat.name === 'defense').base_stat,
              hp: details.stats.find((stat) => stat.stat.name === 'hp').base_stat,
              base_experience: details.base_experience,
              height: details.height / 10, // Altura en metros
              weight: details.weight / 10, // Peso en kilogramos
              abilities: details.abilities.map((ability) => ability.ability.name),
            };
          })
        );
        setPokemonList(formattedData);
        setFilteredPokemon(formattedData);
      } catch (error) {
        console.error('Error al cargar los Pokémon:', error);
      }
    };

    const fetchTypes = async () => {
      try {
        const data = await fetchPokemonTypes();
        setTypes(data.results.map((type) => type.name));
      } catch (error) {
        console.error('Error al cargar los tipos de Pokémon:', error);
      }
    };

    fetchPokemon();
    fetchTypes();
  }, []);

  const handleFilter = () => {
    const filtered = pokemonList.filter((pokemon) => {
      const withinType = filters.type
        ? pokemon.types.includes(filters.type.toLowerCase())
        : true;
      const withinAttack =
        pokemon.attack >= filters.minAttack &&
        pokemon.attack <= filters.maxAttack;
      const withinDefense =
        pokemon.defense >= filters.minDefense &&
        pokemon.defense <= filters.maxDefense;

      return withinType && withinAttack && withinDefense;
    });
    setFilteredPokemon(filtered);
    setCurrentPage(1);
    setPageGroupStart(1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
    if (page >= pageGroupStart + maxVisiblePages) {
      setPageGroupStart(pageGroupStart + maxVisiblePages);
    } else if (page < pageGroupStart) {
      setPageGroupStart(Math.max(page - maxVisiblePages + 1, 1));
    }
  };

  const handlePreviousGroup = () => {
    setPageGroupStart(Math.max(pageGroupStart - maxVisiblePages, 1));
    setCurrentPage(Math.max(pageGroupStart - 1, 1));
  };

  const handleNextGroup = () => {
    setPageGroupStart(Math.min(pageGroupStart + maxVisiblePages, totalPages));
    setCurrentPage(Math.min(pageGroupStart + maxVisiblePages, totalPages));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Lista de Pokémon</h1>

      {/* Filtros */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Filtrar por tipo</label>
          <select
            value={filters.type}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, type: e.target.value }))
            }
            className="w-full border rounded-md p-2"
          >
            <option value="">Todos los tipos</option>
            {types.map((type, index) => (
              <option key={index} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Ataque mínimo</label>
          <input
            type="number"
            value={filters.minAttack}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, minAttack: Number(e.target.value) }))
            }
            className="w-full border rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Ataque máximo</label>
          <input
            type="number"
            value={filters.maxAttack}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, maxAttack: Number(e.target.value) }))
            }
            className="w-full border rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Defensa mínima</label>
          <input
            type="number"
            value={filters.minDefense}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, minDefense: Number(e.target.value) }))
            }
            className="w-full border rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Defensa máxima</label>
          <input
            type="number"
            value={filters.maxDefense}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, maxDefense: Number(e.target.value) }))
            }
            className="w-full border rounded-md p-2"
          />
        </div>
        <div>
          <button
            onClick={handleFilter}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Aplicar Filtros
          </button>
        </div>
      </div>

      {/* Grid de Pokémon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {currentPokemon.map((pokemon, index) => (
          <Card key={index} pokemon={pokemon} />
        ))}
      </div>

      {/* Paginación */}
      <div className="flex justify-center items-center mt-6 space-x-2">
        <button
          onClick={handlePreviousGroup}
          disabled={pageGroupStart === 1}
          className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 disabled:opacity-50"
        >
          «
        </button>
        {Array.from(
          { length: Math.min(maxVisiblePages, totalPages - pageGroupStart + 1) },
          (_, index) => pageGroupStart + index
        ).map((page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`px-4 py-2 rounded-lg ${
              currentPage === page
                ? 'bg-blue-500 text-white'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={handleNextGroup}
          disabled={pageGroupStart + maxVisiblePages > totalPages}
          className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 disabled:opacity-50"
        >
          »
        </button>
      </div>
    </div>
  );
};

export default Pokemon;
