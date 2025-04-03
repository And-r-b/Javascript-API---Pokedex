// API root url
const apiUrl = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=10"

// gets data from given url param
// return a promise with data or and error
async function getData(url) {
    const request = await fetch(apiUrl)
    const data = await request.json()
    
    //console.log(data)
    return data
}

// let myData = getData(apiUrl)
// console.log(myData)

// get html elements
const mainContainerEl = document.getElementById("main-container")

// Displays details about a pokemon in the mainContainerEl
function displayPokemon() {

}
// Display a list of pokemona in the mainContainerEl
function displayPokemonList(pokemonList) {
    let onePokemon = pokemonList[0]

    // mainContainerEl.innerHTML += onePokemon.name

    document.createElement("h3") // for name
    // later on: image tag, list of starts, url to pokemon - detail page?
}

let testPokemonList = [
    {"name":"bulbasaur","url":"https://pokeapi.co/api/v2/pokemon/1/"},
    {"name":"ivysaur","url":"https://pokeapi.co/api/v2/pokemon/2/"}
]


displayPokemonList(testPokemonList);