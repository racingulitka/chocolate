import React, { useState, useRef, useEffect } from 'react';
import styles from './Calendar.module.scss';
import cn from 'classnames';

export default function Calendar({
    selectedDate,
    setSelectedDate,
}:{
    selectedDate:Date | null,
    setSelectedDate:React.Dispatch<React.SetStateAction<Date | null>>
}) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();

    const years = [currentYear, currentYear + 1];
    const daysOfWeek = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
    const months = [
        "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
        "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ];

    const currentMonthRef = useRef<HTMLDivElement | null>(null);

    const handleSelectDate = (year: number, month: number, day: number) => {
        const date = new Date(year, month, day);
        setSelectedDate(date);
    };

    const isSelected = (year: number, month: number, day: number) => {
        return (
            selectedDate &&
            selectedDate.getFullYear() === year &&
            selectedDate.getMonth() === month &&
            selectedDate.getDate() === day
        );
    };

    const isToday = (year: number, month: number, day: number) => {
        return year === currentYear && month === currentMonth && day === currentDay;
    };

    // Прокрутка к текущему месяцу при монтировании компонента
    useEffect(() => {
        if (currentMonthRef.current) {
            currentMonthRef.current.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
    }, []);

    return (
        <div className={styles.wrapper}>
            {years.map(year => (
                <div key={year} className={styles.year}>
                    <h2>{year}</h2>
                    {months.map((month, monthIndex) => {
                        const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
                        const firstDayOfMonth = new Date(year, monthIndex, 1).getDay();
                        const startDayIndex = (firstDayOfMonth + 6) % 7;

                        return (
                            <div 
                                key={month} 
                                className={styles.month}
                                ref={year === currentYear && monthIndex === currentMonth ? currentMonthRef : null}
                            >
                                <h3>{month}</h3>
                                <div className={styles.grid}>
                                    {daysOfWeek.map(day => (
                                        <div key={day} className={styles.day}>
                                            {day}
                                        </div>
                                    ))}
                                    {Array.from({ length: startDayIndex }, (_, i) => (
                                        <div key={`empty-${i}`}></div>
                                    ))}
                                    {Array.from({ length: daysInMonth }, (_, dayIndex) => {
                                        const day = dayIndex + 1;
                                        return (
                                            <div
                                                key={dayIndex}
                                                className={cn(styles.date, {
                                                    [styles.dateSelected]: isSelected(year, monthIndex, day),
                                                    [styles.dateToday]: isToday(year, monthIndex, day)
                                                })}
                                                onClick={() => handleSelectDate(year, monthIndex, day)}
                                            >
                                                {day}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}
