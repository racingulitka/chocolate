import React, {useState} from 'react'
import styles from './MyEvents.module.scss'
import cn from 'classnames'
import { Event, EventType } from './MyEvents.typings'
import EventCard from './EventCard/EventCard'

export default function MyEvents() {

    const [activeScreen, setActiveScreen] = useState<number>(1)

    const [eventsArr] = useState<Event[]>([
        {
            id:1,
            type:EventType.birthday,
            date: new Date('2024-12-20'),
            person:'Tldsfjs чтобы не злился',
            phone:'',
            city:'',
            address:''
        },
        {
            id:2,
            type:EventType.birthday,
            date: new Date('2024-11-20'),
            person:'Александра чтобы не злился',
            phone:'',
            city:'',
            address:''
        },
        {
            id:3,
            type:EventType.birthday,
            date: new Date('2024-11-11'),
            person:'lsjgjндра чтобы не злился',
            phone:'',
            city:'',
            address:''
        },
    ])

    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <div className={styles.header}>
                    <div className={styles.selector}>
                        {
                            [{id:1, title:'Календарь'}, {id:2, title:'Список'}].map(item => {
                                return(
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

                        </div>
                    }
                    <div className={styles.eventsContainer}>
                        <div className={styles.eventsTitle}>Ближайшие события</div>
                        {
                            eventsArr.map(item => {
                                return(
                                    <EventCard />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}