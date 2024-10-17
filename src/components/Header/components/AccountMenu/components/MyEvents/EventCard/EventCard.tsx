import React from 'react'
import styles from './EventCard.module.scss'
import { EventType } from '../MyEvents.typings'
import editIcon from './assets/editIcon.svg'
import Image from 'next/image'
import arrow from './assets/arrow.svg'

export default function EventCard({
    type,
    date,
    person
}: {
    type: EventType,
    date: Date,
    person: string,
}) {

    const months = [
        "января", "февраля", "марта", "апреля", "мая", "июня",
        "июля", "августа", "сентября", "октября", "ноября", "декабря"
    ]

    return (
        <div className={styles.wrapper}>
            <div className={styles.topBlock}>
                <div className={styles.eventType}>{type === EventType.birthday ? 'День рождения' : 'Праздник'}</div>
                <div className={styles.editIconContainer}>
                    <Image src={editIcon} alt='edit' fill />
                </div>
            </div>
            <div className={styles.middleBlock}>
                <div className={styles.middleBlockItem}><span>{date.getDate()} &nbsp;</span>{months[date.getMonth()]}</div>
                <div className={styles.circle}></div>
                <div className={styles.middleBlockItem}>{person}</div>
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