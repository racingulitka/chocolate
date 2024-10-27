export const getWeekday = (dateDay: number, date: Date) => {
    const currentDate = new Date(); // Исправляем создание текущей даты
    const weekdaysArr = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

    // Проверяем, если переданная дата — сегодня
    if (currentDate.toDateString() === date.toDateString()) {
        return 'Сегодня';
    }
    // Проверяем, если переданная дата — завтра
    const tomorrow = new Date();
    tomorrow.setDate(currentDate.getDate() + 1);
    if (tomorrow.toDateString() === date.toDateString()) {
        return 'Завтра';
    }

    // Если не совпадает с сегодня или завтра, возвращаем день недели
    return weekdaysArr[date.getDay()];
};
