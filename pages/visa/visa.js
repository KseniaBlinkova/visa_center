import { MainPage } from "../main/main.js";
import { PlanetComponent } from "../../components/planet/planet.js";

export class VisaPage {
    constructor(parent, data) {
        this.parent = parent;
        this.data = data;
    }

    getFullInformation(id) {
        const info = {
            1: "Туристическая виза предназначена для краткосрочных поездок с целью отдыха или знакомства со страной. Обычно выдаётся на срок от двух недель до трёх месяцев и не разрешает вести трудовую деятельность.",
            2: "Деловая виза предназначена для участия в переговорах, конференциях или других рабочих мероприятиях. Для получения нужно приглашение от принимающей компании.",
            3: "Медицинская виза выдаётся для прохождения лечения или медицинского обследования. Требуется приглашение от клиники и подтверждение финансовых гарантий.",
            4: "Студенческая виза выдаётся для обучения. Даёт право находиться в стране в течение всего срока учебы. Необходимо подтверждение зачисления.",
            5: "Виза по приглашению предназначена для посещения родственников или друзей. Требуется заверенное приглашение от принимающей стороны."
        };
        return info[id] || "Подробная информация уточняется в консульстве.";
    }
    getHTML() {
    const detailedText = this.getFullInformation(this.data.id);

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
                            <h2 class="fw-bold" style="color: #3242AA;">${this.data.title}</h2>
                            <p class="lead mt-3" style="color: #444;">${detailedText}</p>
                            <hr>
                            <div class="alert alert-info">
                                <strong>Инструкция:</strong> Для вращения используйте мышь. Кнопки меняют ракурс.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
}


    render() {
        this.parent.innerHTML = this.getHTML();

        // 1. Инициализация 3D-планеты
        const planetContainer = document.getElementById('planet-container');
        const planet = new PlanetComponent(planetContainer);
        planet.init();

        // 2. Логика кнопок переключения видов (ВОТ ЭТОГО НЕ ХВАТАЛО)
        document.getElementById('view-front').onclick = () => planet.setView('front');
        document.getElementById('view-back').onclick = () => planet.setView('back');
        document.getElementById('view-left').onclick = () => planet.setView('left');
        document.getElementById('view-right').onclick = () => planet.setView('right');

        // 3. Логика кнопок масштаба
        document.getElementById('zoom-in').onclick = () => planet.zoomIn();
        document.getElementById('zoom-out').onclick = () => planet.zoomOut();

        // Кнопка назад
        new ButtonBack(document.getElementById('back-btn-placeholder')).render(() => window.renderPage(MainPage));
    }
}




