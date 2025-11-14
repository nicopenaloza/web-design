const toggleMenu = () => {
    const menu = document.getElementById("menu");
    const menuButton = document.getElementById("menu-button");
    menu.classList.toggle("menu-active")
    menuButton.classList.toggle("menu-button-active");
}

const toggleTheme = () => {
    const body = document.querySelector("body");
    body.classList.toggle("light-mode");
}

const toggleThemeButtons = document.querySelectorAll('.theme-toggle-btn');
toggleThemeButtons.forEach(button => button.addEventListener('click', toggleTheme))