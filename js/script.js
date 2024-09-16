document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch data pokemon dari file JSON
        const res = await fetch('./db/pokemon.json');
        const pokemonData = await res.json();
        
        // Ambil semua elemen DOM
        const pokemonList = document.getElementById('pokemonList');
        const pokemonName = document.getElementById('pokemonName');
        const pokemonImage = document.getElementById('pokemonImage');
        const pokemonDescription = document.getElementById('pokemonDescription');
        const pokemonTypes = document.getElementById('pokemonTypes');
        const pokemonHeight = document.getElementById('pokemonHeight');
        const pokemonWeight = document.getElementById('pokemonWeight');
        const pokemonAbilities = document.getElementById('pokemonAbilities');
        const pokemonStats = document.getElementById('pokemonStats');
        
        // Tampilkan daftar Pokemon
        pokemonData.forEach((pokemon, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = pokemon.name;
            listItem.addEventListener('click', () => displayPokemonDetails(index));
            pokemonList.appendChild(listItem);
        });
        
        // Fungsi untuk menampilkan detail Pokemon
        const displayPokemonDetails = (index) => {
            const pokemon = pokemonData[index];
            pokemonName.textContent = pokemon.name;
            pokemonImage.src = pokemon.image;
            pokemonImage.alt = pokemon.name;
            pokemonDescription.textContent = pokemon.description;
            pokemonTypes.innerHTML = `Types:<br> <span style='color: black'> ${pokemon.types.join(', ')}</span>`;
            pokemonHeight.innerHTML = `Height:<br> <span style='color: black'> ${pokemon.height}</span>`;
            pokemonWeight.innerHTML = `Weight:<br> <span style='color: black'>${pokemon.weight}</span>`;
            
            // Tampilkan abilities
            pokemonAbilities.innerHTML = '';
            pokemon.abilities.forEach(ability => {
                const li = document.createElement('li');
                li.innerHTML = `<span style='color:black'>${ability}</span>` ;
                pokemonAbilities.appendChild(li);
            });
            
            // Tampilkan stats menggunakan progress bars
            pokemonStats.innerHTML = '';
            Object.entries(pokemon.stats).forEach(([stat, value]) => {
                const listItem = document.createElement('li');
                const statName = document.createElement('span');
                statName.className = 'stat-name';
                statName.textContent = `${stat.charAt(0).toUpperCase() + stat.slice(1)}: `;
                const progress = document.createElement('progress');
                progress.max = 255; // Max stat value in Pokemon
                progress.value = value;
                progress.textContent = value;
                listItem.appendChild(statName);
                listItem.appendChild(progress);
                pokemonStats.appendChild(listItem);
            });
        };
        
        // Tampilkan Pokemon pertama saat halaman dimuat
        displayPokemonDetails(0);
    } catch (error) {
        console.error(`Error : ${error}`);  
    }
});