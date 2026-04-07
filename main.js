import { MainPage } from "./pages/main/index.js";

const root = document.getElementById('root');

window.renderPage = (PageClass, ...args) => {
    root.innerHTML = ''; // очищаем только root, хедер не трогаем
    const page = new PageClass(root, ...args);
    page.render();
};

const homeButton = document.getElementById('home-button');
if (homeButton) {
    homeButton.addEventListener('click', () => {
        window.renderPage(MainPage);
    });
}

// Запуск
window.renderPage(MainPage);