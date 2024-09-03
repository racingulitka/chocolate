import React from 'react'
import styles from './MapModal.module.scss'

export default function MapModal(){
    return(
        <div className={styles.wrapper}>
            <div className={styles.titleBlock}>
                <h2 className={styles.title}>Укажите адрес доставки на карте</h2>
                <p className={styles.subtitle}>Покажем вам магазины, чтобы заказать доставку</p>
            </div>
            <div className={styles.inputBlock}>

            </div>
        </div>
    )
}