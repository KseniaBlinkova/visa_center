import { VisaCardComponent } from "../../components/visa-card/visa-card.js";
import { SearchBar } from "../../components/search-bar/search-bar.js";
import { ButtonAdd } from "../../components/button-add/button-add.js";
import { VisaPage } from "../visa/visa.js";

// НОВЫЕ ИМПОРТЫ ДЛЯ 5 ЛАБЫ
import { ajax } from "../../modules/ajax.js";
import { visaUrls } from "../../modules/visaUrls.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.visaData = []; // Изначально данных нет
    }

    getHTML() {
        return `
            <div class="container mt-3">
                <div class="main-controls-row">
                    <h4 class="page-title">Виды виз</h4>
                    <div class="search-wrapper"><div id="search-placeholder"></div></div>
                    <div id="add-btn-placeholder"></div>
                </div>
                <hr>
                <div id="visa-list" class="row row-cols-1 row-cols-md-4 g-4 p-3"></div>
            </div>`;
    }

    // Отрисовка списка карточек
    renderCards(data) {
        const list = document.getElementById('visa-list');
        if (!list) return;
        list.innerHTML = ''; 

        data.forEach(item => {
            const card = new VisaCardComponent(list);
            // ПРАВКА: теперь в VisaPage передаем только ID, а не весь объект
            card.render(
                item, 
                () => window.renderPage(VisaPage, item.id), 
                (id) => this.deleteVisa(id)
            );
        });
    }

    render() {
        this.parent.innerHTML = this.getHTML();
        
        // 1. Инициализируем поиск
        new SearchBar(document.getElementById('search-placeholder'), (term) => {
            const filtered = this.visaData.filter(v => v.title.toLowerCase().includes(term.toLowerCase()));
            this.renderCards(filtered);
        }).render();

        // 2. Инициализируем кнопку добавления
        new ButtonAdd(document.getElementById('add-btn-placeholder')).render(() => {
            console.log("Добавление будет реализовано в 6 лабе через POST");
        });

        // 3. ЗАПРОС К СЕРВЕРУ (Суть 5 лабы)
        ajax.get(visaUrls.getVisaList(), (data) => {
            this.visaData = data; // Сохраняем пришедшие данные
            this.renderCards(this.visaData); // Рисуем их
        });
    }

    deleteVisa(id) {
        // В 5 лабе удаление обычно остается локальным или делается через DELETE запрос
        this.visaData = this.visaData.filter(v => v.id !== id);
        this.renderCards(this.visaData);
    }
}