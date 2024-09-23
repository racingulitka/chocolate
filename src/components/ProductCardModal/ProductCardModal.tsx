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
import starIcon from './assets/star.svg'
import Link from 'next/link'
import deliveryIcon from './assets/deliveryIcon.svg'
import heartIcon from './assets/heartIcon.svg'
import bonusIcon from './assets/bonusIcon.svg'
import questionIcon from './assets/questionIcon.svg'
import blueArrow from './assets/blueArrow.svg'

export default function ProductCardModal({
    props,
}: {
    props: ProductCard,
}) {

    const [counterValue, setCounterValue] = useState<number>(1)
    const [isBlockSizingOpen, setBlockSizingOpen] = useState<boolean>(false)

    const handleCounter = (operator: boolean) => {
        if (operator && counterValue <= 100) setCounterValue(prev => ++prev)
        else if (!operator && counterValue > 1) setCounterValue(prev => --prev)
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
                        <Slider images={props.images} dimensions={props.dimensions ? props.dimensions : null} />
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
                                        return (
                                            <div className={styles.star} key={star}>
                                                <Image src={starIcon} alt='star' fill />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <Link href='#' className={styles.numberOfReviews}>{props.reviewsNumber} оценки о товаре</Link>
                        </div>
                        <div className={styles.priceAndCount}>
                            <div className={styles.priceBlock}>{props.currentPrice} <span>{useCurrency()}</span></div>
                            <Counter
                                size={130}
                                value={counterValue}
                                onChange={handleCounter}
                            />
                        </div>
                        <button className={cn(styles.button , styles.buttonToCart)}>Добавить в корзину</button>
                        <button className={cn(styles.button)}>Купить сейчас</button>
                        <div className={styles.additionalInfoBlock}>
                            <div className={styles.additionalInfo}>
                                <div className={styles.iconWrapper}>
                                    <Image src={deliveryIcon} alt='icon' />
                                </div>
                                <Link href="#" className={styles.pointAddress}>Укажите адрес</Link>
                                <div className={styles.additionalText} style={{marginLeft:'-10px'}}>, и мы узнаем стоимость доставки</div>
                            </div>
                            <div className={styles.additionalInfo}>
                                <div className={styles.iconWrapper}>
                                    <Image src={heartIcon} alt='icon' />
                                </div>
                                <div className={styles.additionalText}>41 человек добавили товар в свои подборки</div>
                            </div>
                            <div className={styles.additionalInfo}>
                                <div className={styles.iconWrapper}>
                                    <Image src={bonusIcon} alt='icon' />
                                </div>
                                <div className={styles.additionalText}>Получите 88 бонусов
                                    <div className={styles.questionIconContainer}>
                                        <Image src={questionIcon} alt='icon' fill/>
                                        <div className={styles.questionTooltip}>
                                        Получайте кешбек в виде бонусов с покупок и тратьте его на следующие заказы. Баланс бонусов можно посмотреть в разделе “Мои бонусы”
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.composition}>
                            <div className={styles.compositionTitle}>Состав</div>
                            <div className={styles.compositionItems}>
                                {
                                    props.composition &&
                                    props.composition.map(item => {
                                        if(isBlockSizingOpen){
                                        return(
                                            <div className={styles.compositionItem} key={item.id}>
                                                {item.title} - {item.value} {item.unit}
                                            </div>
                                        )
                                    } else {
                                        if(item.id <= 3){
                                            return(
                                            <div className={styles.compositionItem} key={item.id}>
                                                {item.title} - {item.value} {item.unit}
                                            </div>
                                            )
                                        }
                                    }
                                    })
                                }
                                <div className={styles.blockSizing} onClick={() => setBlockSizingOpen(prev => !prev)}>
                                    {
                                        isBlockSizingOpen ? 'Свернуть' : 'Показать еще'
                                    }
                                    <div className={styles.blockSizingIconContainer} style={{transform: `rotate(${isBlockSizingOpen ? '0' : '180'}deg)`}}>
                                        <Image src={blueArrow} alt='blue arrow' fill />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.footer}>
                <div className={styles.priceBlock}>{props.currentPrice} <span>{useCurrency()}</span></div>
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