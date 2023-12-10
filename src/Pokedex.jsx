import './css/Pokedex.css';
import PokeballSVG from './assets/pokeball.svg?react';
import SearchSVG from './assets/search.svg?react';
import FilterSVG from './assets/filter.svg?react';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api.js';
import utils from './utils.js';

const defaultPokemon = {
    id: null,
    imageSrc: '/img/pokemon_skeleton.png',
    name: 'Pokémon Name'
};

function PokemonCard({ data }) {
    const navigate = useNavigate();
    const imageSkeleton = useRef();
    const image = useRef();
    const handleClick = e => {
        e.preventDefault();
        if (data.id != null)
            navigate('/pokemon/' + data.name);
    }

    return (
        <li id={data.id === null ? null : 'pokemon' + data.id} className="pokemonCard boxShadow-2" onClick={handleClick}>
            <span className="pokemonId caption">#{data.id || 999}</span>
            <img ref={image} className="pokemonImage" src={data.imageSrc} alt="Pokemon front" />
            <span className="pokemonName text-3">{data.name}</span>
            <div className="pokemonNameBackground"></div>
        </li>
    );
}

function Pokedex({ pokemons, setPokemons, search, setSearch, sort, setSort }) {

    const [loading, setLoading] = useState(false);
    const [searching, setSearching] = useState(false);

    const searchInput = useRef();
    const searchTimeoutId = useRef(null);
    
    const beautifulSetSearching = (executeAt, value) => {
        executeAt = executeAt - Date.now();
        if (executeAt<=0) setSearching(value);
        else setTimeout(() => setSearching(value), executeAt);
    }
    
    useEffect(() => {
        if (search.length) {
            searchInput.current.value = search;
            const pokemon = pokemons.find(pokemon => pokemon.name.toLowerCase() === search.toLowerCase());
            if (pokemon)
                return
            else {
                const setSearchingFalseAt = Date.now() + 1000;
                setSearching(true);
                api.getPokemon(search)
                    .then(pokemonData => {
                        const newPokemon = utils.serializePokemonData(pokemonData);
                        setPokemons([...pokemons, newPokemon]);
                        beautifulSetSearching(setSearchingFalseAt, false);
                    })
                    .catch(() => {
                        beautifulSetSearching(setSearchingFalseAt, false);
                    });
            }
                    
            return;
        }
      }, [search]);

    const handleInput = e => {
        if (searching || e.target.value === search) {
            e.target.value = search;
            return;
        }
        if (searchTimeoutId.current != null)
            clearTimeout(searchTimeoutId.current);
        searchTimeoutId.current = setTimeout(() => {
            searchTimeoutId.current = null;
            setSearch(e.target.value);
        }, 1000);
    };

    const handleScroll = e => {
        if (loading)
            return;

        const scrollTop = e.target.scrollTop;
        const scrollHeight = e.target.scrollHeight - e.target.clientHeight;

        if (((scrollTop / scrollHeight) * 100).toFixed(2) >= 90) {
            setLoading(true);
            const promises = [];
            for (let i = pokemons.length + 1; i <= pokemons.length + 9; i++) {
                promises.push(api.getPokemon(i));
            }
            Promise.all(promises)
                .then(newPokemons => {
                    newPokemons = newPokemons.map(utils.serializePokemonData);
                    setPokemons([...pokemons, ...newPokemons]);
                    setLoading(false);
                });
        }
    };

    const visiblePokemons = !search ? pokemons : pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(search.toLowerCase()));

    const pokemonCards = visiblePokemons.map(pokemon => (
        <PokemonCard key={pokemon.id} data={pokemon} />
    ));

    return (<>
    <header id="pokedex" className="pokedexTheme">
        <PokeballSVG height="24" width="24" />
        <h1 className="headline">Pokédex</h1>
        <div className="searchBar boxShadow-2 inset">
            <SearchSVG height="16" width="16" />
            <input ref={searchInput} type="text" name="search" placeholder="Search" className={'text-3' + (searching ?  ' cursorWait' : '')} onChange={handleInput} />
        </div>
        <button type="button" className="dropdown filter boxShadow-2 inset">
            <FilterSVG width="16" height="12" />
            <div className="dropdownMenu">
                <div className="text-2" style={{ margin: '16px 38px 16px 24px' }}>Sort by :</div>
                <div className="sortBox">
                    <input type="radio" name="sort" id="sortByNumber" checked={sort === 'number'} onChange={() => setSort('number')} />
                    <label htmlFor="sortByNumber" className="text-3">Number</label>
                    <input type="radio" name="sort" id="sortByName" checked={sort === 'name'} onChange={() => setSort('name')} />
                    <label htmlFor="sortByName" className="text-3">Name</label>
                </div>
            </div>
        </button>
    </header>
    <main className={'pokedexTheme' + (searching ? ' cursorWait' : '')}>
        <ul className="pokemonList boxShadow-2 inset" onScroll={handleScroll}>
            {
                pokemonCards
            }
            {
                !search || loading ? Array(search ? 1 : 9).fill().map((ignore, index) => 
                    <PokemonCard key={'default' + index} data={{...defaultPokemon}} />
                ) : ''
            }
            {
                !searching && !visiblePokemons.length && search.length
                ? <span className="text-3" style={{ color: 'var(--primary)' }}>Could not find Pokémon <b>{search}</b>.. Try searching the complete name.</span>
                : ''
            }
        </ul>
    </main>
    </>);
}

export default Pokedex;