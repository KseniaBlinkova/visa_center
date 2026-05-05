import { VisaCardComponent } from "../../components/visa-card/visa-card.js";
import { SearchBar } from "../../components/search-bar/search-bar.js";
import { ButtonAdd } from "../../components/button-add/button-add.js";
import { VisaPage } from "../visa/visa.js";
import { VisaEditPage } from "../visa-edit/visa-edit.js"; 
import { ajax } from "../../modules/ajax.js";
import { visaUrls } from "../../modules/visaUrls.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.visaData = [];
    }

    getData(searchTerm = "") {
        const url = searchTerm 
            ? `${visaUrls.getVisas()}?title=${encodeURIComponent(searchTerm)}` 
            : visaUrls.getVisas();

        ajax.get(url, (data, status) => {
            if (status === 200) {
                this.visaData = data; 
                this.renderCards(this.visaData);
            }
        });
    }

    getHTML() {
    return `
        <div class="container mt-3">
            <!-- Используем сетку Grid вместо обычного Flex для точного контроля центра -->
            <div class="row align-items-center g-3 mb-4">
                
                <!-- 1. Заголовок (слева) -->
                <div class="col-auto">
                    <h4 class="mb-0" style="color: #3242AA; font-weight: bold; white-space: nowrap;">
                        Виды виз
                    </h4>
                </div>

                <!-- 2. Поиск (всегда стремится к центру) -->
                <div class="col d-flex justify-content-center">
                    <div id="search-placeholder" style="width: 100%; max-width: 550px;">
                        <!-- Здесь ваш SearchBar -->
                    </div>
                </div>

                <!-- 3. Кнопка добавить (справа) -->
                <div class="col-auto text-end">
                    <div id="add-btn-placeholder">
                        <!-- Здесь ваша кнопка -->
                    </div>
                </div>
            </div>

            <hr>
            <div id="visa-list" class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4 p-3"></div>
        </div>
    `;
    }


    deleteVisa(id) {
        ajax.delete(visaUrls.getVisaById(id), (data, status) => {
            if (status === 200 || status === 204) {
                this.getData();
            }
        });
    }

    renderCards(data) {
        const list = document.getElementById('visa-list');
        if (!list) return;
        list.innerHTML = '';

        data.forEach(item => {
            const card = new VisaCardComponent(list);
            card.render(
                item, 
                () => window.renderPage(VisaPage, item.id), 
                (id) => this.deleteVisa(id),
                (id) => window.renderPage(VisaEditPage, id) 
            );
        });
    }

    render() {
        this.parent.innerHTML = this.getHTML();

        new SearchBar(document.getElementById('search-placeholder'), (term) => {
            this.getData(term); 
        }).render();

        new ButtonAdd(document.getElementById('add-btn-placeholder')).render(() => {
            window.renderPage(VisaEditPage, 1); 
        });

        this.getData();
    }
}