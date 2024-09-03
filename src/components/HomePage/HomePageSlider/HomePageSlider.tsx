import React from 'react'
import styles from './HomePageSlider.module.scss'
import ProductCard from '@/components/ProductCard/ProductCard'
import exampleCardImage from '../assets/exampleCardImage.png'

export default function HomePageSlider(){

    const cardParams = {
        image:exampleCardImage,
        isFavourite:false,
        title:'Упаковка “Клубника в шоколаде”',
        rating:4.9,
        reviewsNumber:180,
        oldPrice:3300,
        currentPrice:3300,
    }

    return(
        <div className={styles.mainWrapper}>
            <div className={styles.wrapper}>
                <h1>Клубника в шоколаде в<span> Усть-Каменогорске</span></h1>
                <ProductCard
                    {...cardParams}
                />
            </div>
        </div>
    )
}