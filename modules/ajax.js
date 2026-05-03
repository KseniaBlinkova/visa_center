class Ajax {
    // Метод для GET-запросов (получение данных)
    get(url, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    callback(data);
                } else {
                    console.error("Ошибка сервера: ", xhr.status);
                }
            }
        };
    }
}
export const ajax = new Ajax();