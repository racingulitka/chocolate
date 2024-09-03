import React from 'react'
import styles from './ProductCard.module.scss'
import { Props } from './ProductCard.typings'
import Heart from './assets/Heart'
import star from './assets/star.svg'
import Image from 'next/image'

export default function ProductCard(props: Props) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.topBlock} style={{ background: `url(${props.image.src})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                <div className={styles.heartBlock} onClick={() => console.log('setFavourite')}>
                    <Heart isFavourite={props.isFavourite} />
                </div>
            </div>
            <div className={styles.bottomBlock}>
                <div className={styles.title}>{props.title}</div>
                <div className={styles.bottomDigitBlock}>
                    <div className={styles.rating}>
                        <div className={styles.starContainer}>
                            <Image src={star} alt='star' fill />
                        </div>
                        <div className={styles.ratingMetric}>
                            <p className={styles.rate}>{props.rating}</p>
                            <p className={styles.reviewsNumber}>{props.reviewsNumber}</p>
                        </div>
                    </div>
                    <div className={styles.priceBlock}>
                        <div className={styles.buy}>Купить</div>
                        <div className={styles.currentPrice}>{props.currentPrice} ₸</div>
                        <div className={styles.oldPrice}>
                            {props.oldPrice} ₸
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}