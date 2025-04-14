let offset = 0;
const limit = 10;
const baseApiUrl = "https://pokeapi.co/api/v2/pokemon";

const mainContainerEl = document.getElementById("main-container");
const errorEl = document.getElementById("error-message");
const btnNext = document.getElementById("btn-next");
const btnPrev = document.getElementById("btn-prev");
const btnSearch = document.getElementById("btn-search");
const inputSearch = document.getElementById("search-text");
const btnHome = document.getElementById("btn-home");

function clearMainContainer() {
    mainContainerEl.innerHTML = "";
    errorEl.style.display = "none";
}

const loadingSpinner = document.getElementById("loading-spinner");

function showSpinner() {
    loadingSpinner.style.display = "block";
}

function hideSpinner() {
    loadingSpinner.style.display = "none";
}

function captilizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


// Get JSON data from URL
async function getData(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error("API Error");
    return await res.json();
}

// Show one Pokémon with full info
async function displayPokemonDetails(pokemon) {
    try {
        showSpinner();
        clearMainContainer();

        let url = typeof pokemon === "string" ? `${baseApiUrl}/${pokemon.toLowerCase()}` : pokemon.url;
        const data = await getData(url);

        const wrapper = document.createElement("div");
        wrapper.style.outline = "2px solid green";
        wrapper.style.padding = "10px";

        const name = document.createElement("h2");
        name.textContent = captilizeFirstLetter(data.name);

        const image = document.createElement("img");
        image.src = data.sprites.other["official-artwork"].front_default;
        image.alt = data.name;
        image.style.width = "200px";

        const types = document.createElement("p");
        types.textContent = `Types: ${data.types.map(t => t.type.name).join(", ")}`;

        const abilities = document.createElement("p");
        abilities.textContent = `Abilities: ${data.abilities.map(a => a.ability.name).join(", ")}`;

        const stats = document.createElement("ul");
        stats.textContent = "Stats:";
        data.stats.forEach(stat => {
            const li = document.createElement("li");
            li.textContent = `${stat.stat.name}: ${stat.base_stat}`;
            stats.appendChild(li);
        });

        wrapper.append(name, image, types, abilities, stats);
        mainContainerEl.append(wrapper);
    } catch (err) {
        showError("Pokémon not found.");
    } finally {
        hideSpinner();
    }
}

// Show a list of Pokémon with names and images
async function displayPokemonList() {
    try {
        showSpinner();
        clearMainContainer();
        const url = `${baseApiUrl}?offset=${offset}&limit=${limit}`;
        const list = await getData(url);

        for (const pokemon of list.results) {
            const data = await getData(pokemon.url);

            const wrapper = document.createElement("div");
            wrapper.style.outline = "2px solid blue";
            wrapper.style.margin = "10px";
            wrapper.style.cursor = "pointer";
            wrapper.style.display = "inline-block";
            wrapper.style.width = "150px";
            wrapper.style.textAlign = "center";

            const name = document.createElement("h3");
            name.textContent = captilizeFirstLetter(data.name);

            const image = document.createElement("img");
            image.src = data.sprites.other["official-artwork"].front_default;
            image.alt = data.name;
            image.style.width = "100px";

            wrapper.append(name, image);
            wrapper.addEventListener("click", () => displayPokemonDetails(pokemon));

            mainContainerEl.append(wrapper);
        }
    } catch (err) {
        showError("Failed to load Pokémon list.");
    } finally {
        hideSpinner();
    }
}

function showError(message) {
    errorEl.style.display = "block";
    errorEl.textContent = message;
}

// === Event Listeners ===
btnNext.addEventListener("click", () => {
    offset += limit;
    displayPokemonList();
});

btnPrev.addEventListener("click", () => {
    if (offset >= limit) {
        offset -= limit;
        displayPokemonList();
    }
});

btnSearch.addEventListener("click", () => {
    const query = inputSearch.value.trim();
    if (query) {
        displayPokemonDetails(query);
    }
});

btnHome.addEventListener("click", () => {
    displayPokemonList();
});

// Load list on page start
displayPokemonList();
