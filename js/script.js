// API root url
const apiUrl = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=10"


async function getData() {
    const request = await fetch(apiUrl)
    const data = await request.json()
    
    //console.log(data)
}
getData();