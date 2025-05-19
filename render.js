//cmopleted

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
            // let isF = localFavs.filter(p => p.name === pokemon.name).length
            if(localFavs.filter(p => p.name === pokemon.name).length){
                // console.log(localFavs)
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

        // console.log(`Successfully rendered ${pokemons.length} pokemon`);
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
            // console.log(pokemon)
        const nameMatch = pokemon.name.toLowerCase().includes(searchTerm);
        const idMatch = isNumericSearch(searchTerm) && matchesId(pokemon.id.toString(), searchTerm);
        const firstTypeMatch = pokemon.type1.toLowerCase().includes(searchTerm);
        const secondTypeMatch = pokemon.type2.toLowerCase().includes(searchTerm);

        // console.log(nameMatch, idMatch, firstTypeMatch, secondTypeMatch)
       
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
// const checkboxes = document.querySelectorAll('input[type="checkbox"]');


function filterPokemons(){
    let filters = {
        favorite: false,
        types: [],
        generation: "",
        stage: ""
    };

    favCheckbox.addEventListener('change', function() {
        if(favCheckbox.checked) {
            // alert("checked fav")
            // const favPokemon = pokedex.filter(pokemon => console.log(pokemon));
            // const favPokemon = pokedex.filter(pokemon => pokemon.favorite == true);
            // renderPokemon(favPokemon);
            filters.favorite = true;
        }else{
            filters.favorite = false;
        }
    });


    normalBox.addEventListener('change', function() {
        if(normalBox.checked) {
            // alert("checked fav")
            // const favPokemon = pokedex.filter(pokemon => console.log(pokemon));
            // const normalPokemon = pokedex.filter(pokemon => pokemon.type1 == "Normal" || pokemon.type2 == "Normal");
            // renderPokemon(normalPokemon);
            filters.types.push('Normal');
            console.log(filters)
        } else {
            // const normalRemove = filters.types.find('Normal')
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
            // alert("checked fav")
            // const favPokemon = pokedex.filter(pokemon => console.log(pokemon));
            // const firePokemon = pokedex.filter(pokemon => pokemon.type1 == "Fire" || pokemon.type2 == "Fire");
            // renderPokemon(firePokemon);
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
            // alert("checked fav")
            // const favPokemon = pokedex.filter(pokemon => console.log(pokemon));
            // const waterPokemon = pokedex.filter(pokemon => pokemon.type1 == "Water" || pokemon.type2 == "Water");
            // renderPokemon(waterPokemon)
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
            // alert("checked fav")
            // const favPokemon = pokedex.filter(pokemon => console.log(pokemon));
            // const grassPokemon = pokedex.filter(pokemon => pokemon.type1 == "Grass" || pokemon.type2 == "Grass");
            // renderPokemon(grassPokemon)
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
            // alert("checked fav")
            // const favPokemon = pokedex.filter(pokemon => console.log(pokemon));
            // const fairyPokemon = pokedex.filter(pokemon => pokemon.type1 == "Fairy" || pokemon.type2 == "Fairy");
            // renderPokemon(fairyPokemon)
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
            // alert("checked fav")
            // const favPokemon = pokedex.filter(pokemon => console.log(pokemon));
            // const darkPokemon = pokedex.filter(pokemon => pokemon.type1 == "Dark" || pokemon.type2 == "Dark");
            // renderPokemon(darkPokemon);
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
            // alert("checked fav")
            // const favPokemon = pokedex.filter(pokemon => console.log(pokemon));
            // const bugPokemon = pokedex.filter(pokemon => pokemon.type1 == "Bug" || pokemon.type2 == "Bug");
            // renderPokemon(bugPokemon);

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
            // alert("checked fav")
            // const favPokemon = pokedex.filter(pokemon => console.log(pokemon));
            // const rockPokemon = pokedex.filter(pokemon => pokemon.type1 == "Rock" || pokemon.type2 == "Rock");
            // renderPokemon(rockPokemon);
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
            // alert("checked fav")
            // const favPokemon = pokedex.filter(pokemon => console.log(pokemon));
            // const groundPokemon = pokedex.filter(pokemon => pokemon.type1 == "Ground" || pokemon.type2 == "Ground");
            // renderPokemon(groundPokemon
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
            // alert("checked fav")
            // const favPokemon = pokedex.filter(pokemon => console.log(pokemon));
            // const poisonPokemon = pokedex.filter(pokemon => pokemon.type1 == "Poison" || pokemon.type2 == "Poison");
            // renderPokemon(poisonPokemon
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
            // alert("checked fav")
            // const favPokemon = pokedex.filter(pokemon => console.log(pokemon));
            // const steelPokemon = pokedex.filter(pokemon => pokemon.type1 == "Steel" || pokemon.type2 == "Steel");
            // renderPokemon(steelPokemon)
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
            // alert("checked fav")
            // const favPokemon = pokedex.filter(pokemon => console.log(pokemon));
            // const electricPokemon = pokedex.filter(pokemon => pokemon.type1 == "Electric" || pokemon.type2 == "Electric");
            // renderPokemon(electricPokem
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
            // alert("checked fav")
            // const favPokemon = pokedex.filter(pokemon => console.log(pokemon));
            // const FlyingPokemon = pokedex.filter(pokemon => pokemon.type1 == "Flying" || pokemon.type2 == "Flying");
            // renderPokemon(FlyingPokemon
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
            // alert("checked fav")
            // const favPokemon = pokedex.filter(pokemon => console.log(pokemon));
            // const ghostPokemon = pokedex.filter(pokemon => pokemon.type1 == "Ghost" || pokemon.type2 == "Ghost");
            // renderPokemon(ghostPokemon)
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
            // alert("checked fav")
            // const favPokemon = pokedex.filter(pokemon => console.log(pokemon));
            // const dragonPokemon = pokedex.filter(pokemon => pokemon.type1 == "Dragon" || pokemon.type2 == "Dragon");
            // renderPokemon(dragonPokemon
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
            // alert("checked fav")
            // const favPokemon = pokedex.filter(pokemon => console.log(pokemon));
            // const psychicPokemon = pokedex.filter(pokemon => pokemon.type1 == "Psychic" || pokemon.type2 == "Psychic");
            // renderPokemon(psychicPokemo
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
            // alert("checked fav")
            // const favPokemon = pokedex.filter(pokemon => console.log(pokemon));
            // const fightingPokemon = pokedex.filter(pokemon => pokemon.type1 == "Fighting" || pokemon.type2 == "Fighting");
            // renderPokemon(fightingPokem
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
            // alert("checked fav")
            // const favPokemon = pokedex.filter(pokemon => console.log(pokemon));
            // const icePokemon = pokedex.filter(pokemon => pokemon.type1 == "Ice" || pokemon.type2 == "Ice");
            // renderPokemon(icePokemon);

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
            // alert("checked fav")
            // const favPokemon = pokedex.filter(pokemon => console.log(pokemon));
            // const gen1Pokemon = pokedex.filter(pokemon => pokemon.generation == 1);
            // renderPokemon(gen1Pokemon);
            filters.generation = '1';

        }
    });
    gen2Box.addEventListener('change', function() {
        if(gen2Box.checked) {
            // alert("checked fav")
            // const favPokemon = pokedex.filter(pokemon => console.log(pokemon));
            // const gen2Pokemon = pokedex.filter(pokemon => pokemon.generation == 2);
            // renderPokemon(gen2Pokemon);
            filters.generation = '2'

        }
    });
    gen3Box.addEventListener('change', function() {
        if(gen3Box.checked) {
            // alert("checked fav")
            // const favPokemon = pokedex.filter(pokemon => console.log(pokemon));
            // const gen3Pokemon = pokedex.filter(pokemon => pokemon.generation == 3);
            // renderPokemon(gen3Pokemon);
            filters.generation = '3'

        }
    });
    gen4Box.addEventListener('change', function() {
        if(gen4Box.checked) {
            // alert("checked fav")
            // const favPokemon = pokedex.filter(pokemon => console.log(pokemon));
            // const gen4Pokemon = pokedex.filter(pokemon => pokemon.generation == 4);
            // renderPokemon(gen4Pokemon);
            filters.generation = '4'

        }
    });
    gen5Box.addEventListener('change', function() {
        if(gen5Box.checked) {
            // alert("checked fav")
            // const favPokemon = pokedex.filter(pokemon => console.log(pokemon));
            // const gen5Pokemon = pokedex.filter(pokemon => pokemon.generation == 5);
            // renderPokemon(gen5Pokemon);
            filters.generation = '5'

        }
    });
    gen6Box.addEventListener('change', function() {
        if(gen6Box.checked) {
            // alert("checked fav")
            // const favPokemon = pokedex.filter(pokemon => console.log(pokemon));
            // const gen6Pokemon = pokedex.filter(pokemon => pokemon.generation == 6);
            // renderPokemon(gen6Pokemon);
            filters.generation = '6'

        }
    });
    gen7Box.addEventListener('change', function() {
        if(gen7Box.checked) {
            // alert("checked fav")
            // const favPokemon = pokedex.filter(pokemon => console.log(pokemon));
            // const gen7Pokemon = pokedex.filter(pokemon => pokemon.generation == 7);
            // renderPokemon(gen7Pokemon);
            filters.generation = '7'

        }
    });
    gen8Box.addEventListener('change', function() {
        if(gen8Box.checked) {
            // alert("checked fav")
            // const favPokemon = pokedex.filter(pokemon => console.log(pokemon));
            // const gen8Pokemon = pokedex.filter(pokemon => pokemon.generation == 8);
            // renderPokemon(gen8Pokemon);
            filters.generation = '8'

        }
    });
    gen9Box.addEventListener('change', function() {
        if(gen9Box.checked) {
            // alert("checked fav")
            // const favPokemon = pokedex.filter(pokemon => console.log(pokemon));
            // const gen9Pokemon = pokedex.filter(pokemon => pokemon.generation == 9);
            // renderPokemon(gen9Pokemon);
            filters.generation = '9'

        }
    });
    firstBox.addEventListener('change', function() {
        if(firstBox.checked) {
            // alert("checked fav")
            // const favPokemon = pokedex.filter(pokemon => console.log(pokemon));
            // const firstPokemon = pokedex.filter(pokemon => pokemon.stage == "First");
            // renderPokemon(firstPokemon)
            filters.stage = 'First'

        }
    });
    secondBox.addEventListener('change', function() {
        if(secondBox.checked) {
            // alert("checked fav")
            // const favPokemon = pokedex.filter(pokemon => console.log(pokemon));
            // const secondPokemon = pokedex.filter(pokemon => pokemon.stage == "Second");
            // renderPokemon(secondPokemon
            filters.stage = 'Second'

        }
    });
    thirdBox.addEventListener('change', function() {
        if(thirdBox.checked) {
            // alert("checked fav")
            // const favPokemon = pokedex.filter(pokemon => console.log(pokemon));
            // const thirdPokemon = pokedex.filter(pokemon => pokemon.stage == "Third");
            // renderPokemon(thirdPokemon)
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
        // console.log(filteredPokemon)

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                anyChecked = true;
                // if(filters.favorite == true){
                //     filterPokemons = filterPokemons.filter(pokemon => pokemon.favorite == true));
                // }
                // if (typeFilter == )
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