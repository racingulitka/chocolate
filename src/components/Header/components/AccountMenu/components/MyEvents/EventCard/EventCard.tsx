import React from 'react'
import styles from './EventCard.module.scss'
import { EventType, Event } from '../MyEvents.typings'
import editIcon from './assets/editIcon.svg'
import Image from 'next/image'
import arrow from './assets/arrow.svg'
import { ModalType } from '../AddEvent/AddEvent.typings'

export default function EventCard({
    info,
    setModalOpen,
    setSelectedEvent,
}: {
    info:Event,
    setModalOpen:React.Dispatch<React.SetStateAction<ModalType | null>>,
    setSelectedEvent:React.Dispatch<React.SetStateAction<Event | null>>,
}) {

    const months = [
        "января", "февраля", "марта", "апреля", "мая", "июня",
        "июля", "августа", "сентября", "октября", "ноября", "декабря"
    ]

    const onEdit = () => {
        setSelectedEvent(info)
        setModalOpen(ModalType.edit)
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.topBlock}>
                <div className={styles.eventType}>{info.type === EventType.birthday ? 'День рождения' : 'Праздник'}</div>
                <div className={styles.editIconContainer} onClick={() => onEdit()}>
                    <Image src={editIcon} alt='edit' fill />
                </div>
            </div>
            <div className={styles.middleBlock}>
                <div className={styles.middleBlockItem}><span>{info.date.getDate()} &nbsp;</span>{months[info.date.getMonth()]}</div>
                <div className={styles.circle}></div>
                <div className={styles.middleBlockItem}>{info.person}</div>
            </div>
            <div className={styles.bottomBlock}>
                Подобрать подарок
                <div className={styles.arrowContainer}>
                    <Image src={arrow} alt='arrow' fill />
                </div>
            </div>
        </div>
    )
}