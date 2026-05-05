import { ButtonDelete } from "../button-delete/button-delete.js";

export class VisaCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getMaxApprovalSeries(binaryStr) {
        if (!binaryStr) return 0;
        return Math.max(...binaryStr.split('0').map(group => group.length));
    }

    merge(...objects) {
        const result = {}; 
        if (objects.length === 0) return result; 
        let i = 0;       
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
        const history = data.reqCode || "0"; 
        const maxSeries = this.getMaxApprovalSeries(history);
        const totalChecks = history.length;
        
        const generalDocs = { passport: "Загранпаспорт", photo: "Фото" };
        const countryDocs = data.extraDocs || { insurance: "Страховка" }; 
        const fullPackage = this.merge(generalDocs, countryDocs);
        const docsString = Object.values(fullPackage).join(", ");

        return `
            <div class="col" id="visa-card-${data.id}">
                <div class="card h-100 shadow-sm border-0 position-relative">
                    <img src="${data.src}" class="card-img-top" alt="${data.title}" style="height: 200px; object-fit: cover;">
                    <div class="card-body d-flex flex-column">
                        
                        <div class="d-flex justify-content-between align-items-start mb-2" style="min-height: 3rem;">
                            <h5 class="card-title" style="color: #3242AA; font-weight: bold; margin: 0; font-size: 1.1rem; line-height: 1.2;">
                                ${data.title}
                            </h5>
                            <span class="badge bg-success" title = "Cерия одобрений" style="font-size: 0.8rem; white-space: nowrap; margin-left: 5px;">
                                ${maxSeries} из ${totalChecks}
                            </span>
                        </div>
                        
                        <p class="card-text text-muted mb-3" style="font-size: 0.9rem; min-height: 2rem; line-height: 1.4;">
                            ${data.text}
                        </p>
                        
                        <div class="mb-3">
                            <small class="text-primary fw-bold" style="font-size: 0.7rem; text-transform: uppercase;">Документы:</small><br>
                            <small class="text-muted" style="font-size: 0.85rem; line-height: 1.2; display: block; min-height: 2.2rem;">
                                ${docsString}
                            </small>
                        </div>

                        <!-- КНОПКИ: СТРОГО В ОДНУ СТРОКУ, ОДИНАКОВАЯ ВЫСОТА 32px -->
                        <div class="d-flex align-items-center mt-auto" style="gap: 4px; width: 100%;">
                            <button class="btn btn-primary btn-sm details-btn" 
                                    style="flex: 1; height: 32px; white-space: nowrap; font-size: 0.75rem; padding: 0; display: flex; align-items: center; justify-content: center;">
                                Подробнее
                            </button>
                            
                            <button class="btn btn-secondary btn-sm edit-btn" 
                                    id="edit-btn-${data.id}" 
                                    style="flex: 1; height: 32px; white-space: nowrap; font-size: 0.75rem; padding: 0; display: flex; align-items: center; justify-content: center;">
                                Изменить
                            </button>
                            
                            <div id="del-btn-container-${data.id}" style="flex: 1; height: 32px;">
                                <!-- Сюда рендерится ButtonDelete -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    render(data, onDetails, onDelete, onEdit) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));
        const cardElement = document.getElementById(`visa-card-${data.id}`);
        
        if (cardElement) {
            cardElement.querySelector('.details-btn').onclick = onDetails;
            
            const editBtn = cardElement.querySelector('.edit-btn');
            if (editBtn) {
                editBtn.onclick = (e) => {
                    e.stopPropagation();
                    onEdit(data.id);
                };
            }
        }
        
        const deleteContainer = document.getElementById(`del-btn-container-${data.id}`);
        if (deleteContainer) {
            const deleteBtn = new ButtonDelete(deleteContainer);
            deleteBtn.render(data.id, onDelete);
        }
    }
}