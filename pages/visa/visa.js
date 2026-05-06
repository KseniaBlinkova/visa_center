import { MainPage } from "../main/main.js";
import { PlanetComponent } from "../../components/planet/planet.js";
import { ajax } from "../../modules/ajax.js";
import { visaUrls } from "../../modules/visaUrls.js";

export class VisaPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
        this.data = null;
    }

    getHTML(data) {
        return `
            <div class="container mt-4">
                <div class="card shadow-sm border-0">
                    <div class="row g-0">
                        <div class="col-md-6 bg-light d-flex flex-column align-items-center justify-content-center" style="min-height: 450px;">
                            <div id="planet-container" style="width: 100%; height: 350px;"></div>
                            
                            <div class="btn-group btn-group-sm mb-3" role="group">
                                <button id="view-front" class="btn btn-outline-primary">Вид спереди</button>
                                <button id="view-back" class="btn btn-outline-primary">Сзади</button>
                                <button id="view-left" class="btn btn-outline-primary">Слева</button>
                                <button id="view-right" class="btn btn-outline-primary">Справа</button>
                                <button id="zoom-in" class="btn btn-primary">+</button>
                                <button id="zoom-out" class="btn btn-primary">-</button>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="card-body p-4">
                                <h2 class="fw-bold" style="color: #3242AA;">${data.title}</h2>
                                <p class="lead mt-3" style="color: #444;">${data.fullDescription || "Описание уточняется..."}</p>
                                <hr>
                                <p><strong>Срок оформления:</strong> ${data.term || 'не указан'}</p>
                                <div class="alert alert-info mt-3">
                                    <small><strong>Инструкция:</strong> Для вращения используйте мышь. Кнопки меняют ракурс.</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
    }

    // ЛР6: Асинхронный рендер с использованием await
    // async render() {
    //     this.parent.innerHTML = `
    //         <div class="text-center mt-5">
    //             <div class="spinner-border text-primary" role="status"></div>
    //             <p class="mt-2">Загрузка 3D-модели и данных...</p>
    //         </div>`;

    //     try {
    //         // Ждем данные от сервера без колбэков
    //         const data = await ajax.get(visaUrls.getVisaById(this.id));
    //         this.data = data;
            
    //         // Отрисовываем HTML
    //         this.parent.innerHTML = this.getHTML(data);
            
    //         // Навешиваем обработчик на кнопку "Назад"
    //         document.getElementById('back-btn').onclick = () => window.renderPage(MainPage);

    //         // Инициализируем планету после того, как HTML появился в DOM
    //         this.initPlanet();

    //     } catch (error) {
    //         this.parent.innerHTML = `
    //             <div class="container mt-5 text-center">
    //                 <div class="alert alert-danger">Ошибка: данные не получены (${error.message})</div>
    //                 <button class="btn btn-primary" id="error-back-btn">Вернуться на главную</button>
    //             </div>`;
            
    //         document.getElementById('error-back-btn').onclick = () => window.renderPage(MainPage);
    //     }
    // }

    // ЛР6: Асинхронный рендер с использованием await
    async render() {
        this.parent.innerHTML = `
            <div class="text-center mt-5">
                <div class="spinner-border text-primary" role="status"></div>
                <p class="mt-2">Загрузка 3D-модели и данных...</p>
            </div>`;

        try {
            // Ждем данные от сервера
            const data = await ajax.get(visaUrls.getVisaById(this.id));
            this.data = data;
            
            // Отрисовываем HTML (без кнопки back-btn)
            this.parent.innerHTML = this.getHTML(data);
            
            // Оживляем кнопку "Домой" в шапке (если она там есть)
            const homeBtn = document.getElementById('home-btn') || document.querySelector('button:contains("Домой")');
            if (homeBtn) {
                homeBtn.onclick = () => window.renderPage(MainPage);
            }

            // Инициализируем планету
            this.initPlanet();

        } catch (error) {
            this.parent.innerHTML = `
                <div class="container mt-5 text-center">
                    <div class="alert alert-danger">Ошибка: данные не получены (${error.message})</div>
                    <button class="btn btn-primary" id="error-back-btn">На главную</button>
                </div>`;
            
            const errBtn = document.getElementById('error-back-btn');
            if (errBtn) {
                errBtn.onclick = () => window.renderPage(MainPage);
            }
        }
    }

    initPlanet() {
        const planetContainer = document.getElementById('planet-container');
        if (planetContainer) {
            const planet = new PlanetComponent(planetContainer);
            planet.init();

            // Привязываем кнопки управления камерой
            document.getElementById('view-front').onclick = () => planet.setView('front');
            document.getElementById('view-back').onclick = () => planet.setView('back');
            document.getElementById('view-left').onclick = () => planet.setView('left');
            document.getElementById('view-right').onclick = () => planet.setView('right');
            document.getElementById('zoom-in').onclick = () => planet.zoomIn();
            document.getElementById('zoom-out').onclick = () => planet.zoomOut();
        }
    }
}