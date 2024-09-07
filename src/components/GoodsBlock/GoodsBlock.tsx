import React, { useState } from 'react'
import styles from './GoodsBlock.module.scss'
import { GoodsArr } from '../HomePage/GoodsArea/GoodsArea.typings'
import ProductCard from '../ProductCard/ProductCard'
import arrow from './assets/arrow.svg'
import Image from 'next/image'

export default function GoodsBlock(props: GoodsArr) {

    const [isOpen, setOpen] = useState<boolean>(false)

    return (
        <div className={styles.wrapper}>
            <div className={styles.titleBlock}>
                {props.title}
                {
                    props.isSeeAll &&
                    <div className={styles.seeAllButton}>
                        Смотреть все
                        <div className={styles.arrowContainer}>
                            <Image src={arrow} alt='see all' fill />
                        </div>
                    </div>
                }
            </div>
            <div className={styles.cardsBlock}>
                {
                    props.goodsCard.map((card, index) => {
                        if (isOpen) {
                            return (
                                <ProductCard key={card.id} {...card} />
                            )
                        } else if(index < 6) {
                            return (
                                <ProductCard key={card.id} {...card} />
                            )
                        }
                    })
                }
            </div>
        </div>
    )
}