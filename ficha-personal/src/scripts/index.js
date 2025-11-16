
const toggleTheme = (ev) => {
    const body = document.querySelector("body");
    body.classList.toggle("light-mode");
    ev.target.innerText = body.classList.contains("light-mode") ? "🌙" : "☀️";
}

const toggleThemeButtons = document.querySelectorAll('.theme-toggle-btn');
toggleThemeButtons.forEach(button => button.addEventListener('click', toggleTheme))