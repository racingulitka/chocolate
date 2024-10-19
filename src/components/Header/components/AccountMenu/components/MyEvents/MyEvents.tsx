import React, { useState, useEffect } from 'react';
import styles from './MyEvents.module.scss';
import cn from 'classnames';
import { Event, EventType } from './MyEvents.typings';
import EventCard from './EventCard/EventCard';
import Calendar from './Calendar/Calendar';
import NewEventScreen from './NewEventScreen/NewEventScreen';
import Modal from 'react-modal';
import AddEvent from './AddEvent/AddEvent';
import { ModalType } from './AddEvent/AddEvent.typings';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: 'none',
        padding: 0,
        background: 'transparent',
    },
    overlay: {
        background: 'rgba(0, 0, 0, 0.61)',
        zIndex: 100,
    }
};

export default function MyEvents() {

    const [activeScreen, setActiveScreen] = useState<number>(1); // Изначально календарь
    const [isLoading, setIsLoading] = useState<boolean>(true); // Загрузка данных
    const [isModalOpen, setModalOpen] = useState<ModalType | null>(null); // Состояние модального окна
    //const [eventsArr] = useState<Event[] | null>(null)
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

    const [eventsArr] = useState<Event[] | null>([
        {
            id: 1,
            type: EventType.birthday,
            date: new Date('2024-12-20'),
            person: 'Tldsfjs чтобы не злился',
            phone: '',
            city: 'Таганрог',
            address: 'ул. Сенная д.4'
        }
    ]);

    useEffect(() => {
        if (!eventsArr) {
            setActiveScreen(3); // Если событий нет, сразу переключаем на экран добавления
        }
        setIsLoading(false); // Завершаем загрузку
    }, [eventsArr]);

    const thisYearEvents = eventsArr && eventsArr.filter(item => item.date.getFullYear() === new Date().getFullYear());
    const futureEvents = thisYearEvents && thisYearEvents.filter(item => item.date > new Date());

    const groupEventsByMonth = (events: Event[]) => {
        const grouped = events.reduce((acc, event) => {
            const month = event.date.getMonth();
            if (!acc[month]) {
                acc[month] = [];
            }
            acc[month].push(event);
            return acc;
        }, {} as { [key: number]: Event[] });

        return Object.entries(grouped).map(([month, events]) => ({
            month: parseInt(month),
            events
        }));
    };

    const months = [
        "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
        "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ];

    // Логика для закрытия модального окна
    const closeModal = () => {
        setModalOpen(null);
        document.body.style.overflow = 'unset';
        setSelectedEvent(null)
    };

    const afterModalOpen = () => {
        console.log('modal open');
    };

    // Пока isLoading true, показываем индикатор загрузки или null
    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className={styles.wrapper}>
            <Modal
                isOpen={!!isModalOpen}
                onAfterOpen={afterModalOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Добавить событие"
            >
                <AddEvent
                    onClose={closeModal}
                    selectedDate={selectedDate}
                    modalType={isModalOpen}
                    selectedEvent={selectedEvent}
                />
            </Modal>

            {
                activeScreen !== 3 ? (
                    <div className={styles.main}>
                        <div className={styles.header}>
                            <div className={styles.selector}>
                                {[
                                    { id: 1, title: 'Календарь' },
                                    { id: 2, title: 'Список' }
                                ].map(item => (
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
                                ))}
                            </div>
                            <button
                                className={styles.button}
                                onClick={() => setModalOpen(ModalType.add)} // Открываем модальное окно для добавления события
                            >
                                Добавить событие
                            </button>
                        </div>

                        <div className={styles.screen}>
                            {activeScreen === 1 && <div className={styles.calendarContainer}>
                                <Calendar
                                    selectedDate={selectedDate}
                                    setSelectedDate={setSelectedDate}
                                />
                            </div>}

                            <div className={styles.eventsContainer}>
                                {activeScreen === 1 && eventsArr && (
                                    <>
                                        <div className={styles.eventsTitle}>Ближайшие события</div>
                                        {eventsArr.map(item => (
                                            <EventCard
                                                key={item.id}
                                                info={item}
                                                setModalOpen={setModalOpen}
                                                setSelectedEvent={setSelectedEvent}
                                            />
                                        ))}
                                    </>
                                )}

                                {activeScreen === 2 && futureEvents && (
                                    groupEventsByMonth(futureEvents).map(item => (
                                        <div className={styles.eventCardsBlock} key={item.month}>
                                            <div className={styles.eventsTitle}>{months[item.month]}</div>
                                            {item.events.map(event => (
                                                <EventCard
                                                    key={event.id}
                                                    info={event}
                                                    setModalOpen={setModalOpen}
                                                    setSelectedEvent={setSelectedEvent}
                                                />
                                            ))}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <NewEventScreen
                        setActiveScreen={setActiveScreen}
                    />
                )
            }
        </div>
    );
}
