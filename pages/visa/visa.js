// import { ButtonBack } from "../../components/button-back/button-back.js";
// import { MainPage } from "../main/main.js";

// export class VisaPage {
//     constructor(parent, data) {
//         this.parent = parent;
//         this.data = data; // Это данные из MainPage (id, title, src и т.д.)
//     }

//     // Хранилище подробных текстов
//     getFullInformation(id) {
//         const info = {
//             1: "Туристическая виза предназначена для краткосрочных поездок с целью отдыха или знакомства со страной. Обычно выдаётся на срок от двух недель до трёх месяцев и не разрешает вести трудовую деятельность.",
//             2: "Деловая виза предназначена для участия в переговорах, конференциях или других рабочих мероприятиях. Для получения нужно приглашение от принимающей компании.",
//             3: "Медицинская виза выдаётся для прохождения лечения или медицинского обследования. Требуется приглашение от клиники и подтверждение финансовых гарантий.",
//             4: "Студенческая виза выдаётся для обучения. Даёт право находиться в стране в течение всего срока учебы. Необходимо подтверждение зачисления.",
//             5: "Виза по приглашению предназначена для посещения родственников или друзей. Требуется заверенное приглашение от принимающей стороны."
//         };
//         return info[id] || "Подробная информация уточняется в консульстве.";
//     }

//     getHTML() {
//         // Получаем расширенный текст на основе ID
//         const detailedText = this.getFullInformation(this.data.id);

//         return `
//             <div class="container mt-4">
//                 <div id="back-btn-placeholder" class="mb-3"></div>
//                 <div class="card shadow-sm border-0">
//                     <div class="row g-0">
//                         <div class="col-md-6">
//                             <img src="${this.data.src}" class="img-fluid rounded-start" alt="${this.data.title}" 
//                                  style="width: 100%; height: 450px; object-fit: cover;">
//                         </div>
//                         <div class="col-md-6">
//                             <div class="card-body p-4">
//                                 <h2 class="fw-bold" style="color: #3242AA;">${this.data.title}</h2>
                                
//                                 <p class="lead mt-3" style="color: #444;">${detailedText}</p>
                                
//                                 <hr>
//                                 <div class="alert alert-info">
//                                     <strong>Инструкция:</strong> Подготовьте загранпаспорт, 2 фото 3.5x4.5 и справку с работы для оформления.
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>`;
//     }

//     render() {
//         this.parent.innerHTML = this.getHTML();

//         new ButtonBack(document.getElementById('back-btn-placeholder')).render(() => window.renderPage(MainPage));
//     }
// }


import { ButtonBack } from "../../components/button-back/button-back.js";
import { MainPage } from "../main/main.js";
import { ajax } from "../../modules/ajax.js";
import { visaUrls } from "../../modules/visaUrls.js";

export class VisaPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id; // Сохраняем ID, который пришел при клике
    }

    getHTML(data) {
        return `
            <div class="container mt-4">
                <div id="back-btn-placeholder" class="mb-3"></div>
                <div class="card shadow-sm border-0">
                    <div class="row g-0">
                        <div class="col-md-6">
                            <img src="${data.src}" class="img-fluid rounded-start" alt="${data.title}" 
                                 style="width: 100%; height: 450px; object-fit: cover;">
                        </div>
                        <div class="col-md-6">
                            <div class="card-body p-4">
                                <h2 class="fw-bold" style="color: #3242AA;">${data.title}</h2>
                                <p class="lead mt-3" style="color: #444;">${data.text}</p> 
                                <hr>
                                <div class="alert alert-info">
                                    <strong>Срок оформления:</strong> ${data.term || 'Индивидуально'} <br>
                                    <strong>Код услуги:</strong> ${data.reqCode || '---'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
    }

    render() {
        // Сначала рисуем пустую страницу с кнопкой "Назад"
        this.parent.innerHTML = `
            <div class="container mt-4">
                <div id="back-btn-placeholder" class="mb-3"></div>
                <div id="loading" class="text-center">Загрузка данных с сервера...</div>
            </div>`;

        new ButtonBack(document.getElementById('back-btn-placeholder')).render(() => window.renderPage(MainPage));

        // ДЕЛАЕМ ЗАПРОС К СЕРВЕРУ ПО ID
        ajax.get(visaUrls.getVisaById(this.id), (data) => {
            // Когда данные пришли — перерисовываем контент
            const loading = document.getElementById('loading');
            if (loading) loading.remove();
            
            this.parent.innerHTML = this.getHTML(data);
            // Перерендериваем кнопку назад, так как innerHTML стер всё
            new ButtonBack(document.getElementById('back-btn-placeholder')).render(() => window.renderPage(MainPage));
        });
    }
}