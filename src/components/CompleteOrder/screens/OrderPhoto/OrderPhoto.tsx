import React from 'react'
import styles from './OrderPhoto.module.scss'
import { OrderInfo } from '../../CompleteOrder.typings'
import YourOrder from '../YourOrder/YourOrder'
import Button from '../../Button/Button'
import Image from 'next/image'
import defaultPhoto from '../../../HomePage/assets/exampleCardImage.png'
import { likeButtons } from './OrderPhoto.config'

export default function OrderPhoto({
    orderInfo,
}: {
    orderInfo: OrderInfo,
}) {

    const defaultFunc = () => {
        console.log('push')
    }

    const buttons = [
        {
            id: 1,
            title: 'Отменить заказ',
            func: defaultFunc,
        },
    ]

    return (
        <div className={styles.wrapper}>
            <div className={styles.leftSide}>
                <div className={styles.title}>Оцените фото до доставки</div>
                <div className={styles.orderInfo}>
                    <YourOrder orderInfo={orderInfo} />
                </div>
            </div>
            <div className={styles.rightSide}>
                <div className={styles.photoContainer}>
                    <Image src={orderInfo.photo ? orderInfo.photo : defaultPhoto} alt='photo' fill />
                    <div className={styles.likesBlock}>
                        {
                            likeButtons.map(item => {
                                return(
                                    <div className={styles.likeButton} key={item.id} onClick={() => defaultFunc()}>
                                        <div className={styles.iconContainer}>
                                            <Image src={item.id === 1 ? item.active : item.inactive} alt='like' fill />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                {
                    buttons.map(item => {
                        return (
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