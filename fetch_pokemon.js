//Fetch pokemon script



const pokemonList = document.querySelector('.pokemon-list');
const pokemonPicture = document.querySelector('.pokemon-image')
const infoTab = document.querySelector('.info-container');


const pokemonName = document.querySelector('.pokemon-name');
const pokemonAbility = document.querySelector('.pokemon-ability');
const pokemonHeight = document.querySelector('.pokemon-height');
const pokemonWeight = document.querySelector('.pokemon-weight');
const pokemonDescription = document.querySelector('.pokemon-description');


fetch("https://pokeapi.co/api/v2/pokemon?limit=386")
  .then(response => response.json())
  .then(data => data.results.forEach((pokemon) => {
  let letters = pokemon.name.split('')
  letters[0] = letters[0].toUpperCase()
  let pokemonC = letters.join('')
  if (pokemonCounter === 386) {
    pokemonC = pokemonC.split('-')
    pokemonC = pokemonC[0]
  }


  pokemonList.insertAdjacentHTML('beforeend', `
      <li>
        <div data-id="${pokemonCounter}" class="pokemon ${pokemonCounter === 386 ? "last" : ""}">
          <div class="thumb"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonCounter}.png"></div>
          <div class="id">#${pokemonCounter}</div>
          <div class="name">${pokemonC}</div>
        </div>
      </li>
    `)
  pokemonCounter++
  }))

function showData() {
  const id = this.getAttribute("data-id")

  const displayPokemon = {}

  fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
    .then(response => response.json())
    .then((data) => displayPokemon['description'] = data.flavor_text_entries[1].flavor_text)

  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(response => response.json())
    .then((data) => {

      displayPokemon["height"] = data.height * 10
      displayPokemon["weight"] = Math.ceil(data.weight / 10)


      let letters = data.forms[0].name.split('')
      letters[0] = letters[0].toUpperCase()
      displayPokemon['name']= letters.join('')

      let letters2 = data.abilities[0].ability.name.split('')
      letters2[0] = letters2[0].toUpperCase()
      displayPokemon['ability'] = letters2.join('')

    pokemonPicture.innerHTML = `
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png"
      class="pokemon-main-picture">
      `

    pokemonName.innerHTML = displayPokemon.name
    pokemonAbility.innerHTML = displayPokemon.ability
    pokemonHeight.innerHTML = displayPokemon.height >= 100 ? `${(displayPokemon.height / 100).toFixed(2)}m` : `${displayPokemon.height}cm`
    pokemonWeight.innerHTML = displayPokemon.weight + "kg"
      pokemonDescription.innerHTML = (displayPokemon.description === undefined) ? "Description failed to load" : displayPokemon.description

    })

    console.log(displayPokemon)
}

setTimeout(() => {
  pokemons = document.querySelectorAll('.pokemon');
  pokemons.forEach((pokemon) => {
    pokemon.addEventListener('click', showData)
  })
}, 100);
