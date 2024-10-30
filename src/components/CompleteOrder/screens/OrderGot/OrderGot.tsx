import React from 'react'
import styles from './OrderGot.module.scss'
import { OrderInfo } from '../../CompleteOrder.typings'
import YourOrder from '../YourOrder/YourOrder'
import Button from '../../Button/Button'

export default function OrderGot({
    orderInfo,
}: {
    orderInfo: OrderInfo,
}) {

    const defaultFunc = () => {
        console.log('push')
    }

    const buttons = [
        {
            id:1,
            title:'Редактировать заказ',
            func:defaultFunc,
        },
        {
            id:2,
            title:'Отменить заказ',
            func:defaultFunc,
        },
    ]

    return (
        <div className={styles.wrapper}>
            <div className={styles.leftSide}>
                <div className={styles.title}>Ваш заказ ожидает оплату</div>
                <div className={styles.orderInfo}>
                    <YourOrder orderInfo={orderInfo} />
                </div>
            </div>
            <div className={styles.rightSide}>
                {
                    buttons.map(item => {
                        return(
                            <Button
                                key={item.id}
                                title={item.title}
                                func={item.func}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}