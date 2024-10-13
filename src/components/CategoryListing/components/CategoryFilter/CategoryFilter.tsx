import React from 'react'
import styles from './CategoryFilter.module.scss'
import filterIcon from './assets/filterIcon.svg'
import arrow from './assets/arrow.svg'
import Image from 'next/image'

export default function CategoryFilter(){
    return(
        <div className={styles.wrapper}>
            <div className={styles.filterIcon}>
                <Image src={filterIcon} alt='filter icon' fill />
            </div>
            <div className={styles.selectedCategory}>Клубника в шоколаде</div>
            <div className={styles.arrow}>
                <Image src={arrow} alt='arrow' fill />
            </div>
        </div>
    )
}