export class ButtonAdd {
    constructor(parent) {
        this.parent = parent;
    }
    getHTML() {
        return `<button id="add-visa-btn" class="btn btn-success" style="white-space: nowrap; background-color: #3242AA; border: none; ">+ Добавить визу</button>`;
    }
    render(onClick) {
        this.parent.innerHTML = this.getHTML();
        document.getElementById('add-visa-btn').addEventListener('click', onClick);
    }
}