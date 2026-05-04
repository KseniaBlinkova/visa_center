class VisaUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3005';
    }

    getVisas() {
        return `${this.baseUrl}/visas`;
    }

    getVisaById(id) {
        return `${this.baseUrl}/visas/${id}`;
    }

    removeVisaById(id) {
        return `${this.baseUrl}/visas/${id}`;
    }

    updateVisaById(id) {
        return `${this.baseUrl}/visas/${id}`;
    }
}

export const visaUrls = new VisaUrls();