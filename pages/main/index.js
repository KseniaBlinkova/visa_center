import { VisaCardComponent } from "../../components/visa-card/index.js";
import { VisaPage } from "../visa/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return `
            <div id="main-page" class="d-flex flex-wrap gap-3 p-3"></div>
        `;
    }

    getData() {
        return [
            {
                id: 1,
                src: "https://avatars.mds.yandex.net/i?id=e8ad0b199d7cb6c09ae79b47475319eaf10cb2ac-5227398-images-thumbs&n=13",
                title: "Туристическая виза",
                text: "Для краткосрочных поездок с целью отдыха или знакомства со страной. Выдаётся на срок от двух недель до трёх месяцев."
            },
            {
                id: 2,
                src: "https://as2.ftcdn.net/jpg/04/97/69/45/1000_F_497694534_nRWXyh4rBvxN5tfltJw3GciWc6D9jIBn.jpg",
                title: "Деловая виза",
                text: "Для участия в переговорах, конференциях или других рабочих мероприятиях. Требуется приглашение от принимающей компании."
            },
            {
                id: 3,
                src: "https://t3.ftcdn.net/jpg/09/85/68/40/360_F_985684016_4R0lAtjvTeJeCx5tG01NVWYGzALa211n.jpg",
                title: "Медицинская виза",
                text: "Для прохождения лечения или медицинского обследования за рубежом. Требуется приглашение от медицинского учреждения."
            },
            {
                id: 4,
                src: "https://avatars.mds.yandex.net/i?id=e7e8ed3455c62d9b6ddbc567bebdeb83_l-10075807-images-thumbs&n=13",
                title: "Студенческая виза",
                text: "Для обучения в зарубежных образовательных учреждениях. Даёт право находиться в стране в течение всего срока учёбы."
            },
            {
                id: 5,
                src: "https://espanaservice.com/images/publications/content/Statii/VIP_Europa/VIP_Pekin.jpg",
                title: "Виза по приглашению",
                text: "Для посещения родственников или друзей по частному приглашению. Требуется нотариально заверенное приглашение от принимающей стороны."
            }
        ];
    }

    clickCard(e) {
        const cardId = e.target.dataset.id;
        const visaPage = new VisaPage(this.parent, cardId);
        visaPage.render();
    }

    render() {
        // Очищаем root
        const oldPage = document.getElementById('main-page');
        if (oldPage) {
            oldPage.remove();
        }
        
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const data = this.getData();
        data.forEach((item) => {
            const card = new VisaCardComponent(this.pageRoot);
            card.render(item, this.clickCard.bind(this));
        });
    }
}