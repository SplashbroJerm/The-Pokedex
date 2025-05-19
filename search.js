// const searchButton = document.getElementById('searchButton');
// const searchInput = document.getElementById('searchInput');
// const resultsContainer = document.getElementById('result');

// function performSearch(){
//     const searchTerm = searchInput.ariaValueMax.toLowerCase().trim();

//     if (searchTerm === ''){
//         renderPokemon();
//         return;
//     }

//         const filteredPokemon = pokedex.filter(pokedex => {
//         const nameMatch = pokedex.name.toLowerCase().includes(searchTerm);
//         const idMatch = isNumericSearch(searchTerm) && matchesId(pokedex.id.toString(), searchTerm);
//         const firstTypeMatch = pokedex.type1.toLowerCase().includes(searchTerm);
//         const secondTypeMatch = pokedex.type2.toLowerCase().includes(searchTerm);

//         return nameMatch || idMatch || firstTypeMatch || secondTypeMatch;
//     });
//     renderPokemon(filteredPokemon);
// }

// function isNumericSearch(term){
//     return /\d/.test(term);
// }

// function matchesId (id, term){
//     const cleanTerm = term.replace(/[#]/g, '');

//     //check if search term is a number
//     if(!isNaN(cleanTerm) && cleanTerm !==''){
//         return id.includes(cleanTerm)
//     }
//     return false;
// }

// searchButton.addEventListener('input', performSearch);