import React from 'react'
import styles from './GoodsSearch.module.scss'
import searchIcon from './assets/searchIcon.svg'
import Image from 'next/image'

export default function GoodsSearch() {
    return (
        <div className={styles.wrapper}>
            <input
                type="text"
                className={styles.input}
                placeholder='Найти товары'
            />
            <div className={styles.iconWrapper}>
                <Image src={searchIcon} alt='search icon' layout='fill' />
            </div>
        </div>
    )
}