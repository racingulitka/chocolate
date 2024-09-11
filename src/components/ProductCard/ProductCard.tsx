import React from 'react'
import styles from './ProductCard.module.scss'
import { ProductCard as ProductCardTypings } from './ProductCard.typings'
import Heart from './assets/Heart'
import star from './assets/star.svg'
import Image from 'next/image'
import { useCurrency } from '@/utils/useCurrency'

export default function ProductCard({
    props,
    setSelectedCard,
}: {
    props: ProductCardTypings,
    setSelectedCard: React.Dispatch<React.SetStateAction<number | null>>,
}) {

    const handleFavourite = (e:React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        console.log('setFavourite')
    }

    const handleBuy = (e:React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        console.log('buy')
    }

    return (
        <div
            className={styles.wrapper}
            onClick={() => setSelectedCard(props.id)}
        >
            <div className={styles.topBlock} style={{ background: `url(${props.images[0].src})`, backgroundSize: 'contain', backgroundPosition: 'center top', backgroundRepeat: 'no-repeat' }}>
                <div className={styles.heartBlock} onClick={(e) => handleFavourite(e)}>
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
                        <div
                            className={styles.buy}
                            onClick={(e)=> handleBuy(e)}
                        >
                            Купить
                        </div>
                        <div className={styles.currentPrice}>{props.currentPrice} {useCurrency()}</div>
                        <div className={styles.oldPrice}>
                            {props.oldPrice} {useCurrency()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}