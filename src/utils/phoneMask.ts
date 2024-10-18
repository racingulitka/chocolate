export const phoneMask = (inputValue: string) => {
    // Удаляем все символы, кроме цифр
    const sanitizedValue = inputValue.replace(/\D/g, '');

    let maskedValue = '+';

    if (sanitizedValue.length > 0) {
        maskedValue += sanitizedValue.slice(0, 1); // Код страны
    }

    if (sanitizedValue.length > 1) {
        maskedValue += `(${sanitizedValue.slice(1, 4)}`; // Код города
    }

    if (sanitizedValue.length > 4) {
        maskedValue += `) ${sanitizedValue.slice(4, 7)}`; // Первые три цифры номера
    }

    if (sanitizedValue.length > 7) {
        maskedValue += `-${sanitizedValue.slice(7, 9)}`; // Следующие две цифры
    }

    if (sanitizedValue.length > 9) {
        maskedValue += `-${sanitizedValue.slice(9, 11)}`; // Последние две цифры
    }

    return maskedValue;
};