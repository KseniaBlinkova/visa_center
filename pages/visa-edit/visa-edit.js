import { MainPage } from "../main/main.js";
import { ajax } from "../../modules/ajax.js";
import { visaUrls } from "../../modules/visaUrls.js";

export class VisaEditPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    getHTML(data) {
        return `
            <div class="container mt-4">
                <div class="card shadow p-4">
                    <h2 class="mb-4" style="color: #3242AA;">Редактирование визы</h2>
                    
                    <!-- Контейнер для уведомлений об успехе или ошибке -->
                    <div id="message-container"></div>

                    <form id="edit-visa-form">
                        <div class="mb-3">
                            <label class="form-label fw-bold">Название визы</label>
                            <input type="text" class="form-control" id="title-input" value="${data.title || ''}">
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-bold">Краткое описание (карточка)</label>
                            <input type="text" class="form-control" id="text-input" value="${data.text || ''}">
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-bold">Полное описание (подробная страница)</label>
                            <textarea class="form-control" id="desc-input" rows="4">${data.fullDescription || ''}</textarea>
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-bold">Срок оформления</label>
                            <input type="text" class="form-control" id="term-input" value="${data.term || ''}">
                        </div>
                        
                        <div class="d-flex gap-3 mt-4">
                            <button type="button" id="save-btn" class="btn btn-success px-4 d-flex align-items-center gap-2">
                                <span id="save-btn-text">Сохранить изменения</span>
                                <span id="save-btn-spinner" class="spinner-border spinner-border-sm d-none" role="status"></span>
                            </button>
                            <button type="button" id="cancel-btn" class="btn btn-secondary">Отменить</button>
                        </div>
                    </form>
                </div>
            </div>`;
    }

    async render() {
        this.parent.innerHTML = `
            <div class="text-center mt-5">
                <div class="spinner-border text-primary" role="status"></div>
                <p class="mt-2">Загрузка данных формы...</p>
            </div>`;

        try {
            // Используем обновленный ajax.get без колбэков
            const data = await ajax.get(visaUrls.getVisaById(this.id));
            this.parent.innerHTML = this.getHTML(data);
            
            // Навешиваем обработчики
            document.getElementById('save-btn').onclick = () => this.saveData();
            document.getElementById('cancel-btn').onclick = () => window.renderPage(MainPage);
            
        } catch (error) {
            this.parent.innerHTML = `
                <div class="container mt-5">
                    <div class="alert alert-danger">Ошибка загрузки данных: ${error.message}</div>
                    <button class="btn btn-primary" onclick="window.renderPage(MainPage)">Вернуться на главную</button>
                </div>`;
        }
    }

    async saveData() {
        const saveBtn = document.getElementById('save-btn');
        const btnText = document.getElementById('save-btn-text');
        const spinner = document.getElementById('save-btn-spinner');
        const msgContainer = document.getElementById('message-container');

        // Собираем данные из полей ввода
        const updatedData = {
            title: document.getElementById('title-input').value,
            text: document.getElementById('text-input').value,
            fullDescription: document.getElementById('desc-input').value,
            term: document.getElementById('term-input').value
        };

        // Включаем индикацию загрузки
        saveBtn.disabled = true;
        btnText.textContent = "Сохранение...";
        spinner.classList.remove('d-none');
        msgContainer.innerHTML = ''; // Очищаем старые сообщения

        // try {
        //     // Отправляем PATCH запрос через fetch (ЛР №6)
        //     await ajax.patch(visaUrls.updateVisaById(this.id), updatedData);

        //     // Показываем красивое уведомление Bootstrap вместо alert
        //     msgContainer.innerHTML = `
        //         <div class="alert alert-success show" role="alert">
        //             ✨ Данные успешно обновлены! Возвращаемся на главную...
        //         </div>`;

        //     // Ждем 1.5 секунды, чтобы пользователь увидел успех, и уходим на главную
        //     setTimeout(() => {
        //         window.renderPage(MainPage);
        //     }, 1500);

        // } catch (error) {
        //     // Обработка ошибок
        //     msgContainer.innerHTML = `
        //         <div class="alert alert-danger" role="alert">
        //             ❌ Ошибка при сохранении: ${error.message}
        //         </div>`;
            
        //     // Возвращаем кнопку в рабочее состояние
        //     saveBtn.disabled = false;
        //     btnText.textContent = "Сохранить изменения";
        //     spinner.classList.add('d-none');
        // }

        try {
            await ajax.patch(visaUrls.updateVisaById(this.id), updatedData);

            // Теперь это просто "status-banner"
            msgContainer.innerHTML = `
                <div class="status-banner success shadow-sm">
                    <span class="icon">✓</span>
                    <span class="message">Изменения успешно сохранены!</span>
                </div>`;

            setTimeout(() => {
                window.renderPage(MainPage);
            }, 1500);

        } catch (error) {
            msgContainer.innerHTML = `
                <div class="status-banner error shadow-sm">
                    <span class="icon">✕</span>
                    <span class="message">Ошибка: ${error.message}</span>
                </div>`;
            
            saveBtn.disabled = false;
            btnText.textContent = "Сохранить изменения";
            spinner.classList.add('d-none');
        }
    }
}