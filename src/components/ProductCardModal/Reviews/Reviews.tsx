import React from 'react'
import styles from './Reviews.module.scss'
import { Reviews as Props } from '@/components/ProductCard/ProductCard.typings'
import Image from 'next/image'
import { getFormateDate } from '@/utils/getFormateDate'

export default function Reviews({
    props,
}:{
    props:Props[] | undefined,
}){
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