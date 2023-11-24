import './css/Pokedex.css';
import PokeballSVG from './assets/pokeball.svg?react';
import SearchSVG from './assets/search.svg?react';
import FilterSVG from './assets/filter.svg?react';

function PokemonCard({ id, imageSrc, name }) {
    return (
        <li className="pokemonCard boxShadow-2">
            <span className="pokemonId caption">#{id}</span>
            <img className="pokemonImage" src={imageSrc} alt="Pokemon illustration"/>
            <span className="pokemonName text-3">{name}</span>
            <div className="pokemonNameBackground"></div>
        </li>
    );
}

const defaultPokemon = {
    key: 0,
    id: 999,
    imageSrc: '/img/pokemon_skeleton.png',
    name: 'Pokémon Name'
};
const pokemons = [];
for (let i = 0; i < 9; i++)
    pokemons.push({...defaultPokemon, key: i})

function Pokedex() {
    return (<>
    <header>
        <PokeballSVG height="24" width="24" />
        <h1 className="headline">Pokédex</h1>
        <div className="searchBar boxShadow-2 inset">
            <SearchSVG height="16" width="16" />
            <input type="text" name="search" placeholder="Search" className="text-3" />
        </div>
        <button type="button" className="filter boxShadow-2 inset">
            <FilterSVG width="16" height="12" />
        </button>
    </header>
    <main>
        <ul className="pokemonList boxShadow-2 inset">
            {
                pokemons.map(pokemon => 
                    <PokemonCard key={pokemon.key} id={pokemon.id} imageSrc={pokemon.imageSrc} name={pokemon.name} />
                )
            }
        </ul>
    </main>
    </>);
}

export default Pokedex;