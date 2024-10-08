import React from 'react'
import styles from './ProductCard.module.scss'
import { ProductCard as ProductCardTypings } from './ProductCard.typings'
import Heart from './assets/Heart'
import star from './assets/star.svg'
import Image, { StaticImageData } from 'next/image'
import { useCurrency } from '@/utils/useCurrency'
import { useRouter } from 'next/router'

export default function ProductCard({
    isMobile,
    props,
    setSelectedCard,
}: {
    isMobile:boolean,
    props: ProductCardTypings,
    setSelectedCard: React.Dispatch<React.SetStateAction<number | null>>,
}) {

    const router = useRouter()

    const handleFavourite = (e:React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        console.log('setFavourite')
    }

    const handleBuy = (e:React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        console.log('buy')
    }

    const onPush = () => {
        if(isMobile){
            router.push(`/product/${props.slug}`)
            console.log(props)
        } else{
            setSelectedCard(props.id)
        }
    }

    return (
        <div
            className={styles.wrapper}
            onClick={() => onPush()}
        >
            <div className={styles.topBlock} style={{ background: `url(${typeof(props.images[0]) === 'string' ? (props.images[1] as StaticImageData).src : props.images[0].src})`, backgroundSize: 'contain', backgroundPosition: 'center top', backgroundRepeat: 'no-repeat' }}>
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