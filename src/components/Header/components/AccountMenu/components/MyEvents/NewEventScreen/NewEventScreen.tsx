import React from 'react'
import styles from './NewEventScreen.module.scss'
import { cardsArr } from './NewEventScreen.config'

export default function NewEventScreen(){
    return(
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div className={styles.leftSide}>
                    <div className={styles.title}>Создать событие на “В шоколаде”</div>
                    <div className={styles.description}>Чтобы мы напомнили о нем и вы не забыли поздравить близкого человека</div>
                </div>
                <button className={styles.button}>Создать подборку</button>
            </div>
            <div className={styles.cardsBlock}>
                {
                    cardsArr.map(item => {
                        return(
                            <div className={styles.card} key={item.id}>
                                <div className={styles.topBlock}>
                                    
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}