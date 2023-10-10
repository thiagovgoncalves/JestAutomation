const axios = require('axios');

const BASE_URL = 'https://pokeapi.co/api/v2';

async function getPokemon(id) {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function getPokemonByName(name) {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon/${name}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function getAbility(id) {
  try {
    const response = await axios.get(`${BASE_URL}/ability/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getPokemon,
  getPokemonByName,
  getAbility,
};
