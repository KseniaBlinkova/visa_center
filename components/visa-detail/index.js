export class VisaDetailComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="card mb-3 visa-detail-card shadow-sm border-0" style="max-width: 1000px; margin: 0 auto;">
                <div class="row g-0">
                    <div class="col-md-6 bg-light d-flex align-items-center justify-content-center">
                        <div id="container-3d" style="width: 100%; height: 400px; min-width: 300px;"></div>
                    </div>
                    <div class="col-md-6">
                        <div class="card-body p-4">
                            <h2 class="card-title fw-bold" style="color: #3242AA;">${data.title}</h2>
                            <p class="card-text text-secondary" style="font-size: 1.1rem;">${data.fullText}</p>
                            <hr>
                            <p class="card-text">
                                <small class="text-muted">Для получения дополнительной информации обратитесь в консульство.</small>
                            </p>
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




// export class VisaDetailComponent {
//     constructor(parent) {
//         this.parent = parent;
//     }

//     getHTML(data) {
//     return `
//         <div class="card mb-3 visa-detail-card">
//             <div class="row g-0">
//                 <div class="col-md-5">
//                     <img src="${data.src}" class="img-fluid rounded-start visa-detail-img" alt="${data.title}">
//                 </div>
//                 <div class="col-md-7">
//                     <div class="card-body">
//                         <h5 class="card-title">${data.title}</h5>
//                         <p class="card-text">${data.fullText}</p>
//                         <p class="card-text"><small class="text-muted">Для получения дополнительной информации обратитесь в консульство.</small></p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     `;
// }

//     render(data) {
//         const html = this.getHTML(data);
//         this.parent.insertAdjacentHTML('beforeend', html);
//     }
// }