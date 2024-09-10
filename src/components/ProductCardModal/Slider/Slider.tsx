import React from 'react'
import styles from './Slider.module.scss'
import Image from 'next/image'
import arrowLeft from './assets/arrowLeft.svg'
import cn from 'classnames'

export default function Slider(){

    const onSlideLeft = () => {

    }

    const onSlideRight = () => {

    }

    return(
        <div className={styles.wrapper}>
            <div className={styles.heroBlock}>
                <div className={styles.arrow} onClick={() => onSlideLeft()}>
                    <Image src={arrowLeft} alt='arrow left' fill />
                </div>
                <div className={cn(styles.arrow, styles.arrowRight)} onClick={() => onSlideRight()}>
                    <Image src={arrowLeft} alt='arrow left' fill />
                </div>
            </div>
        </div>
    )
}