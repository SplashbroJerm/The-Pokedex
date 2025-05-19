//set cookie that expires in seven days
function greetUser(){
    //check if visited before cookie exists
    const hasVisitedBefore = document.cookie.includes('visitedBefore=true');
        if (hasVisitedBefore){
            alert("👋 Welcome back to the Pokedex");
    } else {
        //sets cookie with 7 days expiry
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 7);
        document.cookie = `visitedBefore=true; expires=${expiryDate.toUTCString()}; path=/`;
        alert("🌟 Welcome to The Pokedex!");
    }
}
greetUser()