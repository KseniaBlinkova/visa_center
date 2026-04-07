// src/utils/homework.js

/**
 * Задание 2.3: Найти максимальную последовательность 1 и вывести ее длину.
 * Принимает строку (напр. '110111'), возвращает число (3).
 */
export const getMaxOnesSequence = (reqCode) => {
    if (!reqCode || typeof reqCode !== 'string') return 0;

    let maxOnes = 0;
    let currentOnes = 0;
    let i = 0;

    // ЦИКЛ С УСЛОВИЕМ (пока не дойдем до конца строки)
    // Это не цикл по счетчику "от 0 до 10", а цикл "пока есть символы"
    while (i < reqCode.length) {
        if (reqCode[i] === '1') {
            currentOnes++;
            if (currentOnes > maxOnes) maxOnes = currentOnes;
        } else {
            currentOnes = 0;
        }
        i++; // Переходим к следующему символу
    }

    return maxOnes;
};

export const mergeObjects = (...objects) => {
    const result = {};
    objects.forEach(obj => {
        for (let key in obj) {
            if (!(key in result)) {
                result[key] = obj[key];
            }
        }
    });
    return result;
};