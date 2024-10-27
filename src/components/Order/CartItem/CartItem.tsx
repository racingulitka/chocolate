import React from 'react'
import styles from './CartItem.module.scss'
import { ProductCard } from '@/components/ProductCard/ProductCard.typings'
import Image from 'next/image'
import CartCounter from './CartCounter/CartCounter'

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
                </div>
            </div>
        </div>
    )
}