import React, { useState } from 'react'
import styles from './MyEvents.module.scss'
import cn from 'classnames'
import { Event, EventType } from './MyEvents.typings'
import EventCard from './EventCard/EventCard'
import Calendar from './Calendar/Calendar'
import NewEventScreen from './NewEventScreen/NewEventScreen'

export default function MyEvents() {

    const [activeScreen, setActiveScreen] = useState<number>(1)

    //const [eventsArr] = useState<Event[] | null>(null)

    const [eventsArr] = useState<Event[] | null>([
        {
            id: 1,
            type: EventType.birthday,
            date: new Date('2024-12-20'),
            person: 'Tldsfjs чтобы не злился',
            phone: '',
            city: '',
            address: ''
        },
        {
            id: 2,
            type: EventType.birthday,
            date: new Date('2024-11-20'),
            person: 'Александра чтобы не злился',
            phone: '',
            city: '',
            address: ''
        },
        {
            id: 3,
            type: EventType.birthday,
            date: new Date('2024-11-11'),
            person: 'lsjgjндра чтобы не злился',
            phone: '',
            city: '',
            address: ''
        },
    ])

    const thisYearEvents = eventsArr && eventsArr.filter(item => item.date.getFullYear() === new Date().getFullYear())
    const futureEvents = thisYearEvents && thisYearEvents.filter(item => item.date > new Date())

    // Функция для группировки событий по месяцам
    const groupEventsByMonth = (events: Event[]) => {
        const grouped = events.reduce((acc, event) => {
            const month = event.date.getMonth();
            if (!acc[month]) {
                acc[month] = [];
            }
            acc[month].push(event);
            return acc;
        }, {} as { [key: number]: Event[] });

        // Преобразуем объект в массив массивов
        return Object.entries(grouped).map(([month, events]) => ({
            month: parseInt(month),
            events
        }));
    };

    const months = [
        "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
        "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ];

    return (
        <div className={styles.wrapper}>
            {
                eventsArr ?
            <div className={styles.main}>
                <div className={styles.header}>
                    <div className={styles.selector}>
                        {
                            [{ id: 1, title: 'Календарь' }, { id: 2, title: 'Список' }].map(item => {
                                return (
                                    <div
                                        className={cn(
                                            styles.selectorItem,
                                            item.id === activeScreen && styles.selectorItemActive
                                        )}
                                        key={item.id}
                                        onClick={() => setActiveScreen(item.id)}
                                    >
                                        {item.title}
                                    </div>
                                )
                            })
                        }
                    </div>
                    <button className={styles.button}>
                        Добавить событие
                    </button>
                </div>
                <div className={styles.screen}>
                    {
                        activeScreen === 1 &&
                        <div className={styles.calendarContainer}>
                            <Calendar />
                        </div>
                    }
                    <div className={styles.eventsContainer}>
                        {
                            activeScreen === 1 &&
                            <div className={styles.eventsTitle}>Ближайшие события</div>
                        }
                        {
                            activeScreen === 1 &&
                            eventsArr.map(item => {
                                return (
                                    <EventCard
                                        key={item.id}
                                        type={item.type}
                                        date={item.date}
                                        person={item.person}
                                    />
                                )
                            })
                        }
                        {
                            activeScreen === 2 && futureEvents &&
                            groupEventsByMonth(futureEvents).map(item => {
                                return (
                                    <div className={styles.eventCardsBlock} key={item.month}>
                                        <div className={styles.eventsTitle}>{months[item.month]}</div>
                                        {
                                            item.events.map(event => {
                                                return(
                                                    <EventCard
                                                        key={event.id}
                                                        type={event.type}
                                                        date={event.date}
                                                        person={event.person}
                                                    />
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            :
            <NewEventScreen />
            }
        </div>
    )
}