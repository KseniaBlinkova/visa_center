
import { getMaxOnesSequence, mergeObjects } from "../../src/utils/homework.js";

export class VisaCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
    return `
        <div class="col d-flex"> <div class="card shadow-sm h-100 w-100">
                <img src="${data.src}" class="card-img-top" alt="${data.title}" style="height: 140px; object-fit: cover;">
                
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title text-truncate" title="${data.title}">${data.title}</h5>
                    <p class="card-text flex-grow-1 text-muted small">${data.text}</p>
                    
                    <div id="complexity-info-${data.id}" class="text-danger fw-bold small mb-1" style="min-height: 20px;"></div>
                    <div id="price-info-${data.id}" class="mb-2" style="min-height: 20px;"></div>

                    <div class="d-flex flex-column gap-2 mt-auto">
                        <button class="btn btn-outline-info btn-sm" id="calc-btn-${data.id}">
                            📊 Сложность
                        </button>
                        
                        <button class="btn btn-outline-success btn-sm" id="merge-btn-${data.id}">
                            📋 Условия
                        </button>
                        
                        <div class="d-flex gap-2">
                            <button class="btn btn-primary flex-grow-1 btn-sm" id="click-card-${data.id}" data-id="${data.id}">Подробнее</button>
                            <button class="btn btn-outline-danger btn-sm delete-card" data-id="${data.id}">🗑️</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

    addListeners(data, clickListener, deleteListener) {
        // 1. Кнопка "Подробнее"
        const detailsBtn = document.getElementById(`click-card-${data.id}`);
        if (detailsBtn) detailsBtn.addEventListener("click", clickListener);
        
        // 2. Логика ДЗ 2.3 (Сложность)
// 2. Логика ДЗ 2.3 (Сложность)
        const calcBtn = document.getElementById(`calc-btn-${data.id}`);
        if (calcBtn) {
            calcBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                
                // Используем твою функцию
                const result = getMaxOnesSequence(data.reqCode);
                const display = document.getElementById(`complexity-info-${data.id}`);
                
                // ВАЖНО: берем реальную длину data.reqCode.length, а не 10!
                display.innerText = `Сложность: ${result}/${data.reqCode.length}`;
                
                console.log(`Расчет для ${data.title}: ${result} из ${data.reqCode.length}`);
            });
        }
        // const calcBtn = document.getElementById(`calc-btn-${data.id}`);
        // if (calcBtn) {
        //     calcBtn.addEventListener("click", (e) => {
        //         e.stopPropagation();
        //         const result = getMaxOnesSequence(data.reqCode);
        //         const display = document.getElementById(`complexity-info-${data.id}`);
        //         display.innerText = `Сложность: ${result}/${data.reqCode.length}`;
        //     });
        // }

        // 3. Логика ДЗ 3.1 (Merge объектов)
        const mergeBtn = document.getElementById(`merge-btn-${data.id}`);
        if (mergeBtn) {
            mergeBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                
                // Данные для слияния (имитация ответа другого отдела)
                const extraInfo = { 
                    term: "5-10 дней", 
                    entry: "Многократный",
                    price: 5500,
                    currency: "₽"
                };

                // Выполняем MERGE
                const fullData = mergeObjects(data, extraInfo);
                
                // Вывод в консоль для препода
                console.log(`Объект после Merge для "${data.title}":`, fullData);

                // Отрисовка результата на карточке
                const display = document.getElementById(`price-info-${data.id}`);
                display.innerHTML = `
                    <div class="p-2 rounded border" style="background-color: #f8f9fa; font-size: 0.8rem;">
                        <div>⏳ Срок: <b>${fullData.term}</b></div>
                        <div>🔄 Вход: <b>${fullData.entry}</b></div>
                        <div class="text-success">💰 Цена: <b>${fullData.price} ${fullData.currency}</b></div>
                    </div>
                `;
                
                // Скрываем кнопку после нажатия
                mergeBtn.style.display = "none";
            });
        }

        // 4. Кнопка удаления
        const deleteBtn = document.querySelector(`.delete-card[data-id="${data.id}"]`);
        if (deleteBtn) {
            deleteBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                deleteListener(data.id);
            });
        }
    }

    render(data, clickListener, deleteListener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, clickListener, deleteListener);
    }
}