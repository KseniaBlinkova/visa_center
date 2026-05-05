import { MainPage } from "./pages/main/main.js";
import { ButtonHome } from "./components/button-home/button-home.js";
// Импортируем стили (Vite сам найдет их в node_modules или в папке проекта)
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'; 

// Импортируем скрипты библиотек
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

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