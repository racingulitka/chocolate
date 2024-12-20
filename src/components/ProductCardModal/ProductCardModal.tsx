import React, { useState, useRef, useEffect } from 'react'
import stylesDefault from './ProductCardModal.module.scss'
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
import xIcon from './assets/xIcon.svg'
import yIcon from './assets/yIcon.svg'
import flagIcon from './assets/flagIcon.svg'
import { customersInfo } from './ProductModal.config'
import Reviews from './Reviews/Reviews'
import SliderMobile from './SliderMobile/SliderMobile'

export default function ProductCardModal({
    isMobile,
    props,
    className,
}: {
    isMobile: boolean,
    props: ProductCard,
    className?: Record<string, string>,
}) {

    const styles = className ?? stylesDefault

    const [counterValue, setCounterValue] = useState<number>(1)
    const [isBlockSizingOpen, setBlockSizingOpen] = useState<boolean>(false)
    const [isFooterShown, setFooterShown] = useState<boolean>(isMobile)
    const mainInfoRef = useRef<null | HTMLDivElement>(null)

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


    useEffect(() => {
        const mainInfoId = mainInfoRef.current
        if (mainInfoId && !isMobile) {
            const handleScroll = () => {
                const currentScroll = mainInfoId.scrollTop
                if (currentScroll > 300) setFooterShown(true)
                else setFooterShown(false)
            }
            mainInfoId.addEventListener('scroll', handleScroll)
            return () => mainInfoId.removeEventListener('scroll', handleScroll)
        }
    }, [])

    useEffect(() => {
        console.log(isFooterShown)
    }, [isFooterShown])

    useEffect(() => {
        if (className && !isMobile) {
            const handleScroll = () => {
                const currentScroll = window.scrollY
                if (currentScroll > 450) setFooterShown(true)
                else setFooterShown(false)
            }
            window.addEventListener('scroll', handleScroll)
            return () => window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const currency = useCurrency()

    return (
        <div className={styles.wrapper}>
            <div className={styles.topBlock} ref={mainInfoRef}>
                <div className={styles.mainInfo}>
                    <div className={styles.mainLeft}>
                        {
                            isMobile ?
                                <SliderMobile images={props.images} dimensions={props.dimensions ? props.dimensions : null} fullScreen={className ? true : false} />
                                :
                                <Slider images={props.images} dimensions={props.dimensions ? props.dimensions : null} fullScreen={className ? true : false} />
                        }
                        {
                            !className &&
                            <Link href={`/product/${props.slug}`}> <button className={styles.moreInfoButton}>Больше информации о товаре</button></Link>
                        }
                    </div>
                    <div className={styles.mainRight}>
                        <div className={styles.header}>
                            <p className={styles.availableConfirm}>Наличие подтверждено {getAvailableConfirmValue()} назад</p>
                            {
                                !isMobile &&
                                <div className={styles.headerIcons}>
                                    <div className={styles.iconContainer} onClick={() => console.log('setFavourite')}>
                                        <HeartIcon isFavourite={props.isFavourite} />
                                    </div>
                                    <div className={styles.iconContainer}>
                                        <Image src={shareIcon} alt='share' fill />
                                    </div>
                                </div>
                            }
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
                        {
                            !isMobile &&
                            <div className={styles.priceAndCount}>
                                <div className={styles.priceBlock}>{props.currentPrice} <span>{currency}</span></div>
                                <Counter
                                    value={counterValue}
                                    onChange={handleCounter}
                                />
                            </div>
                        }
                        {
                            !isMobile &&
                            <button className={cn(styles.button, styles.buttonToCart)}>Добавить в корзину</button>
                        }
                        {
                            !isMobile &&
                            <button className={cn(styles.button)}>Купить сейчас</button>
                        }
                        <div className={styles.additionalInfoBlock}>
                            <div className={styles.additionalInfo}>
                                <div className={styles.iconWrapper}>
                                    <Image src={deliveryIcon} alt='icon' />
                                </div>
                                <Link href="#" className={styles.pointAddress}>Укажите адрес</Link>
                                <div className={styles.additionalText} style={{ marginLeft: '-10px' }}>, и мы узнаем стоимость доставки</div>
                            </div>
                            <div className={styles.additionalInfo}>
                                <div className={styles.iconWrapper}>
                                    <Image src={heartIcon} alt='icon' />
                                </div>
                                <div className={styles.additionalText}>41 человек добавили товар в свои подборки</div>
                            </div>
                            <div className={styles.additionalInfo}>
                                <div className={styles.iconWrapper}>
                                    <Image src={bonusIcon} alt='icon' fill />
                                </div>
                                <div className={styles.additionalText}>Получите 88 бонусов
                                    <div className={styles.questionIconContainer}>
                                        <Image src={questionIcon} alt='icon' fill />
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
                                        if (isBlockSizingOpen) {
                                            return (
                                                <div className={styles.compositionItem} key={item.id}>
                                                    {item.title} - {item.value} {item.unit}
                                                </div>
                                            )
                                        } else {
                                            if (item.id <= 3) {
                                                return (
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
                                    <div className={styles.blockSizingIconContainer} style={{ transform: `rotate(${isBlockSizingOpen ? '0' : '180'}deg)` }}>
                                        <Image src={blueArrow} alt='blue arrow' fill />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.dimensions}>
                            <div className={styles.dimensionsTitle}>Размер</div>
                            <div className={styles.dimensionsMeasure}>
                                {
                                    props.dimensions && props.dimensions.map((dimension, index) => {
                                        return (
                                            <div className={styles.dimension} key={index}>
                                                <div className={styles.dimensionIconContainer}>
                                                    <Image src={index === 0 ? xIcon : yIcon} alt='icon' fill />
                                                </div>
                                                {index === 0 ? 'Ширина' : 'Высота'} - {dimension} см.
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.bottomBlock}>
                    <Reviews props={props.reviews} />
                    <div className={styles.customersInfo}>
                        {
                            customersInfo.map(item => {
                                return (
                                    <div className={styles.customersInfoBlock} key={item.id}>
                                        <div className={styles.customersInfoBlockTop}>
                                            <div className={styles.customersInfoBlockIconContainer}>
                                                <Image src={item.icon} alt='icon' fill />
                                            </div>
                                            <p className={styles.customersInfoTitle}>{item.title}</p>
                                        </div>
                                        <div className={styles.customersInfoBlockBottom}>
                                            {item.text}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={styles.complainBlock}>
                        <div className={styles.complainIconContainer}>
                            <Image src={flagIcon} alt='icon' fill />
                        </div>
                        <p className={styles.complain}>Пожаловаться на товар</p>
                    </div>
                </div>
            </div>
            {
                isFooterShown &&
                <div className={styles.footer}>
                    <div className={styles.priceBlock}>{props.currentPrice} <span>{currency}</span></div>
                    <div className={styles.rightSide}>
                        <div className={styles.counter}>
                            <Counter
                                value={counterValue}
                                onChange={handleCounter}
                            />
                        </div>
                        <button className={cn(styles.button, styles.buttonToCart)}>
                            {
                                isMobile ?
                                    <div className={styles.mobileButton}>
                                        <span>Добавить</span>
                                        <span>
                                            {props.currentPrice}
                                            <span className={styles.currency}>{currency}</span>
                                        </span>
                                    </div>
                                    :
                                    'Добавить в корзину'
                            }
                        </button>
                        {!isMobile && <button className={cn(styles.button)}>Купить сейчас</button>}
                    </div>
                </div>
            }
        </div>
    )
}