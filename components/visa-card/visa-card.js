import { ButtonDelete } from "../button-delete/button-delete.js";

export class VisaCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    // РЕАЛИЗАЦИЯ ЗАДАЧИ 2.3 (Максимальная серия 1)
    getMaxApprovalSeries(binaryStr) {
        if (!binaryStr) return 0;
        // Разбиваем строку по нулям и находим самую длинную последовательность единиц
        return Math.max(...binaryStr.split('0').map(group => group.length));
    }

    // РЕАЛИЗАЦИЯ ЗАДАЧИ 3.5 (Слияние объектов с приоритетом первого)
    merge(...objects) {
        const result = {}; 
        let i = 0;       

        if (objects.length === 0) return result; 

        do {
            const currentObj = objects[i];

            for (const key in currentObj) {
                // Если ключа еще нет в итоговом объекте, добавляем его (приоритет первого объекта)
                if (currentObj.hasOwnProperty(key) && !(key in result)) {
                    result[key] = currentObj[key]; 
                }
            }
            i++;
        } while (i < objects.length); 

        return result;
    }

    getHTML(data) {
        const history = data.approvalHistory || "0";
        const maxSeries = this.getMaxApprovalSeries(history);
        const totalChecks = history.length;
        
        const generalDocs = { passport: "Загранпаспорт", photo: "Фото" };
        const countryDocs = data.extraDocs || { insurance: "Страховка" };
        const fullPackage = this.merge(generalDocs, countryDocs);
        const docsString = Object.values(fullPackage).join(", ");

        return `
            <div class="col" id="visa-card-${data.id}">
                <div class="card h-100 shadow-sm border-0 position-relative">
                    ${data.isNew ? `<span class="position-absolute top-0 start-0 badge rounded-pill bg-danger" style="margin: 10px; z-index: 5;">NEW</span>` : ''}
                    
                    <img src="${data.src}" class="card-img-top" alt="${data.title}" style="height: 200px; object-fit: cover;">
                    <div class="card-body d-flex flex-column">
                        
                        <!-- Блок заголовка и рейтинга -->
                        <div class="d-flex justify-content-between align-items-start mb-2" style="min-height: 3.5rem;">
                            <h5 class="card-title" style="color: #3242AA; font-weight: bold; margin: 0; line-height: 1.2;">
                                ${data.title}
                            </h5>
                            <span class="badge bg-success" title="Серия одобрений" style="white-space: nowrap; margin-left: 10px;">
                                ${maxSeries} из ${totalChecks}
                            </span>
                        </div>
                        
                        <!-- Описание визы (фиксированная высота) -->
                        <p class="card-text text-muted" style="font-size: 0.9rem; min-height: 2.8rem; margin-bottom: 1rem; line-height: 1.4;">
                            ${data.text}
                        </p>
                        
                        <!-- Блок документов (фиксированная высота) -->
                        <div class="mb-3">
                            <small class="text-primary fw-bold" style="font-size: 0.75rem; text-transform: uppercase;">Необходимые документы:</small><br>
                            <small class="text-muted" style="font-size: 0.85rem; display: block; min-height: 2.5rem; line-height: 1.3;">
                                ${docsString}
                            </small>
                        </div>

                        <div class="d-flex justify-content-between align-items-center mt-auto">
                            <button class="btn btn-primary btn-sm details-btn">Подробнее</button>
                            <div id="del-btn-container-${data.id}"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    render(data, onDetails, onDelete) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));
        const cardElement = document.getElementById(`visa-card-${data.id}`);
        
        if (cardElement) {
            cardElement.querySelector('.details-btn').onclick = onDetails;
        }
        
        const deleteContainer = document.getElementById(`del-btn-container-${data.id}`);
        if (deleteContainer) {
            const deleteBtn = new ButtonDelete(deleteContainer);
            deleteBtn.render(data.id, onDelete);
        }
    }
}