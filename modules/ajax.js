class Ajax {
    // GET запрос
    async get(url) {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Ошибка GET: ${response.status}`);
        return await response.json();
    }

    // POST запрос (создание)
    async post(url, data) {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return await response.json();
    }

    // PATCH запрос (обновление) - КРИТИЧНО ДЛЯ ЛР6
    async patch(url, data) {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error(`Ошибка PATCH: ${response.status}`);
        return await response.json();
    }

    // DELETE запрос
    async delete(url) {
        const response = await fetch(url, { method: 'DELETE' });
        if (!response.ok) throw new Error(`Ошибка DELETE: ${response.status}`);
        return response.status === 204 ? null : await response.json();
    }
}

export const ajax = new Ajax();