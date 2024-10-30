import React, {useContext} from 'react'
import styles from './CartItem.module.scss'
import { ProductCard } from '@/components/ProductCard/ProductCard.typings'
import Image from 'next/image'
import CartCounter from './CartCounter/CartCounter'
import { context } from '@/pages/_app'
import { CurrencyArr } from '@/components/FooterHeaderSelect/FooterHeaderSelect.typings'
import { currencyArr } from '@/components/FooterHeaderSelect/FooterHeaderSelect.config'

export default function CartItem({
    data,
    value,
    index,
    onChange,
}: {
    data: ProductCard,
    value: number,
    index:number,
    onChange:(index:number, operator:boolean) => void
}) {

    const handleChange = (operator:boolean) => {
        onChange(index, operator)
    }

    const { currency, setCurrency } = useContext(context);

    return (
        <div className={styles.wrapper}>
            <div className={styles.imageContainer}>
                <Image src={typeof (data.images[0]) === 'string' ? data.images[1] : data.images[0]} alt='image' fill />
            </div>
            <div className={styles.rightSide}>
                <div className={styles.title}>{data.title}</div>
                <div className={styles.counterBlock}>
                    <CartCounter
                        value={value}
                        onChange={handleChange}
                    />
                    <div className={styles.counterPrice}>{data.currentPrice * value} <span>{currencyArr.find(item => item.id === currency)?.title || 'USD'}</span></div>
                </div>
            </div>
        </div>
    )
}