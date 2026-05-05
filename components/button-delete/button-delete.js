export class ButtonDelete {
    constructor(parent) {
        this.parent = parent;
    }
    getHTML(id) {
        return `
            <button class="btn btn-outline-danger btn-sm" id="del-${id}" 
                style="width: 100%; height: 32px; font-size: 0.75rem; padding: 0; display: flex; align-items: center; justify-content: center; white-space: nowrap;">
                Удалить
            </button>`;
    }
    render(id, onDelete) {
        this.parent.innerHTML = this.getHTML(id);
        const btn = document.getElementById(`del-${id}`);
        if (btn) {
            btn.onclick = (e) => {
                e.stopPropagation(); 
                onDelete(id); 
            };
        }
    }
}