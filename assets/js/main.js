const pokemonList = document.querySelector('.pokemons');

async function fetchPokemons() {
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=100';
  const response = await fetch(url);
  const data = await response.json();
  const pokemons = data.results;

  for (let i = 0; i < pokemons.length; i++) {
    await addPokemon(pokemons[i], i + 1);
  }
}

async function addPokemon(pokemon, id) {
  const response = await fetch(pokemon.url);
  const data = await response.json();

  const mainType = data.types[0].type.name; // Get the primary type
  const listItem = document.createElement('li');
  listItem.classList.add('pokemon', mainType); // Add type class to the list item itself

  listItem.innerHTML = `
        <span class="number">#${id.toString().padStart(3, '0')}</span>
        <span class="name">${
          pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
        }</span>
        <div class="details">
          <ol class="types">
            ${data.types
              .map((type) => `<li class="type">${type.type.name}</li>`)
              .join('')}
          </ol>
          <img src="${data.sprites.front_default}" alt="${pokemon.name}">
        </div>
    `;

  pokemonList.appendChild(listItem);
}

fetchPokemons();
