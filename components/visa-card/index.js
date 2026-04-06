export class VisaCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="card h-100 visa-card">
                <img src="${data.src}" class="card-img-top visa-card-img" alt="${data.title}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${data.title}</h5>
                    <p class="card-text flex-grow-1">${data.text}</p>
                    <button class="btn btn-custom mt-auto" id="click-card-${data.id}" data-id="${data.id}">Подробнее</button>
                </div>
            </div>
        `;
    }

    addListeners(data, listener) {
        const button = document.getElementById(`click-card-${data.id}`);
        if (button) {
            button.addEventListener("click", listener);
        }
    }

    render(data, listener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        if (listener) {
            this.addListeners(data, listener);
        }
    }
}