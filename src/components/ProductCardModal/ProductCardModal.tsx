import React, { useState } from 'react'
import styles from './ProductCardModal.module.scss'
import { ProductCard } from '../ProductCard/ProductCard.typings'
import { useCurrency } from '@/utils/useCurrency'
import Counter from './Counter/Counter'
import cn from 'classnames'
import Slider from './Slider/Slider'
import HeartIcon from './assets/Heart'
import shareIcon from './assets/share.svg'
import Image from 'next/image'

export default function ProductCardModal({
    props,
}: {
    props: ProductCard,
}) {

    const [counterValue, setCounterValue] = useState<number>(1)

    const handleCounter = (operator: boolean) => {
        if (operator && counterValue <= 100) setCounterValue(prev => ++prev)
        else if(!operator && counterValue > 1) setCounterValue(prev => --prev)
    }

    const getAvailableConfirmValue = () => {
        const confirmHours = props.availableConfirm.getHours()
        const confirmMinutes = props.availableConfirm.getMinutes()
        const nowHours = new Date().getHours()
        const nowMinutes = new Date().getMinutes()
        const diffHours = nowHours - confirmHours
        const diffMinutes = nowMinutes - confirmMinutes
        return `${diffHours} ч ${diffMinutes} мин`

    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.topBlock}>
                <div className={styles.mainInfo}>
                    <div className={styles.mainLeft}>
                        <Slider images={props.images} dimensions={props.dimensions ? props.dimensions : null}/>
                        <button className={styles.moreInfoButton}>Больше информации о товаре</button>
                    </div>
                    <div className={styles.mainRight}>
                        <div className={styles.header}>
                            <p className={styles.availableConfirm}>Наличие подтверждено {getAvailableConfirmValue()} назад</p>
                            <div className={styles.headerIcons}>
                                <div className={styles.iconContainer} onClick={() => console.log('setFavourite')}>
                                    <HeartIcon isFavourite={props.isFavourite} />
                                </div>
                                <div className={styles.iconContainer}>
                                    <Image src={shareIcon} alt='share' fill />
                                </div>
                            </div>
                        </div>
                        <div className={styles.title}>Упаковка “Клубника в шоколаде”</div>
                        <div className={styles.ratingBlock}>
                            <div className={styles.stars}>
                                {
                                    [1, 2, 3, 4, 5].map(star => {
                                        return(
                                            <div className={styles.star} key={star}>
                                                
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.footer}>
                <div className={styles.priceBlock}>{props.currentPrice} {useCurrency()}</div>
                <div className={styles.rightSide}>
                    <div className={styles.counter}>
                        <Counter
                            size={130}
                            value={counterValue}
                            onChange={handleCounter}
                        />
                    </div>
                    <button className={cn(styles.button, styles.buttonToCart)}>Добавить в корзину</button>
                    <button className={cn(styles.button)}>Купить сейчас</button>
                </div>
            </div>
        </div>
    )
}