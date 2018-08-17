const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.getElementsByTagName('main')[0]

//initialize fetch request
fetch(TRAINERS_URL)
  .then(res=>res.json())
  .then(data=>trainerCard(data))

//helper function to generate each card's html
const displayCard = (trainer) => {
  return `<div class='card'>
    <p>${trainer.name}</p>
    <button class='add'>Add Pokemon</button>
    <ul id=${trainer.id}>
      ${trainer.pokemons.map((pokemon)=>{
        return `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
      }).join('')
      }
    </ul>
    </div>`
}

//helper function for initialize fetch request
//display each card & add event listener for 'add pokemon' button
const trainerCard = (data) => {
  data.forEach((trainer)=>{
    let cardHTML = displayCard(trainer)
    main.innerHTML += cardHTML
  })
  const addPokemonBtnsArray = [...document.getElementsByClassName('add')]
  addPokemonBtnsArray.forEach((addPokemonBtn, index) =>{
    addPokemonBtn.addEventListener('click',()=>{
      fetch_pokemon(index+1)
    })
  })
  //add event listener for release button - delegation
  const cardsArray = [...document.getElementsByClassName('card')]
  cardsArray.forEach((card)=>{
    card.addEventListener('click', (e)=>{
      if(e.target.innerText === 'Release'){
        // debugger
        delete_pokemon(e.target.getAttribute('data-pokemon-id'))
        e.target.parentElement.remove()
      }
    })
  })
}



//helper function for add pokemon button event handler
const fetch_pokemon = (trainer_id)=>{
  // debugger
  fetch(POKEMONS_URL, {
    method: 'POST',
    body: JSON.stringify({"trainer_id": trainer_id}),
    headers: {'Content-Type': 'application/json'}
  })
    .then(res=>res.json())
    .then(pokemon => renderPokemon(pokemon))
}

const renderPokemon = (pokemon) =>{
  // debugger
  let pokemonList = document.getElementById(pokemon.trainer_id)
  pokemonList.innerHTML += `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
}

//delete pokemon button event handler
const delete_pokemon = (pokemon_id)=>{
  fetch(POKEMONS_URL + '/'+ pokemon_id, {
    method: 'DELETE',
  })
    .then(res=>res.json())
    .then(console.log)
}
