import { timeIntervals } from "@/components/Order/DeliveryTime/DeliveryTime.config";

export const getNearestTimeInterval = () => {
    const currentTime = new Date();
    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();

    // Преобразуем текущие часы и минуты в общее количество минут с начала дня
    const currentTotalMinutes = currentHours * 60 + currentMinutes;

    for (let i = 0; i < timeIntervals.length; i++) {
        // Удаляем слова "дня", "утра", "вечера", "ночи" из title
        const [startTime, endTime] = timeIntervals[i].title
            .replace(/ (дня|утра|вечера|ночи)$/, '')
            .split(' - ');
        
        const [startHour, startMinutes] = startTime.split(':').map(Number);
        const intervalStartTotalMinutes = startHour * 60 + startMinutes;

        // Если интервал начинается позже текущего времени
        if (intervalStartTotalMinutes > currentTotalMinutes) {
            const isToday = intervalStartTotalMinutes < 24 * 60; // до полуночи
            return `${isToday ? 'Сегодня' : 'Завтра'} ${startTime} - ${endTime}`;
        }
    }

    // Если текущий день закончился, ближайший интервал на следующий день
    const [nextDayStartTime, nextDayEndTime] = timeIntervals[0].title
        .replace(/ (дня|утра|вечера|ночи)$/, '')
        .split(' - ');
        
    return `Завтра ${nextDayStartTime} - ${nextDayEndTime}`;
};
