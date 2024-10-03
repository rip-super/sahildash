const statsBtn = document.getElementById("statsBtn");
const statsSection = document.getElementById("stats");
statsBtn.style.display = "none";
statsSection.style.display = "none";

async function fetchData() {
    try {
        const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }
        const data = await response.json();

        const pokemonSprite = data.sprites.other["official-artwork"].front_default;
        const shinyCheckbox = document.getElementById("shiny");
        let spriteUrl = pokemonSprite;
        
        if (shinyCheckbox.checked) {
            spriteUrl = data.sprites.other["official-artwork"].front_shiny;
        }

        const imgElement = document.getElementById("pokémonSprite");
        imgElement.src = spriteUrl;
        imgElement.style.display = "block";

        const name = document.getElementById("name");
        name.innerText = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        const stats = document.getElementById("stats");
        const height = document.getElementById("height");
        const weight = document.getElementById("weight");
        const type = document.getElementById("type");
        const bHP = document.getElementById("bHP");
        const bAtt = document.getElementById("bAtt");
        const bDef = document.getElementById("bDef");
        const bSpAtt = document.getElementById("bSpAtt");
        const bSpDef = document.getElementById("bSpDef");
        const bSpeed = document.getElementById("bSpeed");
        const ability = document.getElementById("ability");
        const moves = document.getElementById("moves");

        statsBtn.style.display = "block";
        height.innerText = data.height * 10 + " cm";
        weight.innerText = data.weight / 10 + " kg";
        type.innerText = data.types.map(type => type.type.name.substring(0, 1).toUpperCase() + type.type.name.substring(1)).join(", ");
        bHP.innerText = data.stats[0].base_stat;
        bAtt.innerText = data.stats[1].base_stat;
        bDef.innerText = data.stats[2].base_stat;
        bSpAtt.innerText = data.stats[3].base_stat;
        bSpDef.innerText = data.stats[4].base_stat;
        bSpeed.innerText = data.stats[5].base_stat;
        ability.innerText = data.abilities.map(ability => ability.ability.name.substring(0, 1).toUpperCase() + ability.ability.name.substring(1)).join(", ");
        moves.innerText = data.moves.map(move => move.move.name.substring(0, 1).toUpperCase() + move.move.name.substring(1)).join(", ");
        
        stats.style.display = "block";
        shinyCheckbox.addEventListener('change', (event) => {
            if (event.target.checked) {
                imgElement.src = data.sprites.other["official-artwork"].front_shiny;
            } else {
                imgElement.src = data.sprites.other["official-artwork"].front_default;
            }
        });
    }
    
    catch (error) {
        console.error(error);
        alert("Could not fetch pokémon data.\n\nThe following may be the causes\n-> No internet connection.\n-> Misspelled pokémon name.");
    }
}

function toggleStats() {
    const stats = document.getElementById("stats");
    if (stats.style.display === "none") {
        stats.style.display = "block";
    } else {
        stats.style.display = "none";
    }
}