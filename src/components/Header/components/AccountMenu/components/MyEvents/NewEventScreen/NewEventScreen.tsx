import React from 'react'
import styles from './NewEventScreen.module.scss'
import { cardsArr } from './NewEventScreen.config'
import Image from 'next/image'

export default function NewEventScreen({
    setActiveScreen,
}:{
    setActiveScreen:React.Dispatch<React.SetStateAction<number>>,
}){
    return(
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div className={styles.leftSide}>
                    <div className={styles.title}>Создать событие на “В шоколаде”</div>
                    <div className={styles.description}>Чтобы мы напомнили о нем и вы не забыли поздравить близкого человека</div>
                </div>
                <button className={styles.button} onClick={() => setActiveScreen(1)}>Создать подборку</button>
            </div>
            <div className={styles.cardsBlock}>
                {
                    cardsArr.map(item => {
                        return(
                            <div className={styles.card} key={item.id}>
                                <div className={styles.topBlock}>
                                    <div className={styles.number}>
                                        {item.id}
                                    </div>
                                    <div className={styles.imageContainer}>
                                        <Image src={item.icon} alt='icon' fill />
                                    </div>
                                </div>
                                <div className={styles.title}>{item.title}</div>
                                <div className={styles.text}>{item.text}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}