import axios from 'axios';

// Configuración base de Axios
const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2', // URL base de la API de Pokémon
  timeout: 10000, // Tiempo de espera máximo (en milisegundos)
});

// Función para obtener todos los Pokémon
export const fetchAllPokemon = async (limit = 20, offset = 0) => {
  try {
    const response = await api.get(`/pokemon?limit=${limit}&offset=${offset}`);
    return response.data; // Devuelve la lista de Pokémon
  } catch (error) {
    console.error('Error al obtener todos los Pokémon:', error);
    throw error;
  }
};

// Función para obtener información de un Pokémon por nombre o ID
export const fetchPokemonByIdOrName = async (idOrName) => {
  try {
    const response = await api.get(`/pokemon/${idOrName}`);
    return response.data; // Devuelve los detalles del Pokémon
  } catch (error) {
    console.error(`Error al obtener el Pokémon ${idOrName}:`, error);
    throw error;
  }
};

// Función para obtener las categorías (tipos de Pokémon)
export const fetchPokemonTypes = async () => {
  try {
    const response = await api.get('/type');
    return response.data; // Devuelve los tipos de Pokémon
  } catch (error) {
    console.error('Error al obtener los tipos de Pokémon:', error);
    throw error;
  }
};

// Función para obtener Pokémon por tipo
export const fetchPokemonByType = async (type) => {
  try {
    const response = await api.get(`/type/${type}`);
    return response.data; // Devuelve los Pokémon de ese tipo
  } catch (error) {
    console.error(`Error al obtener Pokémon del tipo ${type}:`, error);
    throw error;
  }
};

// Función para buscar regiones
export const fetchRegions = async () => {
  try {
    const response = await api.get('/region');
    return response.data; // Devuelve las regiones
  } catch (error) {
    console.error('Error al obtener las regiones:', error);
    throw error;
  }
};

export default {
  fetchAllPokemon,
  fetchPokemonByIdOrName,
  fetchPokemonTypes,
  fetchPokemonByType,
  fetchRegions,
};
