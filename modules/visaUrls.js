class VisaUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3005'; // Адрес твоего сервера json-server
    }

    // Путь к списку всех виз
    getVisaList() {
        return `${this.baseUrl}/stocks`; 
    }

    // Путь к конкретной визе по ID
    getVisaById(id) {
        return `${this.baseUrl}/stocks/${id}`;
    }
}
export const visaUrls = new VisaUrls();