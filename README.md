# The Pokedex JavaScript Code Explanation
This document provides an explanation of The Poxedex website JavaScript code.


## Table of Contents
1. [Variable Naming & Indentation](#variable-naming-and-indentation)
2. [Function Naming & Modularity](#function-naming-&-modularity)
3. [Arrays & Objects Usage](#arrays-&-objects-usage)
4. [Array Methods](#array-methods)
5. [Looping/Iteration](#looping/iteration)
6. [JSON Data Handling](#json-data-nadling)
7. [Web Storage](#web-storage)
8. [Saving/Retreiving User Data](#saving/retreiving-user-data)
9. [Cookies with Expiry](#cookies-with-expiry)
10. [DOM Manipulation](#dom-manipulation)
11. [CSS Manipulation via JS](#css-manipulation-via-js)
12. [Theme Preference](#theme-preference)
13. [Comments & Code Readability](#comments-&-code-readability)
14. [Error Handling & Debugging](#error-handling-&-debugging)
15. [Regex Validation](#regex-validation)
16. [Timer & Date Object](#timer-&-date-object)
17. [Math, String, Random Methods](#math-string-random-methods)
18. [Event Listeners & Shortcuts](#event-listeners-&-shortcuts)
19. [Real-time Search & History](#real-time-Search-&-history)
20. [CRUD Functionality](#crud-functionality)


## Variable Naming and Indentation
Descriptive camelCase names and consistent indentation
```javascript
const history = document.getElementById('history');
const clearHistory = document.getElementById('clearHistory');
```

## Function Naming & Modularity
Clear function names; modular logic
```javascript
    function matchesId (id, term){
        const cleanTerm = term.replace(/[#]/g, '');

        //check if search term is a number
        if(!isNaN(cleanTerm) && cleanTerm !==''){
            return id.includes(cleanTerm)
        }
        return false;
    }
```

## Arrays & Objects Usage
Effective use of arrays, objects, and nesting
```javascript
const pokedex = [
    {
        image:'Images/bulbasaur.png',
        id: 1,
        name: "Bulbasaur",
        type1: "Grass",
        type2: "Poison",
        generation: 1,
        stage: "First",
        link: "https://bulbapedia.bulbagarden.net/wiki/Bulbasaur_(Pok%C3%A9mon)",
        favorite: false
    },
]
```

## Array Methods
Proper use of map, filter, reduce, etc.
```javascript
if(localFavs.filter(p => p.name === pokemon.name).length){
                // console.log(localFavs)
                pokemon.favorite =true;
            }
```

## Looping/Iteration
Efficient iteration through data
```javascript
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
```

## JSON Data Handling
Parses, stores, and manipulates JSON
```javascript
let localSearch = JSON.parse(localStorage.getItem("savedSearch")) || [];
localStorage.setItem('savedSearch',JSON.stringify(localSearch))
```

## Web Storage
Stores and retreives from storage
```javascript
clearHistory.addEventListener('click', function(){
    localStorage.removeItem('savedSearch')
    localSearch = []
    history.innerHTML = ``;
})
```

## Saving/Retreiving User Data
saves and retreives favorites persistently
```javascript
localStorage.setItem('savedFavs',JSON.stringify(localFavs))
```

## Cookies with Expiry
set/read/delete cookies with expiry
```javascript
const hasVisitedBefore = document.cookie.includes('visitedBefore=true');
document.cookie = `visitedBefore=true; expires=${expiryDate.toUTCString()}; path=/`;
```

## DOM Manipulation
Creates/updates/removes DOM elements
```javascript
const pokemonDiv = document.createElement('div');
```

## CSS Manipulation via JS
Alters style/classes dynamically
```javascript
messageDiv.style.margin = '20px 0';
```

## Theme Preference
Toggle theme, save/load preference
```javascript
const sideBar= document.getElementById('side-bar');

const themeToggle = document.getElementById('theme')
if(localStorage.getItem('theme') === 'dark'){
    document.body.classList.add('dark-theme')
    sideBar.classList.add('dark-theme')
}

themeToggle.addEventListener('click', ()=> {
    document.body.classList.toggle('dark-theme');
    sideBar.classList.toggle('dark-theme');
    if(document.body.classList.contains('dark-theme')){
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light')
    }
});

document.addEventListener('keydown', function(e){
    if(e.shiftKey && e.key === 'D')
    {
        themeToggle.click();
    }
})
```

## Comments & Code Readability
helpful inline comments
```javascript
//validate pokemon object
            if (!pokemon || typeof pokemon.name !== 'string') {
                console.warn('Invalid pokemon object:', pokemon);
                return;
            }
```

## Error Handling & Debugging
uses console, try/catch blocks
```javascript
if (pokemons.length === 0){
        console.log("no pokemon found, showing empty message")//debug log
        resultsContainer.innerHTML = '<p id="noResults"> No pokemon found </p>';
        return;
    }
```

## Regex Validation
validates data using RegEx
```javascript
function isNumericSearch(term){
    return /\d/.test(term);
}
```

## Timer & Date Object
Tracks time/events with Date()
```javascript
const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 7);
```

## Math String Random Methods
Uses JS utilities like Math.Random()
```javascript
const hours = Math.floor(totalSeconds / 3600);
const minutes = Math.floor((totalSeconds % 3600) / 60);
```

## Event Listeners & Shortcuts
Adds listeners, keyboard support
```javascript
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
```

## Real Time Search & History
Live search + history
```javascript
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
```

## CRUD Functionality
Full add/edit/delete using storage

```javascript
filters.types.push('Fire');
```