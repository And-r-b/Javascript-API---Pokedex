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

// Show one Pokémon with full info in a modal
async function displayPokemonDetails(pokemon) {
    try {
        showSpinner();
        clearMainContainer();

        let url = typeof pokemon === "string" ? `${baseApiUrl}/${pokemon.toLowerCase()}` : pokemon.url;
        const data = await getData(url);

        // Fill in the modal with the Pokémon's details
        document.getElementById("pokemon-name").textContent = captilizeFirstLetter(data.name);
        document.getElementById("pokemon-image").src = data.sprites.other["official-artwork"].front_default;
        document.getElementById("pokemon-image").alt = data.name;
        
        // Display types
        document.getElementById("pokemon-types").textContent = `Types: ${data.types.map(t => t.type.name).join(", ")}`;
        
        // Display abilities
        document.getElementById("pokemon-abilities").textContent = `Abilities: ${data.abilities.map(a => a.ability.name).join(", ")}`;
        
        // Display stats
        const statsList = document.getElementById("pokemon-stats");
        statsList.innerHTML = ''; // Clear previous stats
        data.stats.forEach(stat => {
            const li = document.createElement("li");
            li.textContent = `${stat.stat.name}: ${stat.base_stat}`;
            statsList.appendChild(li);
        });

        // Display the modal
        document.getElementById("modal").style.display = "flex";
    } catch (err) {
        showError("Pokémon not found.");
    } finally {
        hideSpinner();
    }
}

// Close the modal
function closeModal() {
    document.getElementById("modal").style.display = "none";
}

// Event listener for closing modal when clicking outside the modal content
document.getElementById("modal").addEventListener("click", (e) => {
    if (e.target === document.getElementById("modal")) {
        closeModal();
    }
});

// Show a list of Pokémon with names and images
async function displayPokemonList() {
    try {
        showSpinner();
        clearMainContainer();
        const url = `${baseApiUrl}?offset=${offset}&limit=${limit}`;
        const list = await getData(url);

        for (const pokemon of list.results) {
            const data = await getData(pokemon.url);

            // Create a wrapper for each Pokémon card
            const wrapper = document.createElement("div");
            wrapper.className = "pokemon-card"; // instead of inline styles

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
