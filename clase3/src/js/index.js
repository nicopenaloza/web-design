const toggleMenu = () => {
    const menu = document.getElementById("menu");
    const menuButton = document.getElementById("menu-button");
    menu.classList.toggle("menu-active")
    menuButton.classList.toggle("menu-button-active");
}