export class SearchBar {
    constructor(parent, onSearch) {
        this.parent = parent;
        this.onSearch = onSearch;
    }

    getHTML() {
        return `
            <div class="d-flex align-items-center gap-2">
                <!-- Обертка для ввода и лупы с общим ID для стилизации -->
                <div id="search-group" class="input-group" 
                    style="max-width: 400px; border: 1px solid #dee2e6; border-radius: 8px; overflow: hidden; transition: border-color 0.2s, box-shadow 0.2s;">
                    
                    <span class="input-group-text bg-white border-0">🔍</span>
                    
                    <input type="text" id="search-input" class="form-control border-0" 
                        placeholder="Поиск визы..." style="box-shadow: none;">
                </div>

                <button class="btn text-white px-4" type="button" id="search-btn" 
                    style="background-color: #3242AA; border-radius: 8px; border: none;">
                    Найти
                </button>

                <button class="btn btn-outline-secondary" type="button" id="clear-btn" 
                    style="border-radius: 8px;">
                    Сбросить
                </button>
            </div>
        `;
    }

    render() {
        this.parent.innerHTML = this.getHTML();

        const input = document.getElementById('search-input');
        const group = document.getElementById('search-group');
        const searchBtn = document.getElementById('search-btn');
        const clearBtn = document.getElementById('clear-btn');

        // ЭФФЕКТ ПОДСВЕТКИ: когда инпут в фокусе, подсвечиваем всю группу
        input.onfocus = () => {
            group.style.borderColor = "#86b7fe"; // Цвет как у Bootstrap
            group.style.boxShadow = "0 0 0 0.25rem rgba(13, 110, 253, 0.25)";
        };

        // Когда фокус уходит — возвращаем как было
        input.onblur = () => {
            group.style.borderColor = "#dee2e6";
            group.style.boxShadow = "none";
        };

        searchBtn.onclick = () => this.onSearch(input.value);

        clearBtn.onclick = () => {
            input.value = '';
            this.onSearch('');
        };

        input.onkeypress = (e) => {
            if (e.key === 'Enter') this.onSearch(input.value);
        };
    }
}