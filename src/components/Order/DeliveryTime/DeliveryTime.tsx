import React, { useState, useEffect } from 'react'
import styles from './DeliveryTime.module.scss'
import { waysArr, monthArr, timeIntervals } from './DeliveryTime.config'
import Checkbox from '@/components/Checkbox/Checkbox'
import { getFormateDate } from '@/utils/getFormateDate'
import { getWeekday } from '@/utils/getWeekday'
import cn from 'classnames'
import TimeSelect from './TimeSelect/TimeSelect'
import { getNearestTimeInterval } from '@/utils/getNearestDelivery'

export default function DeliveryTime({
    forTime,
    setForTime,
}: {
    forTime: Date,
    setForTime: React.Dispatch<React.SetStateAction<Date>>,
}) {

    const [activeWay, setActiveWay] = useState<number>(3)

    const handleWaySelect = (id: number) => {
        setActiveWay(id)
    }

    const [selectedDay, setSelectedDay] = useState<number>(1)
    const [selectedTime, setSelectedTime] = useState<number>(1)
    const currentDate = new Date()
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())

    useEffect(() => {
        setSelectedDate(new Date(currentDate.setDate(currentDate.getDate() - 1 + selectedDay)))
    }, [selectedDay])

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>Время доставки</div>
            <div className={styles.timeZone}>Часовой пояс: Чебоксары</div>
            <div className={styles.checkboxes}>
                {
                    waysArr.map(item => {
                        const setChecked = () => {
                            handleWaySelect(item.id)
                        }
                        return (
                            <div className={styles.wayWrapper} key={item.id}>
                                <div className={styles.wayHeader}>
                                    <div className={styles.way} onClick={() => handleWaySelect(item.id)}>
                                        <Checkbox
                                            checked={item.id === activeWay}
                                            setChecked={setChecked}
                                        />
                                        <div className={styles.wayTitle}>
                                            {activeWay === 2 && item.id === 2 ? (
                                                <>
                                                    {getWeekday(selectedDate.getDay(), selectedDate)} {selectedDate.getDate()} {monthArr[selectedDate.getMonth()]} {timeIntervals[selectedTime].title}
                                                </>
                                            ) : (
                                                item.title
                                            )}
                                        </div>
                                    </div>
                                    <div className={styles.wayHeaderRight}>
                                        {
                                            item.id === 1 && activeWay === 1 &&
                                            <span>{getNearestTimeInterval()}</span>
                                        }
                                        {
                                            item.id === 3 && activeWay === 3 &&
                                            <span>{getWeekday(selectedDate.getDay(), selectedDate)} {selectedDate.getDate()} {monthArr[selectedDate.getMonth()]}</span>
                                        }
                                    </div>
                                </div>
                                {
                                    ((item.id === 2 && activeWay === 2) || (item.id === 3 && activeWay === 3)) &&
                                    <div className={styles.dateTimeSet}>
                                        <div className={styles.daySet}>
                                            {
                                                [1, 2, 3, 4, 5, 6, 7].map(day => {
                                                    const currentDate = new Date();
                                                    const selectedDate = new Date(currentDate);
                                                    selectedDate.setDate(currentDate.getDate() - 1 + day); // Корректируем дату

                                                    return (
                                                        <div
                                                            className={cn(
                                                                styles.dayContainer,
                                                                day === selectedDay && styles.dayContainerSelected
                                                            )}
                                                            key={day}
                                                            onClick={() => setSelectedDay(day)}
                                                        >
                                                            <div
                                                                className={cn(
                                                                    styles.weekday,
                                                                    day === selectedDay && styles.weekdaySelected
                                                                )}
                                                            >
                                                                {getWeekday(selectedDate.getDay(), selectedDate)}
                                                            </div>
                                                            <div
                                                                className={cn(
                                                                    styles.date,
                                                                    day === selectedDay && styles.dateSelected
                                                                )}
                                                            >
                                                                {selectedDate.getDate()}
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            }

                                        </div>
                                        {
                                            item.id === 2 && activeWay === 2 &&
                                            <TimeSelect
                                                selectedTime={selectedTime}
                                                setSelectedTime={setSelectedTime}
                                            />
                                        }
                                    </div>
                                }
                            </div>
                        )
                    })
                }
            </div>
            <div className={styles.save}>Сохранить</div>
        </div>
    )
}