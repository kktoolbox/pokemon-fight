import pokemonTypes from './pokemonTypes.json';

export const getPokemonTypeBySid = (sid) => {
    return pokemonTypes.find(pokemonType => pokemonType.sid === sid)
}