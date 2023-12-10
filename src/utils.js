export default {

    isElementInViewPort: element => {
        let rect = element.getBoundingClientRect();
        let viewPortBottom = window.innerHeight || document.documentElement.clientHeight;
        let viewPortRight = window.innerWidth || document.documentElement.clientWidth;
    
        let isTopInViewPort = rect.top >= 0,
            isLeftInViewPort = rect.left >= 0,
            isBottomInViewPort = rect.bottom <= viewPortBottom,
            isRightInViewPort = rect.right <= viewPortRight;
    
       return isTopInViewPort && isLeftInViewPort && isBottomInViewPort && isRightInViewPort;
    },

    serializePokemonData: pokemonData => ({
        id: pokemonData.id,
        name: pokemonData.name,
        types: pokemonData.types.map(type => type.type.name),
        height: pokemonData.height,
        weight: pokemonData.weight,
        abilities: pokemonData.abilities.map(ability => ability.ability.name),
        imageSrc: pokemonData.sprites.other['official-artwork'].front_default,
        hp: pokemonData.stats.find(stat => stat.stat.name === 'hp').base_stat,
        atk: pokemonData.stats.find(stat => stat.stat.name === 'attack').base_stat,
        def: pokemonData.stats.find(stat => stat.stat.name === 'defense').base_stat,
        satk: pokemonData.stats.find(stat => stat.stat.name === 'special-attack').base_stat,
        sdef: pokemonData.stats.find(stat => stat.stat.name === 'special-defense').base_stat,
        spd: pokemonData.stats.find(stat => stat.stat.name === 'speed').base_stat,
        description: pokemonData.description.replaceAll('\f', ' ').replaceAll('POKéMON', 'POKÉMON')
    })

}