export class SearchComponent {
    constructor(parent, onSearch) {
        this.parent = parent;
        this.onSearch = onSearch; // callback при вводе текста
    }

    getHTML() {
    return `
        <div class="w-100"> <div class="input-group">
                <span class="input-group-text bg-white border-end-0">🔍</span>
                <input type="text" id="search-input" class="form-control border-start-0 ps-0" placeholder="Поиск визы..." aria-label="Поиск">
                <button id="search-clear" class="btn btn-outline-secondary" type="button">✖️</button>
            </div>
        </div>
    `;
}

    // getHTML() {
    //     return `
    //         <div class="px-3 mb-3">
    //             <div class="input-group" style="max-width: 350px;">
    //                 <span class="input-group-text bg-primary text-white">🔍</span>
    //                 <input type="text" id="search-input" class="form-control" placeholder="Поиск по типу визы..." aria-label="Поиск">
    //                 <button id="search-clear" class="btn btn-outline-secondary" type="button">✖️</button>
    //             </div>
    //         </div>
    //     `;
    // }

    addListeners() {
        const searchInput = document.getElementById('search-input');
        const clearBtn = document.getElementById('search-clear');
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                if (this.onSearch) this.onSearch(e.target.value);
            });
        }
        
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                if (searchInput) {
                    searchInput.value = '';
                    if (this.onSearch) this.onSearch('');
                }
            });
        }
    }

    render() {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners();
    }
}