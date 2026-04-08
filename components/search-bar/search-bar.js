export class SearchBar {
    constructor(parent, onSearch) {
        this.parent = parent;
        this.onSearch = onSearch;
    }
    getHTML() {
        return `
            <div class="input-group">
                <span class="input-group-text bg-white border-end-0">🔍</span>
                <input type="text" id="search-input" class="form-control border-start-0" placeholder="Поиск визы...">
            </div>
        `;
    }
    render() {
        this.parent.innerHTML = this.getHTML();
        document.getElementById('search-input').addEventListener('input', (e) => this.onSearch(e.target.value));
    }
}