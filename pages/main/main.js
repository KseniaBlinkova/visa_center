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
    async getData(searchTerm = "") {
        const list = document.getElementById('visa-list');
        if (list) {
            list.innerHTML = '<div class="text-center w-100"><div class="spinner-border text-primary"></div></div>';
        }

        const url = searchTerm 
            ? `${visaUrls.getVisas()}?title=${encodeURIComponent(searchTerm)}` 
            : visaUrls.getVisas();

        try {
            const data = await ajax.get(url);
            this.visaData = data; 
            this.renderCards(this.visaData);
        } catch (error) {
            if (list) {
                list.innerHTML = `<div class="alert alert-danger w-100">Ошибка загрузки: ${error.message}</div>`;
            }
        }
    }

    getHTML() {
        return `
            <div class="container mt-3">
                <div class="row align-items-center g-3 mb-4">
                    <div class="col-auto">
                        <h4 class="mb-0" style="color: #3242AA; font-weight: bold; white-space: nowrap;">
                            Виды виз
                        </h4>
                    </div>
                    <div class="col d-flex justify-content-center">
                        <div id="search-placeholder" style="width: 100%; max-width: 550px;"></div>
                    </div>
                    <div class="col-auto text-end">
                        <div id="add-btn-placeholder"></div>
                    </div>
                </div>
                <hr>
                <div id="visa-list" class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4 p-3"></div>
            </div>
        `;
    }

    async deleteVisa(id) {
        if (confirm("Вы уверены, что хотите удалить эту визу?")) {
            try {
                await ajax.delete(visaUrls.getVisaById(id));
                await this.getData(); 
            } catch (error) {
                console.error("Ошибка при удалении:", error);
            }
        }
    }

    renderCards(data) {
        const list = document.getElementById('visa-list');
        if (!list) return;
        list.innerHTML = '';

        if (data.length === 0) {
            list.innerHTML = '<div class="text-center w-100">Ничего не найдено</div>';
            return;
        }

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

    async render() {
        this.parent.innerHTML = this.getHTML();

        new SearchBar(document.getElementById('search-placeholder'), (term) => {
            this.getData(term); 
        }).render();


        new ButtonAdd(document.getElementById('add-btn-placeholder')).render(() => {
            window.renderPage(VisaEditPage, 1); 
        });

        await this.getData();
    }
}