import { ButtonDelete } from "../button-delete/button-delete.js";

export class VisaCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="col" id="visa-card-${data.id}">
                <div class="card h-100 shadow-sm border-0">
                    <img src="${data.src}" class="card-img-top" alt="${data.title}" style="height: 200px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title" style="color: #3242AA; font-weight: bold;">${data.title}</h5>
                        <p class="card-text text-muted">${data.text}</p>
                        <div class="d-flex justify-content-between align-items-center mt-3">
                            <button class="btn btn-primary btn-sm details-btn">Подробнее</button>
                            
                            <div id="del-btn-container-${data.id}"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    render(data, onDetails, onDelete) {
        // 1. Вставляем верстку карточки
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));
        
        // 2. Находим саму карточку в DOM
        const cardElement = document.getElementById(`visa-card-${data.id}`);
        
        // 3. Вешаем клик на "Подробнее"
        if (cardElement) {
            cardElement.querySelector('.details-btn').onclick = onDetails;
        }
        
        // 4. Отрисовываем кнопку удаления в её личный контейнер
        const deleteContainer = document.getElementById(`del-btn-container-${data.id}`);
        if (deleteContainer) {
            const deleteBtn = new ButtonDelete(deleteContainer);
            // Передаем id и функцию удаления, которая пришла из MainPage
            deleteBtn.render(data.id, onDelete);
        }
    }
}