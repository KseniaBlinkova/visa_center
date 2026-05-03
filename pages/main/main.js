// import { VisaCardComponent } from "../../components/visa-card/visa-card.js";
// import { SearchBar } from "../../components/search-bar/search-bar.js";
// import { ButtonAdd } from "../../components/button-add/button-add.js";
// import { VisaPage } from "../visa/visa.js";

// export class MainPage {
//     constructor(parent) {
//         this.parent = parent;
//         this.visaData = this.getData();
//     }

//     getData() {
//         return [
//             { id: 1, src: "https://avatars.mds.yandex.net/i?id=e8ad0b199d7cb6c09ae79b47475319eaf10cb2ac-5227398-images-thumbs&n=13", title: "Туристическая виза", text: "Для поездок с целью отдыха." },
//             { id: 2, src: "https://as2.ftcdn.net/jpg/04/97/69/45/1000_F_497694534_nRWXyh4rBvxN5tfltJw3GciWc6D9jIBn.jpg", title: "Деловая виза", text: "Для участия в переговорах." },
//             { id: 3, src: "https://t3.ftcdn.net/jpg/09/85/68/40/360_F_985684016_4R0lAtjvTeJeCx5tG01NVWYGzALa211n.jpg", title: "Медицинская виза", text: "Для лечения за рубежом." },
//             { id: 4, src: "https://avatars.mds.yandex.net/i?id=e7e8ed3455c62d9b6ddbc567bebdeb83_l-10075807-images-thumbs&n=13", title: "Студенческая виза", text: "Для обучения за границей." },
//             { id: 5, src: "https://espanaservice.com/images/publications/content/Statii/VIP_Europa/VIP_Pekin.jpg", title: "Виза по приглашению", text: "Для посещения родственников." }
//         ];
//     }

//     getHTML() {
//         return `
//             <div class="container mt-3">
//                 <div class="main-controls-row">
//                     <h4 class="page-title">Виды виз</h4>
//                     <div class="search-wrapper">
//                         <div id="search-placeholder"></div>
//                     </div>
//                     <div id="add-btn-placeholder"></div>
//                 </div>
//                 <hr>
//                 <div id="visa-list" class="row row-cols-1 row-cols-md-4 g-4 p-3"></div>
//             </div>`;
//     }

//     addVisa() {
//         const newVisa = { ...this.visaData[0], id: Date.now(), title: `${this.visaData[0].title} ` };
//         this.visaData.push(newVisa);
//         this.renderCards(this.visaData);
//     }

//     deleteVisa(id) {
//         this.visaData = this.visaData.filter(v => v.id !== id);
//         this.renderCards(this.visaData);
//     }

//     renderCards(data) {
//         const list = document.getElementById('visa-list');
//         if (!list) return;
//         list.innerHTML = ''; // Очищаем список перед новой отрисовкой

//         data.forEach(item => {
//             // Создаем экземпляр компонента карточки
//             const card = new VisaCardComponent(list);
//             // Вызываем рендер, передавая данные и функции-колбэки
//             card.render(
//                 item, 
//                 () => window.renderPage(VisaPage, item), 
//                 (id) => this.deleteVisa(id)
//             );
//         });
//     }

//     render() {
//         this.parent.innerHTML = this.getHTML();
//         new SearchBar(document.getElementById('search-placeholder'), (term) => {
//             const filtered = this.visaData.filter(v => v.title.toLowerCase().includes(term.toLowerCase()));
//             this.renderCards(filtered);
//         }).render();
//         new ButtonAdd(document.getElementById('add-btn-placeholder')).render(() => this.addVisa());
//         this.renderCards(this.visaData);
//     }
// }


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