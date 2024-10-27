export const formatCreditCardNumber = (input:string) => {
    // Удаляем все нецифровые символы
    const digitsOnly = input.replace(/\D/g, "");

    // Разбиваем на группы по 4 цифры и соединяем пробелами
    return digitsOnly.match(/.{1,4}/g)?.join(" ") || digitsOnly;
};