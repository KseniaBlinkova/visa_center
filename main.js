import { MainPage } from "./pages/main/main.js";
import { ButtonHome } from "./components/button-home/button-home.js";

const root = document.getElementById('root');
const headerAction = document.getElementById('home-button-container');

const homeBtn = new ButtonHome(headerAction);
homeBtn.render(() => window.renderPage(MainPage));

window.renderPage = (PageClass, ...args) => {
    root.innerHTML = ''; 
    const page = new PageClass(root, ...args);
    page.render();
};

// Стартовая страница
window.renderPage(MainPage);