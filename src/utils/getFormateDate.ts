export const getFormateDate = (dateInput: Date) => {
  const date = new Date(dateInput);
  const now = new Date();

  const dayInMs = 86400000; // 24 * 60 * 60 * 1000
  const daysDiff = Math.floor((now.getTime() - date.getTime()) / dayInMs);

  const daysOfWeek = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];
  const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  // 1. Проверка на "Сегодня"
  if (daysDiff === 0) {
    const hoursDiff = Math.floor((now.getHours() - date.getHours()) / 3600000); // 1 hour = 3600000 ms
    const minutesDiff = Math.floor(
      (now.getMinutes() - date.getMinutes()) / 60000
    ); // 1 minute = 60000 ms

    if (hoursDiff === 0) {
      return `${minutesDiff} минут(ы) назад`;
    } else {
      return `${hoursDiff} час(а/ов) назад`;
    }
  }

  // 2. Проверка на "Вчера"
  if (daysDiff === 1) {
    return "Вчера";
  }

  // 3. Проверка на "На этой неделе"
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay()); // Начало недели (воскресенье)

  if (date >= startOfWeek) {
    return daysOfWeek[date.getDay()]; // Возвращаем название дня недели
  }

  // 4. Формат "Число месяц прописью и год"
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};
