export class ButtonDelete {
    constructor(parent) {
        this.parent = parent;
    }
    getHTML(id) {
        return `<button class="btn btn-outline-danger btn-sm" id="del-${id}">Удалить</button>`;
    }
    render(id, onDelete) {
        this.parent.innerHTML = this.getHTML(id);
        const btn = document.getElementById(`del-${id}`);
        if (btn) {
            btn.onclick = (e) => {
                e.stopPropagation(); // Чтобы не сработал переход на страницу визы
                onDelete(id); // Вызываем удаление
            };
        }
    }
}