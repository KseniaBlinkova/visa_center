export class ButtonBack {
    constructor(parent) {
        this.parent = parent;
    }
    getHTML() {
        return `<button id="back-button" class="btn-back">Назад</button>`;
    }
    render(onClick) {
        this.parent.innerHTML = this.getHTML();
        document.getElementById('back-button').addEventListener('click', onClick);
    }
}