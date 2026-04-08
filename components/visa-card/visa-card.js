import { ButtonDelete } from "../button-delete/button-delete.js";

export class VisaCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    // РЕАЛИЗАЦИЯ ЗАДАЧИ 2.3 (Максимальная серия)
    getMaxApprovalSeries(binaryStr) {
        if (!binaryStr) return 0;
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
                if (currentObj.hasOwnProperty(key) && !(key in result)) {
                    result[key] = currentObj[key]; 
                }
            }
            i++;
        } while (i < objects.length); 

        return result;
    }

    getHTML(data) {
        return `
            <div class="col" id="visa-card-${data.id}">
                <div class="card h-100 shadow-sm border-0">
                    <img src="${data.src}" class="card-img-top" alt="${data.title}" style="height: 200px; object-fit: cover;">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title" style="color: #3242AA; font-weight: bold;">${data.title}</h5>
                        <p class="card-text text-muted flex-grow-1">${data.text}</p>
                        
                        <div class="mb-2" style="min-height: 50px;">
                            <span id="stats-output-${data.id}" class="badge bg-success mb-1" style="display: none;"></span>
                            <small id="merge-output-${data.id}" class="text-muted d-block" style="font-size: 0.75rem;"></small>
                        </div>

                        <button class="btn btn-outline-secondary btn-sm w-100 mb-2 stats-btn">
                            Статистика одобрений
                        </button>

                        <button class="btn btn-outline-info btn-sm w-100 mb-3 merge-btn">
                            Проверить документы
                        </button>

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
            // Клик "Подробнее"
            cardElement.querySelector('.details-btn').onclick = onDetails;

            // Логика кнопки Статистики (Задача 2.3)
            cardElement.querySelector('.stats-btn').onclick = () => {
                const sequence = data.approvalHistory || "0";
                const maxSeries = this.getMaxApprovalSeries(sequence);
                const output = document.getElementById(`stats-output-${data.id}`);
                output.textContent = `Пик: ${maxSeries} из ${sequence.length} одобрений`;
                output.style.display = 'inline-block';
            };

            // Логика кнопки Документов (Задача 3.5)
            cardElement.querySelector('.merge-btn').onclick = () => {
                const generalDocs = { passport: "Загранпаспорт", photo: "Фото" };
                const countryDocs = data.extraDocs || { insurance: "Страховка" };
                
                // Слияние объектов
                const fullPackage = this.merge(generalDocs, countryDocs);
                
                const output = document.getElementById(`merge-output-${data.id}`);
                output.textContent = "Нужно: " + Object.values(fullPackage).join(", ");
            };
        }
        
        const deleteContainer = document.getElementById(`del-btn-container-${data.id}`);
        if (deleteContainer) {
            const deleteBtn = new ButtonDelete(deleteContainer);
            deleteBtn.render(data.id, onDelete);
        }
    }
}

