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
                    <form id="edit-visa-form">
                        <div class="mb-3">
                            <label class="form-label fw-bold">Название визы</label>
                            <input type="text" class="form-control" id="title-input" value="${data.title}">
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-bold">Краткое описание</label>
                            <input type="text" class="form-control" id="text-input" value="${data.text}">
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-bold">Полное описание (из БД)</label>
                            <textarea class="form-control" id="desc-input" rows="3">${data.fullDescription || ''}</textarea>
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-bold">Срок оформления</label>
                            <input type="text" class="form-control" id="term-input" value="${data.term || ''}">
                        </div>
                        <div class="d-flex gap-3 mt-4">
                            <button type="button" id="cancel-btn" class="btn btn-secondary">Отменить</button>
                            <p class="text-muted m-0 align-self-center"><i>Сохранение будет в ЛР №6</i></p>
                        </div>
                    </form>
                </div>
            </div>`;
    }

    render() {
        this.parent.innerHTML = '<div class="text-center mt-5">Загрузка формы...</div>';

        ajax.get(visaUrls.getVisaById(this.id), (data, status) => {
            if (status === 200) {
                this.parent.innerHTML = this.getHTML(data);
                
                // КНОПКА ОТМЕНЫ
                document.getElementById('cancel-btn').onclick = () => {
                    window.renderPage(MainPage);
                };
            } else {
                this.parent.innerHTML = '<div class="alert alert-danger">Ошибка загрузки данных</div>';
            }
        });
    }
}