const axios = require('axios');
const AxiosMockAdapter = require('axios-mock-adapter');
const { getPokemon, getPokemonByName, getAbility } = require('./pokeapi');

const mock = new AxiosMockAdapter(axios);

const mockPokemonData = {
  id: 1,
  name: 'bulbasaur',
};

const mockAbilityData = {
  id: 1,
  name: 'overgrow',
};

describe('PokeAPI Functions', () => {
  afterEach(() => {
    mock.reset();
  });

  describe('getPokemon', () => {
    it('should fetch a Pokemon by ID', async () => {
      const pokemonId = 1;
      mock.onGet(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`).reply(200, mockPokemonData);

      const pokemon = await getPokemon(pokemonId);

      expect(pokemon).toEqual(mockPokemonData);
    });

    it('should handle errors when fetching a Pokemon by ID', async () => {
      const pokemonId = 999;
      mock.onGet(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`).reply(404, { message: 'Request failed with status code 404' });

      await expect(getPokemon(pokemonId)).rejects.toThrow('Request failed with status code 404');
    });
  });

  describe('getPokemonByName', () => {
    it('should fetch a Pokemon by name', async () => {
      const pokemonName = 'bulbasaur';
      mock.onGet(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).reply(200, mockPokemonData);

      const pokemon = await getPokemonByName(pokemonName);

      expect(pokemon).toEqual(mockPokemonData);
    });

    it('should handle errors when fetching a Pokemon by name', async () => {

      const pokemonName = 'nonexistentpokemon'; 
      mock.onGet(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).reply(404, { message: 'Request failed with status code 404' });

      await expect(getPokemonByName(pokemonName)).rejects.toThrow('Request failed with status code 404');
    });
  });

  describe('getAbility', () => {
    it('should fetch an ability by ID', async () => {
      const abilityId = 1;
      mock.onGet(`https://pokeapi.co/api/v2/ability/${abilityId}`).reply(200, mockAbilityData);

      const ability = await getAbility(abilityId);

      expect(ability).toEqual(mockAbilityData);
    });

    it('should handle errors when fetching an ability by ID', async () => {
      const abilityId = 999; 
      mock.onGet(`https://pokeapi.co/api/v2/ability/${abilityId}`).reply(404, { message: 'Request failed with status code 404' });

      await expect(getAbility(abilityId)).rejects.toThrow('Request failed with status code 404');
    });
  });
});
