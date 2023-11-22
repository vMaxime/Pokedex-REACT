import './css/Pokedex.css';

function PokemonCard({ id, imageSrc, name }) {
    return (
        <li className="pokemonCard boxShadow-2">
            <span className="pokemonId caption">#{id}</span>
            <img className="pokemonImage" src={imageSrc} alt="Pokemon illustration" />
            <span className="pokemonName text-3">{name}</span>
        </li>
    );
}

const defaultPokemon = {
    key: 0,
    id: 999,
    imageSrc: '/public/pokemon_skeleton.png',
    name: 'Pokémon Name'
};
const pokemons = [];
for (let i = 0; i < 9; i++)
    pokemons.push({...defaultPokemon, key: i})

/*
    TODO : 
    carré gris absolute pour les cartes
*/

function Pokedex() {
    return (<>
    <header>
        <svg width="24" height="24" viewBox="0 0 48 48" fill="#FFF" xmlns="http://www.w3.org/2000/svg">
            <path d="M29.7144 24C29.7144 27.1559 27.156 29.7143 24.0001 29.7143C20.8442 29.7143 18.2858 27.1559 18.2858 24C18.2858 20.8441 20.8442 18.2857 24.0001 18.2857C27.156 18.2857 29.7144 20.8441 29.7144 24Z"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M24.0001 48C36.0909 48 46.0934 39.0593 47.7571 27.4286H33.7006C32.2885 31.4235 28.4786 34.2857 24.0001 34.2857C19.5217 34.2857 15.7117 31.4235 14.2997 27.4286H0.243164C1.90681 39.0593 11.9094 48 24.0001 48ZM14.2997 20.5714H0.243164C1.90681 8.94071 11.9094 0 24.0001 0C36.0909 0 46.0934 8.94071 47.7571 20.5714H33.7006C32.2885 16.5765 28.4786 13.7143 24.0001 13.7143C19.5217 13.7143 15.7117 16.5765 14.2997 20.5714ZM29.7144 24C29.7144 27.1559 27.156 29.7143 24.0001 29.7143C20.8442 29.7143 18.2858 27.1559 18.2858 24C18.2858 20.8441 20.8442 18.2857 24.0001 18.2857C27.156 18.2857 29.7144 20.8441 29.7144 24Z"/>
        </svg>
        <h1 className="headline">Pokédex</h1>
        <div className="searchBar boxShadow-2 inset">
            <svg width="16" height="16" viewBox="0 0 12 13" fill="var(--primary)" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.9 12.6167L6.88333 8.6C6.55 8.88889 6.16111 9.11389 5.71667 9.275C5.27222 9.43612 4.8 9.51667 4.3 9.51667C3.1 9.51667 2.08333 9.1 1.25 8.26667C0.416667 7.43334 0 6.42778 0 5.25C0 4.07223 0.416667 3.06667 1.25 2.23334C2.08333 1.4 3.09444 0.983337 4.28333 0.983337C5.46111 0.983337 6.46389 1.4 7.29167 2.23334C8.11944 3.06667 8.53333 4.07223 8.53333 5.25C8.53333 5.72778 8.45555 6.18889 8.3 6.63334C8.14444 7.07778 7.91111 7.49445 7.6 7.88334L11.65 11.9C11.75 11.9889 11.8 12.1028 11.8 12.2417C11.8 12.3806 11.7444 12.5056 11.6333 12.6167C11.5333 12.7167 11.4111 12.7667 11.2667 12.7667C11.1222 12.7667 11 12.7167 10.9 12.6167ZM4.28333 8.51667C5.18333 8.51667 5.95 8.19723 6.58333 7.55834C7.21667 6.91945 7.53333 6.15 7.53333 5.25C7.53333 4.35 7.21667 3.58056 6.58333 2.94167C5.95 2.30278 5.18333 1.98334 4.28333 1.98334C3.37222 1.98334 2.59722 2.30278 1.95833 2.94167C1.31944 3.58056 1 4.35 1 5.25C1 6.15 1.31944 6.91945 1.95833 7.55834C2.59722 8.19723 3.37222 8.51667 4.28333 8.51667Z"/>
            </svg>
            <input type="text" name="search" placeholder="Search" />
        </div>
        <button type="button" className="filter boxShadow-2 inset">
            <svg width="16" height="12" viewBox="0 0 12 8" fill="var(--primary)" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.5 8H0.5C0.355556 8 0.236111 7.95278 0.141667 7.85833C0.0472223 7.76389 0 7.64444 0 7.5C0 7.35556 0.0472223 7.23611 0.141667 7.14167C0.236111 7.04722 0.355556 7 0.5 7H3.5C3.64444 7 3.76389 7.04722 3.85833 7.14167C3.95278 7.23611 4 7.35556 4 7.5C4 7.64444 3.95278 7.76389 3.85833 7.85833C3.76389 7.95278 3.64444 8 3.5 8ZM11.5 1H0.5C0.355556 1 0.236111 0.952778 0.141667 0.858333C0.0472223 0.763889 0 0.644444 0 0.5C0 0.355556 0.0472223 0.236111 0.141667 0.141667C0.236111 0.0472223 0.355556 0 0.5 0H11.5C11.6444 0 11.7639 0.0472223 11.8583 0.141667C11.9528 0.236111 12 0.355556 12 0.5C12 0.644444 11.9528 0.763889 11.8583 0.858333C11.7639 0.952778 11.6444 1 11.5 1ZM7.5 4.5H0.5C0.355556 4.5 0.236111 4.45278 0.141667 4.35833C0.0472223 4.26389 0 4.14444 0 4C0 3.85556 0.0472223 3.73611 0.141667 3.64167C0.236111 3.54722 0.355556 3.5 0.5 3.5H7.5C7.64444 3.5 7.76389 3.54722 7.85833 3.64167C7.95278 3.73611 8 3.85556 8 4C8 4.14444 7.95278 4.26389 7.85833 4.35833C7.76389 4.45278 7.64444 4.5 7.5 4.5Z"/>
            </svg>
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