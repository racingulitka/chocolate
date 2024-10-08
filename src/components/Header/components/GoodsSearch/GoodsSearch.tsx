import React from 'react'
import styles from './GoodsSearch.module.scss'
import searchIcon from './assets/searchIcon.svg'
import Image from 'next/image'

export default function GoodsSearch({
    isMobile,
}:{
    isMobile:boolean,
}) {
    return (
        <div className={styles.wrapper}>
            <input
                type="text"
                className={styles.input}
                placeholder={isMobile ? '' : 'Найти товары'}
            />
            <div className={styles.iconWrapper}>
                <Image src={searchIcon} alt='search icon' layout='fill' />
            </div>
        </div>
    )
}