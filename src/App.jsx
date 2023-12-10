import './css/normalize.css';
import './css/App.css';
import Pokedex from './Pokedex';
import PokemonDetail from './PokemonDetail';
import { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import api from './api';
import utils from './utils';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [sort, setSort] = useState('number');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const promises = [];
    for (let i = 1; i <= 9; i++) {
      promises.push(api.getPokemon(i));
    }
    Promise.all(promises)
      .then(newPokemons => {
        newPokemons = newPokemons.map(utils.serializePokemonData);
        setPokemons(newPokemons);
      });
  }, []);

  const sortedPokemons = pokemons.sort((a,b) => sort === 'name' ? a.name.localeCompare(b.name) : a.id - b.id);
  return (
    <Routes>
        <Route path="/" index element={<Pokedex pokemons={sortedPokemons} setPokemons={setPokemons} search={search} setSearch={setSearch} sort={sort} setSort={setSort} />} />
        <Route path="/pokemon/:pokemonName" element={<PokemonDetail pokemons={sortedPokemons} setPokemons={setPokemons} />} />
    </Routes> 
  );
}

export default App;
