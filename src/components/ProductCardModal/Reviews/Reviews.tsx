import React from 'react'
import styles from './Reviews.module.scss'
import { Reviews as Props } from '@/components/ProductCard/ProductCard.typings'
import Image from 'next/image'
import { getFormateDate } from '@/utils/getFormateDate'
import star from './assets/star.svg'

export default function Reviews({
    props,
}:{
    props:Props[] | undefined,
}){

    const reviewValues = ['Сервис', 'Цена/Качество', 'Доставка', 'Соответствие']

    return(
        <div className={styles.wrapper}>
            <div className={styles.title}>Отзывы и оценки</div>
            {
                props && props.map(item => {
                    return(
                        <div className={styles.review} key={item.id}>
                            <div className={styles.info}>
                                <div className={styles.infoTop}>
                                    <div className={styles.avaContainer}>
                                        {
                                            item.avatar ?
                                            <Image src={item.avatar} alt='avatar' fill />
                                            :
                                            <div className={styles.avatar}>{item.name[0].toUpperCase()}</div>
                                        }
                                    </div>
                                    <div className={styles.name}>{item.name}</div>
                                    <div className={styles.date}>{getFormateDate(item.date)}</div>
                                </div>
                                <div className={styles.rates}>
                                    {
                                        reviewValues.map((rate, index) => {
                                            return(
                                                <div className={styles.rate} key={index}>
                                                    <div className={styles.rateTitle}>{rate}</div>
                                                    <div className={styles.rateValue}>
                                                        <div className={styles.starContainer}>
                                                            <Image src={star} alt='star' fill />
                                                        </div>
                                                        <div className={styles.value}>
                                                            <span>{item.rates[index]}</span>
                                                            /5
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className={styles.gallery}>
                                {
                                    item.images.map((image, index) => {
                                        return(
                                            <div className={styles.imageContainer} key={index}>
                                                <Image src={image} alt='image' fill />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}