//completed

const history = document.getElementById('history');
const clearHistory = document.getElementById('clearHistory');

function renderPokemon(pokemons) {
    console.log('renderPokemon called with', pokemons.length, 'pokemon'); //debug log
    const resultsContainer = document.getElementById('result');
    
    //check if container exists
    if (!resultsContainer){
        console.error('Results container not found');
        return;
    }
    //clear the container
    resultsContainer.innerHTML = '';

    //if no pokemon found, show a message
    if (pokemons.length === 0){
        console.log("no pokemon found, showing empty message")//debug log
        resultsContainer.innerHTML = '<p id="noResults"> No pokemon found </p>';
        return;
    }
    const pokemonElements = [];
    pokemons.forEach(pokemon => {
            //validate pokemon object
            if (!pokemon || typeof pokemon.name !== 'string') {
                console.warn('Invalid pokemon object:', pokemon);
                return;
            }

            let localFavs = JSON.parse(localStorage.getItem("savedFavs")) || [];
            if(localFavs.filter(p => p.name === pokemon.name).length){
                pokemon.favorite =true;
            }
            const pokemonDiv = document.createElement('div');
            pokemonDiv.className = 'pokemon-card';
            pokemonDiv.innerHTML = `
            <div class="pokemon-box">
                <div class="pokemon-header">
                <a href="${pokemon.link || '#'}" target="_blank">
                    <img src="${pokemon.image || ''}" alt = "${pokemon.name}" class="pokemon-img">
                </a>
                <h3>${pokemon.name}</h3>
                <p><strong>Pokedex Number:</strong> ${pokemon.id || 'Unknown'}</p>
                </div>
                <p><strong>Type:</strong> ${pokemon.type1 || 'Unknown'} ${pokemon.type2 || 'Unknown'}</p>
                <p><strong>Generation:</strong> ${pokemon.generation || 'Unknown'}</p>
                <p><strong>Evolution Stage:</strong> ${pokemon.stage || 'Unknown'}</p>
                <a href="${pokemon.link || '#'}" target="_blank">
                    <button class="learn-more-btn">Learn More</button>
                </a>
                <button class="fav ${pokemon.favorite ? 'fav-clicked' : '' }" id="${pokemon.id}">♥</button>
            </div>
            `;
            pokemonElements.push(pokemonDiv);
            if(pokemon.type2 === "None"){
                pokemonDiv.innerHTML = `
            <div class="pokemon-box">
                <div class="pokemon-header">
                <a href="${pokemon.link || '#'}" target="_blank">
                    <img src="${pokemon.image || ''}" alt = "${pokemon.name}" class="pokemon-img">
                </a>
                <h3>${pokemon.name}</h3>
                <p><strong>Pokedex Number:</strong> ${pokemon.id || 'Unknown'}</p>
                </div>
                <p><strong>Type:</strong> ${pokemon.type1 || 'Unknown'}</p>
                <p><strong>Generation:</strong> ${pokemon.generation || 'Unknown'}</p>
                <p><strong>Evolution Stage:</strong> ${pokemon.stage || 'Unknown'}</p>
                <a href="${pokemon.link || '#'}" target="_blank">
                    <button class="learn-more-btn">Learn More</button>
                </a>
                <button class="fav ${pokemon.favorite ? 'fav-clicked' : '' }" id="${pokemon.id}">♥</button>
            </div>
            `;
            pokemonElements.push(pokemonDiv);
            }
        });
        //append all pokemon cards at once
        pokemonElements.forEach(element => {
            resultsContainer.appendChild(element);
        });
        
        const favBtns = document.querySelectorAll('.fav'); // Get all elements with class "box"

        favBtns.forEach(btn => btn.addEventListener('click', function(){
            let id = btn.getAttribute("id")
            let localFavs = JSON.parse(localStorage.getItem("savedFavs")) || [];

            let p = pokedex.find(p => p.id == id)
              console.log(p)
              console.log(this.classList);
              if(p.favorite === true){
                p.favorite = false
                let i = localFavs.indexOf(p);
                localFavs.splice(i, 1);
              }else{
                p.favorite = true
                localFavs.push(p);

              }
              localStorage.setItem('savedFavs',JSON.stringify(localFavs))
            
        }));

            

        favBtns.forEach(colorChangeBtn => colorChangeBtn.addEventListener('click', function(){
            console.log(this);
            if(this.classList.contains('fav-clicked')){
                this.classList.remove('fav-clicked')
            } else {
                this.classList.add('fav-clicked')
            }
        }));
}


const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('result');


function performSearch(){
    const searchTerm = searchInput.value.toLowerCase().trim();

    if (searchTerm === ''){
        renderPokemon(pokedex);
        return;
    }

        const filteredPokemon = pokedex.filter(pokemon => {
        const nameMatch = pokemon.name.toLowerCase().includes(searchTerm);
        const idMatch = isNumericSearch(searchTerm) && matchesId(pokemon.id.toString(), searchTerm);
        const firstTypeMatch = pokemon.type1.toLowerCase().includes(searchTerm);
        const secondTypeMatch = pokemon.type2.toLowerCase().includes(searchTerm);

       
        return nameMatch || idMatch || firstTypeMatch || secondTypeMatch;
    });
   
    renderPokemon(filteredPokemon);
   
}

function isNumericSearch(term){
    return /\d/.test(term);
}

function matchesId (id, term){
    const cleanTerm = term.replace(/[#]/g, '');

    //check if search term is a number
    if(!isNaN(cleanTerm) && cleanTerm !==''){
        return id.includes(cleanTerm)
    }
    return false;
}
let localSearch = JSON.parse(localStorage.getItem("savedSearch")) || [];
localStorage.setItem('savedSearch',JSON.stringify(localSearch))
history.innerHTML = `${localSearch}`
clearHistory.addEventListener('click', function(){
    localStorage.removeItem('savedSearch')
    localSearch = []
    history.innerHTML = ``;
})
searchButton.addEventListener('click', performSearch);
searchButton.addEventListener('click', function(){
    localSearch.push(searchInput.value.toLowerCase().trim());
    history.innerHTML += `<button class="links" onclick="historyClick('${searchInput.value}')">${searchInput.value}</button>`
})
searchInput.addEventListener('input', function(){
    performSearch();
});
searchInput.addEventListener('keyup', function(event){
    if(event.key === 'Enter'){
        performSearch();
        
        localSearch.push(searchInput.value.toLowerCase().trim());
        history.innerHTML += `<button class="links" onclick="historyClick('${searchInput.value}')">${searchInput.value}</button>`
    }
});

function historyClick(searchTerm){
    searchInput.value = searchTerm;
    performSearch()
}


const favButton = document.getElementById('fav');
const normalBox = document.getElementById('normal');
const fireBox = document.getElementById('fire');
const waterBox = document.getElementById('water');
const grassBox = document.getElementById('grass');
const fairyBox = document.getElementById('fairy');
const darkBox = document.getElementById('dark');
const bugBox = document.getElementById('bug');
const rockBox = document.getElementById('rock');
const groundBox = document.getElementById('ground');
const poisonBox = document.getElementById('poison');
const steelBox = document.getElementById('steel');
const electricBox = document.getElementById('electric');
const flyingBox = document.getElementById('flying');
const ghostBox = document.getElementById('ghost');
const dragonBox = document.getElementById('dragon');
const psychicBox = document.getElementById('psychic');
const fightingBox = document.getElementById('fighting');
const iceBox = document.getElementById('ice');
const gen1Box = document.getElementById('gen1');
const gen2Box = document.getElementById('gen2');
const gen3Box = document.getElementById('gen3');
const gen4Box = document.getElementById('gen4');
const gen5Box = document.getElementById('gen5');
const gen6Box = document.getElementById('gen6');
const gen7Box = document.getElementById('gen7');
const gen8Box = document.getElementById('gen8');
const gen9Box = document.getElementById('gen9');
const firstBox = document.getElementById('first');
const secondBox = document.getElementById('second');
const thirdBox = document.getElementById('third');
const favCheckbox = document.getElementById('favor');


function filterPokemons(){
    let filters = {
        favorite: false,
        types: [],
        generation: "",
        stage: ""
    };

    favCheckbox.addEventListener('change', function() {
        if(favCheckbox.checked) {
            filters.favorite = true;
        }else{
            filters.favorite = false;
        }
    });


    normalBox.addEventListener('change', function() {
        if(normalBox.checked) {
            filters.types.push('Normal');
            console.log(filters)
        } else {
            let normalRemove  = "Normal";
            let normalIndex = filters.types.indexOf(normalRemove)
            if(normalIndex > -1){
                filters.types.splice(normalIndex, 1);
            }
            console.log(filters);
        }
    });
    fireBox.addEventListener('change', function() {
        if(fireBox.checked) {
            filters.types.push('Fire');
            console.log(filters)

        } else {
            let fireRemove  = "Fire";
            let fireIndex = filters.types.indexOf(fireRemove)
            if(fireIndex > -1){
                filters.types.splice(fireIndex, 1);
            }
            console.log(filters);
        }
    });
    waterBox.addEventListener('change', function() {
        if(waterBox.checked) {
            filters.types.push('Water');
            console.log(filters)

        } else {
            let waterRemove  = "Water";
            let waterIndex = filters.types.indexOf(waterRemove)
            if(waterIndex > -1){
                filters.types.splice(waterIndex, 1);
            }
            console.log(filters);
        }
    });
    grassBox.addEventListener('change', function() {
        if(grassBox.checked) {
            filters.types.push('Grass');

        } else {
            let grassRemove  = "Grass";
            let grassIndex = filters.types.indexOf(grassRemove)
            if(grassIndex > -1){
                filters.types.splice(grassIndex, 1);
            }
            console.log(filters);
        }
    });
    fairyBox.addEventListener('change', function() {
        if(fairyBox.checked) {
            filters.types.push('Fairy');

        } else {
            let fairyRemove  = "Fairy";
            let fairyIndex = filters.types.indexOf(fairyRemove)
            if(fairyIndex > -1){
                filters.types.splice(fairyIndex, 1);
            }
            console.log(filters);
        }
    });
    darkBox.addEventListener('change', function() {
        if(darkBox.checked) {
            filters.types.push('Dark');

        } else {
            let darkRemove  = "Dark";
            let darkIndex = filters.types.indexOf(darkRemove)
            if(darkIndex > -1){
                filters.types.splice(darkIndex, 1);
            }
            console.log(filters);
        }
    });
    bugBox.addEventListener('change', function() {
        if(bugBox.checked) {

            filters.types.push('Bug');
        } else {
            let bugRemove  = "Bug";
            let bugIndex = filters.types.indexOf(bugRemove)
            if(bugIndex > -1){
                filters.types.splice(bugIndex, 1);
            }
            console.log(filters);
        }
    });
    rockBox.addEventListener('change', function() {
        if(rockBox.checked) {
            filters.types.push('Rock');

        } else {
            let rockRemove  = "Rock";
            let rockIndex = filters.types.indexOf(rockRemove)
            if(rockIndex > -1){
                filters.types.splice(rockIndex, 1);
            }
            console.log(filters);
        }
    });
    groundBox.addEventListener('change', function() {
        if(groundBox.checked) {
            filters.types.push('Ground');

        } else {
            let groundRemove  = "Ground";
            let groundIndex = filters.types.indexOf(groundRemove)
            if(groundIndex > -1){
                filters.types.splice(groundIndex, 1);
            }
            console.log(filters);
        }
    });
    poisonBox.addEventListener('change', function() {
        if(poisonBox.checked) {
            filters.types.push('Poison');

        } else {
            let poisonRemove  = "Poison";
            let poisonIndex = filters.types.indexOf(poisonRemove)
            if(poisonIndex > -1){
                filters.types.splice(poisonIndex, 1);
            }
            console.log(filters);
        }
    });
    steelBox.addEventListener('change', function() {
        if(steelBox.checked) {
            filters.types.push('Steel');

        } else {
            let steelRemove  = "Steel";
            let steelIndex = filters.types.indexOf(steelRemove)
            if(steelIndex > -1){
                filters.types.splice(steelIndex, 1);
            }
            console.log(filters);
        }
    });
    electricBox.addEventListener('change', function() {
        if(electricBox.checked) {
            filters.types.push('Electric');

        } else {
            let electricRemove  = "Electric";
            let electricIndex = filters.types.indexOf(electricRemove)
            if(electricIndex > -1){
                filters.types.splice(electricIndex, 1);
            }
            console.log(filters);
        }
    });
    flyingBox.addEventListener('change', function() {
        if(flyingBox.checked) {
            filters.types.push('Flying');

        } else {
            let flyingRemove  = "Flying";
            let flyingIndex = filters.types.indexOf(flyingRemove)
            if(flyingIndex > -1){
                filters.types.splice(flyingIndex, 1);
            }
            console.log(filters);
        }
    });
    ghostBox.addEventListener('change', function() {
        if(ghostBox.checked) {
            filters.types.push('Ghost');

        } else {
            let ghostRemove  = "Ghost";
            let ghostIndex = filters.types.indexOf(ghostRemove)
            if(ghostIndex > -1){
                filters.types.splice(ghostIndex, 1);
            }
            console.log(filters);
        }
    });
    dragonBox.addEventListener('change', function() {
        if(dragonBox.checked) {
            filters.types.push('Dragon');

        } else {
            let dragonRemove  = "Dragon";
            let dragonIndex = filters.types.indexOf(dragonRemove)
            if(dragonIndex > -1){
                filters.types.splice(dragonIndex, 1);
            }
            console.log(filters);
        }
    });
    psychicBox.addEventListener('change', function() {
        if(psychicBox.checked) {
            filters.types.push('Psychic');

        } else {
            let psychicRemove  = "Psychic";
            let psychicIndex = filters.types.indexOf(psychicRemove)
            if(psychicIndex > -1){
                filters.types.splice(psychicIndex, 1);
            }
            console.log(filters);
        }
    });
    fightingBox.addEventListener('change', function() {
        if(fightingBox.checked) {
            filters.types.push('Fighting');

        } else {
            let fightingRemove  = "Fighting";
            let fightingIndex = filters.types.indexOf(fightingRemove)
            if(fightingIndex > -1){
                filters.types.splice(fightingIndex, 1);
            }
            console.log(filters);
        }
    });
    iceBox.addEventListener('change', function() {
        if(iceBox.checked) {
            filters.types.push('Ice');
        } else {
            let iceRemove  = "Ice";
            let iceIndex = filters.types.indexOf(iceRemove)
            if(iceIndex > -1){
                filters.types.splice(iceIndex, 1);
            }
            console.log(filters);
        }
    });
    gen1Box.addEventListener('change', function() {
        if(gen1Box.checked) {
            filters.generation = '1';

        }
    });
    gen2Box.addEventListener('change', function() {
        if(gen2Box.checked) {
            filters.generation = '2';

        }
    });
    gen3Box.addEventListener('change', function() {
        if(gen3Box.checked) {
            filters.generation = '3';

        }
    });
    gen4Box.addEventListener('change', function() {
        if(gen4Box.checked) {
            filters.generation = '4';

        }
    });
    gen5Box.addEventListener('change', function() {
        if(gen5Box.checked) {;
            filters.generation = '5';

        }
    });
    gen6Box.addEventListener('change', function() {
        if(gen6Box.checked) {
            filters.generation = '6';

        }
    });
    gen7Box.addEventListener('change', function() {
        if(gen7Box.checked) {
            filters.generation = '7';

        }
    });
    gen8Box.addEventListener('change', function() {
        if(gen8Box.checked) {
            filters.generation = '8';

        }
    });
    gen9Box.addEventListener('change', function() {
        if(gen9Box.checked) {
            filters.generation = '9';
        }
    });
    firstBox.addEventListener('change', function() {
        if(firstBox.checked) {
            filters.stage = 'First';
        }
    });
    secondBox.addEventListener('change', function() {
        if(secondBox.checked) {
            filters.stage = 'Second';
        }
    });
    thirdBox.addEventListener('change', function() {
        if(thirdBox.checked) {
            filters.stage = 'Third';
        }
    });
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        console.log("HERE")
        let anyChecked = false;
        let typeFilter = filters.types
        let genFilter = filters.generation
        let stageFilter = filters.stage;
        console.log(filters)
        let filteredPokemon = [...pokedex];

        filteredPokemon = filteredPokemon.filter((p) => {

            let f = true;
            if(filters.favorite == true){
                f = p.favorite == filters.favorite
            }

            let t = true;

            if(typeFilter.length >= 2){
                t = typeFilter.includes(p.type1) && typeFilter.includes(p.type2)
            }else if(typeFilter.length == 0){
              t = true;
            }else{
                t = typeFilter.includes(p.type1) || typeFilter.includes(p.type2)
            }

            return f && t && p.generation.toString().includes(genFilter) && p.stage.includes(stageFilter)
        })
        renderPokemon(filteredPokemon)
        console.log(stageFilter)

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                anyChecked = true;
            }
        });
        if (!anyChecked) {
            renderPokemon(pokedex);
            }
        }
        );
    });
}





filterPokemons();
renderPokemon(pokedex);