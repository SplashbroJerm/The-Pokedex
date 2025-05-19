//theme switcher

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



// function switchTheme(){
//     if (document.body.className.match('light-theme') ){
//         document.body.classList.remove('light-theme');
//         document.body.classList.add('dark-theme');
//         sideBar.classList.remove('light-theme')
//         sideBar.classList.add('dark-theme');
//     } else if (document.body.className.match('dark-theme') ) {
//         document.body.classList.remove('dark-theme');
//         document.body.classList.add('light-theme');
//         sideBar.classList.remove('dark-theme');
//         sideBar.classList.add('light-theme');
//     }
// }