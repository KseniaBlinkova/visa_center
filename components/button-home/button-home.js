export class ButtonHome {
    constructor(parent) {
        this.parent = parent;
    }
    getHTML() {
        return `<button id="home-button" class="btn btn-light" style="border-radius: 8px; width: 150px; height: 40px; font-weight: normal; color: black; margin-right: 65px;"> Домой</button>`;
    }
    render(onClick) {
        this.parent.innerHTML = this.getHTML();
        document.getElementById('home-button').addEventListener('click', onClick);
    }
}