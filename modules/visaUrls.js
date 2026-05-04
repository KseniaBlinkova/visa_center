class VisaUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3005'; // Адрес твоего сервера json-server
    }

    // Путь к списку всех виз
    getVisaList() {
        return `${this.baseUrl}/visas`; 
    }

    // Путь к конкретной визе по ID
    getVisaById(id) {
        return `${this.baseUrl}/visas/${id}`;
    }
}
export const visaUrls = new VisaUrls();