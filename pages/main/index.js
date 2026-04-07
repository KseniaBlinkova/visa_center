import { VisaCardComponent } from "../../components/visa-card/index.js";
import { VisaPage } from "../visa/index.js";
import { SearchComponent } from "../../components/search/index.js"; 

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.visaData = this.getData();
    }

    get pageRoot() {
        return document.getElementById('visa-list'); // Меняем на ID контейнера со списком
    }

    getHTML() {
    return `
        <div id="main-container">
            <div class="d-flex justify-content-between align-items-center mb-3 mt-3" style="padding: 0 20px;">
                
                <h4 class="mb-0" style="white-space: nowrap;">Виды виз</h4>
                
                <div id="search-container" class="flex-grow-1 mx-4" style="max-width: 500px;"></div>
                
                <button id="add-visa-btn" class="btn btn-success" style="white-space: nowrap;">+ Добавить визу</button>
            </div>
            
            <div id="visa-list" class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 p-3">
            </div>
        </div>
    `;
}


    getData() {
        return [
            { 
                id: 1, 
                src: "https://avatars.mds.yandex.net/i?id=e8ad0b199d7cb6c09ae79b47475319eaf10cb2ac-5227398-images-thumbs&n=13", 
                title: "Туристическая виза", 
                text: "Для краткосрочных поездок с целью отдыха.",
                reqCode: "111011",
                term: "1 день"
            },
            { 
                id: 2, 
                src: "https://as2.ftcdn.net/jpg/04/97/69/45/1000_F_497694534_nRWXyh4rBvxN5tfltJw3GciWc6D9jIBn.jpg", 
                title: "Деловая виза", 
                text: "Для участия в переговорах.",
                reqCode: "110111111"
            },
            { 
                id: 3, 
                src: "https://t3.ftcdn.net/jpg/09/85/68/40/360_F_985684016_4R0lAtjvTeJeCx5tG01NVWYGzALa211n.jpg", 
                title: "Медицинская виза", 
                text: "Для лечения за рубежом.",
                reqCode: "1111101",
                term: "15 дней"
            },
            { 
                id: 4, 
                src: "https://avatars.mds.yandex.net/i?id=e7e8ed3455c62d9b6ddbc567bebdeb83_l-10075807-images-thumbs&n=13", 
                title: "Студенческая виза", 
                text: "Для обучения за границей.",
                reqCode: "1111111011"
            },
            { 
                id: 5, 
                src: "https://espanaservice.com/images/publications/content/Statii/VIP_Europa/VIP_Pekin.jpg", 
                title: "Виза по приглашению", 
                text: "Для посещения родственников.",
                reqCode: "10111"
            }
        ];
    }

    addListeners() {
        const addBtn = document.getElementById('add-visa-btn');
        if (addBtn) {
            addBtn.addEventListener('click', () => this.addVisa());
        }
    }

    addVisa() {
        const firstVisa = this.visaData[0];
        const newId = Date.now();
        const newVisa = {
            ...firstVisa,
            id: newId,
            title: `${firstVisa.title} (копия)`,
            reqCode: "11011"
        };
        this.visaData.push(newVisa);
        this.render();
    }

    deleteVisa(id) {
        this.visaData = this.visaData.filter(item => item.id !== id);
        this.render();
    }

    clickCard(cardId) {
        window.renderPage(VisaPage, cardId);
    }

// Метод, который только рисует карточки на основе переданного массива
renderCards(data) {
    const listContainer = document.getElementById('visa-list');
    if (!listContainer) return;

    listContainer.innerHTML = ''; // Очищаем только список

    data.forEach((item) => {
        const card = new VisaCardComponent(listContainer);
        card.render(
            item, 
            () => this.clickCard(item.id), 
            this.deleteVisa.bind(this)
        );
    });
}

render() {
    // 1. Рисуем каркас страницы один раз
    this.parent.innerHTML = this.getHTML();
    
    // 2. Рисуем поиск
    const searchContainer = document.getElementById('search-container');
    if (searchContainer) {
        const searchComponent = new SearchComponent(searchContainer, (term) => {
            // Вот тут магия: при вводе текста мы просто фильтруем данные и перерисовываем КАРТОЧКИ
            const filtered = this.visaData.filter(visa => 
                visa.title.toLowerCase().includes(term.toLowerCase())
            );
            this.renderCards(filtered);
        });
        searchComponent.render();
    }
    
    this.addListeners();

    // 3. Сразу рисуем ВСЕ карточки при первой загрузке
    this.renderCards(this.visaData);
}
}


