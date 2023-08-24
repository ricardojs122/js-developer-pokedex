
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const pokemonNumber = getParameterByName('number');

async function loadPokemonDetails(pokemonNumber) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`);
        if (!response.ok) {
            throw new Error('Failed to fetch data from API');
        }
        const data = await response.json();

        const abilities = data.abilities.map(ability => ability.ability.name).join(', ');
        const stats = data.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join(', ');
        const weight = data.weight;
        const height = data.height;
        const frontSprite = data.sprites.front_default;
        const backSprite = data.sprites.back_default;
        const hp = data.stats.find(stat => stat.stat.name === 'hp').base_stat;
        const attack = data.stats.find(stat => stat.stat.name === 'attack').base_stat;
        const defense = data.stats.find(stat => stat.stat.name === 'defense').base_stat;
        const speed = data.stats.find(stat => stat.stat.name === 'speed').base_stat;

        const detailsContainer = document.getElementById('pokemonDetails');
        detailsContainer.innerHTML = `
            <h2>${data.name}</h2>
            <p>Number: ${data.id}</p>
            <p>Type: ${data.types.map(type => type.type.name).join(', ')}</p>
            <p>Abilities: ${abilities}</p>
            <p>HP: ${hp}</p>
            <p>Attack: ${attack}</p>
            <p>Defense: ${defense}</p>
            <p>Speed: ${speed}</p>
            <p>Weight: ${weight}</p>
            <p>Height: ${height}</p>
            <img src="${frontSprite}" alt="${data.name} - Front">
            <img src="${backSprite}" alt="${data.name} - Back">
            <!-- Adicione mais informações conforme necessário -->
        `;
    } catch (error) {
        
        console.error('Error:', error);
    }
}


loadPokemonDetails(pokemonNumber);
const backButton = document.getElementById('backButton');
backButton.addEventListener('click', () => {
    history.back(); // Volta à página anterior
});