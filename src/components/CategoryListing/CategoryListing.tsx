import React, {useState} from 'react'
import styles from './CategoryListing.module.scss'
import { GoodsArr } from '../HomePage/GoodsArea/GoodsArea.typings'
import ProductCard from '../ProductCard/ProductCard'

export default function CategoryListing({
    props,
    isMobile,
}: {
    props: GoodsArr,
    isMobile: boolean,
}) {

    const [selectedCard, setSelectedCard] = useState<number | null>(null)

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>{props.title}</div>
            <div className={styles.filters}>filters</div>
            <div className={styles.content}>
                <div className={styles.subfilter}>
                    <div className={styles.subtitle}>Все товары</div>
                </div>
                <div className={styles.mainBlock}>
                    <aside className={styles.leftSide}>
                    </aside>
                    <div className={styles.rightSide}>
                        {
                            props.goodsCard.map(item => {
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