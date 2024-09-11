import React, { useState } from 'react'
import styles from './ProductCardModal.module.scss'
import { ProductCard } from '../ProductCard/ProductCard.typings'
import { useCurrency } from '@/utils/useCurrency'
import Counter from './Counter/Counter'
import cn from 'classnames'
import Slider from './Slider/Slider'

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

    return (
        <div className={styles.wrapper}>
            <div className={styles.topBlock}>
                <div className={styles.mainInfo}>
                    <div className={styles.mainLeft}>
                        <Slider />
                        <button className={styles.moreInfoButton}>Больше информации о товаре</button>
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