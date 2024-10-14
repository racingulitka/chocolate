import React, { useState } from 'react'
import styles from './CategoryListing.module.scss'
import { GoodsArr } from '../HomePage/GoodsArea/GoodsArea.typings'
import ProductCard from '../ProductCard/ProductCard'
import { ProductCard as GoodsCard } from '../ProductCard/ProductCard.typings'
import cn from 'classnames'
import CategoryFilter from './components/CategoryFilter/CategoryFilter'

export default function CategoryListing({
    props,
    isMobile,
}: {
    props: GoodsArr,
    isMobile: boolean,
}) {

    const [selectedCard, setSelectedCard] = useState<number | null>(null)
    const typesArr = Array.from(new Set(props.goodsCard.map(item => item.type)))
    const [activeType, setActiveType] = useState<string | null>(null)
    const [goodsCardArr, setGoodsCardArr] = useState<GoodsCard[] | null>(props.goodsCard)

    const handleTypeClick = (type: string | undefined) => {
        if (type) {
            if (type === activeType) {
                setActiveType(null)
                setGoodsCardArr(props.goodsCard)
            } else {
                setActiveType(type)
                setGoodsCardArr(props.goodsCard.filter(item => item.type === type))
                window.scrollTo({top:250, behavior:'smooth'})
            }
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>{props.title}</div>
            <div className={styles.filters}>
                <CategoryFilter />
            </div>
            <div className={styles.content}>
                <div className={styles.subfilter}>
                    <div className={styles.subtitle}>Все товары</div>
                </div>
                <div className={styles.mainBlock}>
                    <aside className={styles.leftSide}>
                        <div className={cn(styles.mainLeftSideFilter, props.goodsCard.length === 0 && styles.mainLeftSideFilter)}>
                            {
                                typesArr.map((item, index) => {
                                    return (
                                        <div
                                            className={cn(styles.mainLeftSideFilterItem, item === activeType && styles.mainLeftSideFilterItemActive)}
                                            key={index}
                                            onClick={() => handleTypeClick(item)}
                                        >
                                            {item}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </aside>
                    <div className={styles.rightSide}>
                        {
                            goodsCardArr &&
                            goodsCardArr.map(item => {
                                return (
                                    <div className={styles.productCardContainer} key={item.id}>
                                        <ProductCard
                                            isMobile={isMobile}
                                            props={item}
                                            setSelectedCard={setSelectedCard}
                                        />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}