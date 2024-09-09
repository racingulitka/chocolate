import React from 'react'
import styles from './ProductCardModal.module.scss'
import { ProductCard } from '../ProductCard/ProductCard.typings'
import { getCurrency } from '@/utils/getCurrency'

export default function ProductCardModal({
    props,
}: {
    props: ProductCard,
}) {

    return (
        <div className={styles.wrapper}>
            <div className={styles.footer}>
                <div className={styles.priceBlock}>{props.currentPrice}{getCurrency()}</div>
            </div>
        </div>
    )
}