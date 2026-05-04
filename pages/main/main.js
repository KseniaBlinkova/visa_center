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
//             { id: 1, src: "https://avatars.mds.yandex.net/i?id=e8ad0b199d7cb6c09ae79b47475319eaf10cb2ac-5227398-images-thumbs&n=13", title: "Туристическая виза", text: "Для поездок с целью отдыха.", approvalHistory: "1110111101", extraDocs: { special: "Бронь отеля в ЕС" } },
//             { id: 2, src: "https://as2.ftcdn.net/jpg/04/97/69/45/1000_F_497694534_nRWXyh4rBvxN5tfltJw3GciWc6D9jIBn.jpg", title: "Деловая виза", text: "Для участия в переговорах.", approvalHistory: "111011110111111111", extraDocs: { special: "Справка о доходах (2НДФЛ)"} },
//             { id: 3, src: "https://t3.ftcdn.net/jpg/09/85/68/40/360_F_985684016_4R0lAtjvTeJeCx5tG01NVWYGzALa211n.jpg", title: "Медицинская виза", text: "Для лечения за рубежом.", approvalHistory: "100100111"},
//             { id: 4, src: "https://avatars.mds.yandex.net/i?id=e7e8ed3455c62d9b6ddbc567bebdeb83_l-10075807-images-thumbs&n=13", title: "Студенческая виза", text: "Для обучения за границей.", approvalHistory: "00000001" },
//             { id: 5, src: "https://espanaservice.com/images/publications/content/Statii/VIP_Europa/VIP_Pekin.jpg", title: "Виза по приглашению", text: "Для посещения родственников.", approvalHistory: "111111111" }
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

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.visaData = this.getData();
    }

    getData() {
        return [
            { id: 1, src: "https://avatars.mds.yandex.net/i?id=e8ad0b199d7cb6c09ae79b47475319eaf10cb2ac-5227398-images-thumbs&n=13", title: "Туристическая виза", text: "Для поездок с целью отдыха.", approvalHistory: "1110111101", extraDocs: { special: "Бронь отеля в ЕС" } },
            { id: 2, src: "https://as2.ftcdn.net/jpg/04/97/69/45/1000_F_497694534_nRWXyh4rBvxN5tfltJw3GciWc6D9jIBn.jpg", title: "Деловая виза", text: "Для участия в переговорах.", approvalHistory: "111011110111111111", extraDocs: { special: "Справка о доходах (2НДФЛ)"} },
            { id: 3, src: "https://t3.ftcdn.net/jpg/09/85/68/40/360_F_985684016_4R0lAtjvTeJeCx5tG01NVWYGzALa211n.jpg", title: "Медицинская виза", text: "Для лечения за рубежом.", approvalHistory: "100100111"},
            { id: 4, src: "https://avatars.mds.yandex.net/i?id=e7e8ed3455c62d9b6ddbc567bebdeb83_l-10075807-images-thumbs&n=13", title: "Студенческая виза", text: "Для обучения за границей.", approvalHistory: "00000001" },
            { id: 5, src: "https://espanaservice.com/images/publications/content/Statii/VIP_Europa/VIP_Pekin.jpg", title: "Виза по приглашению", text: "Для посещения родственников.", approvalHistory: "111111111" }
        ];
    }

    getHTML() {
        return `
            <div class="container mt-3">
                <div class="main-controls-row">
                    <h4 class="page-title">Виды виз</h4>
                    <div class="search-wrapper">
                        <div id="search-placeholder"></div>
                    </div>
                    <div id="add-btn-placeholder"></div>
                </div>
                <hr>
                <div id="visa-list" class="row row-cols-1 row-cols-md-4 g-4 p-3"></div>
            </div>`;
    }

    // ИСПОЛЬЗУЕМ MERGE ДЛЯ СОЗДАНИЯ НОВОЙ КАРТОЧКИ
    addVisa() {
        const cardComponent = new VisaCardComponent();
        const baseData = this.visaData[0]; // Берем за основу первую визу
        
        // Новые свойства для карточки
        const updatedInfo = { 
            id: Date.now(), 
            src: "https://t3.ftcdn.net/jpg/00/93/90/14/360_F_93901422_4paFSbjSWE6nIjRocyedVHLyXr5tACN4.jpg",
            title: "Спецпредложение", 
            isNew: true, // Флаг для отображения значка
            approvalHistory: "1111111" 
        };

        // Применяем задачу 3.1: сливаем новые данные с базовыми
        const newVisa = cardComponent.merge(updatedInfo, baseData);
        
        this.visaData.push(newVisa);
        this.renderCards(this.visaData);
    }

    deleteVisa(id) {
        this.visaData = this.visaData.filter(v => v.id !== id);
        this.renderCards(this.visaData);
    }

    renderCards(data) {
        const list = document.getElementById('visa-list');
        if (!list) return;
        list.innerHTML = '';

        data.forEach(item => {
            const card = new VisaCardComponent(list);
            card.render(
                item, 
                () => window.renderPage(VisaPage, item), 
                (id) => this.deleteVisa(id)
            );
        });
    }

    render() {
        this.parent.innerHTML = this.getHTML();
        new SearchBar(document.getElementById('search-placeholder'), (term) => {
            const filtered = this.visaData.filter(v => v.title.toLowerCase().includes(term.toLowerCase()));
            this.renderCards(filtered);
        }).render();
        new ButtonAdd(document.getElementById('add-btn-placeholder')).render(() => this.addVisa());
        this.renderCards(this.visaData);
    }
}