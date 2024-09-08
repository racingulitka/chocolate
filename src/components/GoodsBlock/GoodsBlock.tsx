import React, { useState } from 'react'
import styles from './GoodsBlock.module.scss'
import { GoodsArr } from '../HomePage/GoodsArea/GoodsArea.typings'
import ProductCard from '../ProductCard/ProductCard'
import arrow from './assets/arrow.svg'
import Image from 'next/image'

export default function GoodsBlock({
    props,
    isMobile,
}: {
    props: GoodsArr,
    isMobile: boolean,
}) {

    const [isOpen, setOpen] = useState<boolean>(false)
    const [showMoreRate, setShowMoreRate] = useState<number>(1)
    const arrLength = props.goodsCard.length

    const handleShowMore = () => {
        setShowMoreRate(prev => ++prev)
    }

    const handleSeeAll = () => {
        setOpen(true)
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.titleBlock}>
                {props.title}
                {
                    props.isSeeAll && !isMobile && !isOpen &&
                    <div
                        className={styles.seeAllButton}
                        onClick={() => handleSeeAll()}
                    >
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
                        } else if (index < showMoreRate * 6) {
                            return (
                                <ProductCard key={card.id} {...card} />
                            )
                        }
                    })
                }
                {
                    !props.isSeeAll && arrLength > showMoreRate * 6 &&
                    <div
                        className={styles.showMore}
                        onClick={() => handleShowMore()}
                    >
                        Показать еще
                    </div>
                }
                {
                    props.isSeeAll && isMobile && !isOpen &&
                    <div
                        className={styles.seeAllButton}
                        onClick={() => handleSeeAll()}
                    >
                        Смотреть все
                        <div className={styles.arrowContainer}>
                            <Image src={arrow} alt='see all' fill />
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}