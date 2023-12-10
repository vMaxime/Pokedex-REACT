import '../css/PokemonDetailCard.css';
import BalanceSVG from '../assets/balance.svg?react';
import RuleSVG from '../assets/rule.svg?react';

function ProgressBar({ value, max, color, opacity }) {
    const percent = Math.min(value, max) / (max || 100) * 100;
    return (
        <div style={{ width: '100%', height: '16px', display: 'flex', alignItems: 'center', opacity }}>
            <div style={{ width: '100%', height: '4px', backgroundColor: 'var(--wireframe)', borderRadius: '4px' }}>
                <div style={{ height: '100%', width: percent + '%', backgroundColor: color }}></div>
            </div>
        </div>
    );
}

export default function PokemonDetailCard({ pokemon }) {
    const data = {
        types: pokemon ? pokemon.types : ['Type', 'Type'],
        abilities: pokemon ? pokemon.abilities : ['Ability 1', 'Ability 2'],
        weight: pokemon ? pokemon.weight : '9,9',
        height: pokemon ? pokemon.height : '9,9',
        hp: pokemon ? pokemon.hp : 999,
        atk: pokemon ? pokemon.atk : 999,
        def: pokemon ? pokemon.def : 999,
        satk: pokemon ? pokemon.satk : 999,
        sdef: pokemon ? pokemon.sdef : 999,
        spd: pokemon ? pokemon.spd : 999,
        description: pokemon ? pokemon.description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc iaculis eros vitae tellus condimentum maximus sit amet in eros.',
    }

    const typeColor = pokemon ? data.types[0] : false;
    const statNameClassName = 'text-3' + (pokemon ? ' color-' + typeColor : '');

    return (
        <div className="pokemonDetailCard boxShadow-2 inset">
            <section className="pokemonTypes">
                {
                    data.types.map((type, index) => 
                        <div className={type !== 'Type' ? 'pokemonType subtitle-3 ' + type : ''} key={index}>{type}</div>
                    )
                }
            </section>
            <h3 className={'subtitle-1' + (pokemon ? ' color-' + data.types[0] : '')}>About</h3>
            <section className="about">
                <div>
                    <div>
                        <BalanceSVG height="16" width="16" />
                        <span className="text-3">{data.weight} kg</span>
                    </div>
                    <span className="caption">Weight</span>
                </div>
                <div>
                    <div>
                        <RuleSVG height="16" width="16" />
                        <span className="text-3">{data.height} m</span>
                    </div>
                    <span className="caption">Height</span>
                </div>
                <div>
                    {
                        data.abilities.map(ability => 
                            <span className="text-3 ability" key={ability}>{ability.replaceAll('-', ' ')}</span>
                        )
                    }
                    <span className="caption">Moves</span>
                </div>
            </section>
            <p className="text-3">{data.description}</p>
            <h3 className={'subtitle-1' + (pokemon ? ' color-' + data.types[0] : '')}>Base Stats</h3>
            <section className="stats">
                <div className="names">
                    <span className={statNameClassName}>HP</span>
                    <span className={statNameClassName}>ATK</span>
                    <span className={statNameClassName}>DEF</span>
                    <span className={statNameClassName}>SATK</span>
                    <span className={statNameClassName}>SDEF</span>
                    <span className={statNameClassName}>SPD</span>
                </div>
                <div className="separator"></div>
                <div className="values">
                    <span className="text-3">{data.hp}</span>
                    <span className="text-3">{data.atk}</span>
                    <span className="text-3">{data.def}</span>
                    <span className="text-3">{data.satk}</span>
                    <span className="text-3">{data.sdef}</span>
                    <span className="text-3">{data.spd}</span>
                </div>
                <div className="bars">
                    <ProgressBar value={data.hp} max={255} color={'var(--' + ('color-' + typeColor || 'light') + ')'} opacity={pokemon ? '1' : '.5'} />
                    <ProgressBar value={data.atk} max={255} color={'var(--' + ('color-' + typeColor || 'light') + ')'} opacity={pokemon ? '1' : '.5'} />
                    <ProgressBar value={data.def} max={230} color={'var(--' + ('color-' + typeColor || 'light') + ')'} opacity={pokemon ? '1' : '.5'} />
                    <ProgressBar value={data.satk} max={194} color={'var(--' + ('color-' + typeColor || 'light') + ')'} opacity={pokemon ? '1' : '.5'} />
                    <ProgressBar value={data.sdef} max={230} color={'var(--' + ('color-' + typeColor || 'light') + ')'} opacity={pokemon ? '1' : '.5'} />
                    <ProgressBar value={data.spd} max={180} color={'var(--' + ('color-' + typeColor || 'light') + ')'} opacity={pokemon ? '1' : '.5'} />
                </div>
            </section>
        </div>
    );
}