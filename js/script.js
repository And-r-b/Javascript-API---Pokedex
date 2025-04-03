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
async function displayPokemonDetails(data) {
    
    const pokemonDetails = await getData(data.url)
    console.log(pokemonDetails)

    const wrapperEl = document.createElement("div") // wrapper for each pokemon
    wrapperEl.style.outline = "2px solid blue"
    const pokemonName = document.createElement("h3") // for name
    const pokemonImage = document.createElement("img") // for img

    wrapperEl.append(pokemonName, pokemonImage)

    pokemonName.textContent = data.name
    pokemonImage.alt = data.name

    // clear the page and display the pokemon
    mainContainerEl.innerHTML = ""
    mainContainerEl.append(wrapperEl)
}
// Display a list of pokemona in the mainContainerEl
// function recives a promise object
async function displayPokemonList(pokemonListPromise) {
    
    const pokemonList = await pokemonListPromise

    
    pokemonList.results.forEach(pokemon => {
        const wrapperEl = document.createElement("div") // wrapper for each pokemon
        wrapperEl.style.outline = "2px solid blue"
        const pokemonName = document.createElement("h3") // for name
        const pokemonImage = document.createElement("img") // for img
    
        wrapperEl.append(pokemonName, pokemonImage)
    
        pokemonName.textContent = pokemon.name
        pokemonImage.alt = pokemon.name
        // add click event int to the wrapperEl
        wrapperEl.addEventListener("click", () => displayPokemonDetails("hi"))
    
        mainContainerEl.append(wrapperEl)
        // later on: image tag, list of starts, url to pokemon - detail page?
    });


}

// let testPokemonList = [
//     {"name":"bulbasaur","url":"https://pokeapi.co/api/v2/pokemon/1/"},
//     {"name":"ivysaur","url":"https://pokeapi.co/api/v2/pokemon/2/"}
// ]


displayPokemonList(getData(apiUrl));