import { VisaDetailComponent } from "../../components/visa-detail/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";

export class VisaPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    get pageRoot() {
        return document.getElementById('visa-page');
    }

    getHTML() {
    return `<div id="visa-page" class="p-3"></div>`;
}
    getData() {
        const visaData = {
            1: {
                title: "Туристическая виза",
                src: "https://avatars.mds.yandex.net/i?id=e8ad0b199d7cb6c09ae79b47475319eaf10cb2ac-5227398-images-thumbs&n=13",
                fullText: "Туристическая виза предназначена для краткосрочных поездок с целью отдыха или знакомства со страной. Обычно выдаётся на срок от двух недель до трёх месяцев и не разрешает вести в стране пребывания трудовую деятельность. Для получения требуется подтверждение бронирования отеля, обратные билеты и выписка с банковского счёта."
            },
            2: {
                title: "Деловая виза",
                src: "https://as2.ftcdn.net/jpg/04/97/69/45/1000_F_497694534_nRWXyh4rBvxN5tfltJw3GciWc6D9jIBn.jpg",
                fullText: "Деловая виза предназначена для участия в переговорах, конференциях или других рабочих мероприятиях. Для получения нужно предоставлять приглашение от принимающей компании. Виза может быть однократной или многократной."
            },
            3: {
                title: "Медицинская виза",
                src: "https://t3.ftcdn.net/jpg/09/85/68/40/360_F_985684016_4R0lAtjvTeJeCx5tG01NVWYGzALa211n.jpg",
                fullText: "Медицинская виза выдаётся для прохождения лечения или медицинского обследования за рубежом. Требуется приглашение от медицинского учреждения, подтверждение диагноза и финансовые гарантии оплаты лечения."
            },
            4: {
                title: "Студенческая виза",
                src: "https://avatars.mds.yandex.net/i?id=e7e8ed3455c62d9b6ddbc567bebdeb83_l-10075807-images-thumbs&n=13",
                fullText: "Студенческая виза выдаётся иностранным студентам для обучения в зарубежных образовательных учреждениях. Даёт право находиться в стране в течение всего срока обучения. Для получения необходимо подтверждение зачисления и финансовая гарантия."
            },
            5: {
                title: "Виза по приглашению",
                src: "https://espanaservice.com/images/publications/content/Statii/VIP_Europa/VIP_Pekin.jpg",
                fullText: "Виза по приглашению предназначена для посещения родственников или друзей по частному приглашению. Требуется нотариально заверенное приглашение от принимающей стороны, подтверждение родства или дружеских связей."
            }
        };

        return visaData[this.id] || {
            title: "Информация о визе",
            src: "https://images.pexels.com/photos/1450103/pexels-photo-1450103.jpeg?w=400&h=300&fit=crop",
            fullText: "Подробная информация о данном типе визы. Обратитесь в консульство для уточнения деталей."
        };
    }

    clickBack() {
        this.parent.innerHTML = '';
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        const data = this.getData();
        const detail = new VisaDetailComponent(this.pageRoot);
        detail.render(data);
    }
}