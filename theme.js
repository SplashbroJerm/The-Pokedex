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