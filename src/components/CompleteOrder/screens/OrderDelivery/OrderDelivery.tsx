import React from 'react'
import styles from './OrderDelivery.module.scss'
import { OrderInfo } from '../../CompleteOrder.typings'
import YourOrder from '../YourOrder/YourOrder'
import Image from 'next/image'
import defaultPhoto from '../../../HomePage/assets/exampleCardImage.png'

export default function OrderDelivery({
    orderInfo,
}: {
    orderInfo: OrderInfo,
}) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.leftSide}>
                <div className={styles.title}>
                    Курьер в пути
                    <div className={styles.deliveryTime}>Осталось ждать примерно 7 мин</div>
                </div>
                <div className={styles.orderInfo}>
                    <YourOrder orderInfo={orderInfo} />
                </div>
            </div>
            <div className={styles.rightSide}>
                <div className={styles.photoContainer}>
                    <Image src={orderInfo.photo ? orderInfo.photo : defaultPhoto} alt='photo' fill />
                </div>
            </div>
        </div>
    )
}