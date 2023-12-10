import './css/normalize.css';
import './css/PokemonDetail.css';
import ArrowLeftSVG from './assets/arrow_left.svg?react';
import PokeballSVG from './assets/pokeball.svg?react';
import Carousel from './components/Carousel.jsx';
import PokemondeDetailCard from './components/PokemonDetailCard.jsx';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from './api.js';
import utils from './utils.js';

function PokemonDetail({ pokemons, setPokemons }) {
    const [pokemon, setPokemon] = useState(null);
    const params = useParams();

    useEffect(() => {
        const { pokemonName } = params;
        const pokemon = pokemons.find(pokemon => pokemon.name === pokemonName);

        if (pokemon != undefined && pokemon.hasOwnProperty('id')) {
            setPokemon(pokemon);
            return;
        }

        api.getPokemon(pokemonName)
            .then(pokemonData => {
                const newPokemon = utils.serializePokemonData(pokemonData);
                setPokemons(pokemons.map(currentPokemon => currentPokemon.name === pokemonName ? newPokemon : currentPokemon));
                setPokemon(newPokemon);
            });
    }, []);
    
    return (<>
        <header id="pokemonDetail" className="pokemonDetailTheme">
            <Link to={'/'} className="arrowLeft">
                <ArrowLeftSVG height="32" width="32" className="zIndex-1" />
            </Link>
            <h1 className="headline zIndex-1">{pokemon ? pokemon.name : 'Pokémon Name'}</h1>
            <h2 className="subtitle-2 zIndex-1">#{pokemon ? pokemon.id : 999}</h2>
            <PokeballSVG height="208" width="208" className="pokeBall" />
        </header>
        <main className="pokemonDetailTheme">
            <Carousel pokemon={pokemon} />
            <PokemondeDetailCard pokemon={pokemon} />
        </main>
    </>);
}

export default PokemonDetail;
