export default {
    getPokemon: name => {
        return new Promise((resolve, reject) => {
            let pokemon = {};
            let shouldResolve = false;
            fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
                .then(response => response.json())
                .then(data => {
                    pokemon = Object.assign(pokemon, data);
                    if (shouldResolve)
                        resolve(pokemon);
                    else shouldResolve = true;
                })
                .catch(reject)
            fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
                .then(response => response.json())
                .then(data => {
                    pokemon = Object.assign(pokemon, {description: data.flavor_text_entries[0].flavor_text});
                    if (shouldResolve)
                        resolve(pokemon);
                    else shouldResolve = true;
                })
                .catch(reject)
        });
    }

}