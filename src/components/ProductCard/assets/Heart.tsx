import React from 'react'
import styles from '../ProductCard.module.scss'

export default function Heart({
    isFavourite,
}:{
    isFavourite:boolean,
}) {

    const color = isFavourite ? '#FF0000' : '#AAAAAA'

    return (
        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.heart}>
            <g id="heart-svgrepo-com (3) 1">
                <path id="Vector" d="M1.75 7.99567C1.75 12.2507 5.267 14.5182 7.84151 16.5477C8.75 17.2639 9.625 17.9382 10.5 17.9382C11.375 17.9382 12.25 17.2639 13.1585 16.5477C15.733 14.5182 19.25 12.2507 19.25 7.99567C19.25 3.74059 14.4373 0.722984 10.5 4.81375C6.56264 0.722984 1.75 3.74059 1.75 7.99567Z" fill={color} />
            </g>
        </svg>
    )
}
