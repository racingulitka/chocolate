export const formatCreditCardExpDate = (value:string) => {
    const numbersOnly = value.replace(/\D/g, '');

    // Форматируем как ДД / ММ
    if (numbersOnly.length <= 2) {
        return numbersOnly;
    } else {
        return `${numbersOnly.slice(0, 2)} / ${numbersOnly.slice(2)}`;
    }
}