import React from 'react'
import styles from './YourOrder.module.scss'
import { OrderInfo } from '../../CompleteOrder.typings'
import {fields as fieldsConfig} from './YourOrder.config'

export default function YourOrder({
    orderInfo,
}:{
    orderInfo:OrderInfo,
}){

    const fields = {
        1:orderInfo.deliveryCost,
        2:orderInfo.to,
        3:orderInfo.when,
        4:orderInfo.address
    }

    return(
        <div className={styles.wrapper}>
            <div className={styles.title}>Ваш заказ:</div>
            <div className={styles.items}>
                {
                    orderInfo.items.map((item, index) => {
                        return(
                            <div className={styles.orderItem} key={index}>{item}</div>
                        )
                    })
                }
                {
                    fieldsConfig.map(item => {
                        const fieldKey = item.id as keyof typeof fields;
                        return(
                            <div className={styles.orderItem} key={item.id}>{item.title}{fields[fieldKey]}</div>
                        )
                    })
                }
            </div>
        </div>
    )
}