export class VisaDetailComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
    return `
        <div class="card mb-3 visa-detail-card">
            <div class="row g-0">
                <div class="col-md-5">
                    <img src="${data.src}" class="img-fluid rounded-start visa-detail-img" alt="${data.title}">
                </div>
                <div class="col-md-7">
                    <div class="card-body">
                        <h5 class="card-title">${data.title}</h5>
                        <p class="card-text">${data.fullText}</p>
                        <p class="card-text"><small class="text-muted">Для получения дополнительной информации обратитесь в консульство.</small></p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}