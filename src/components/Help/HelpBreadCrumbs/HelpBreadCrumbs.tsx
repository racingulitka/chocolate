import React from 'react'
import styles from './HelpBreadCrumbs.module.scss'
import arrowRight from './assets/arrowRight.svg'
import Image from 'next/image'

export default function HelpBreadCrumbs({
    current,
}: {
    current: string | null,
}) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>Помощь</div>
            {
                current &&
                <div className={styles.arrowContainer}>
                    <Image src={arrowRight} alt='arrow' fill />
                </div>
            }
            {
                current &&
                <div className={styles.current}>{current}</div>
            }
        </div>
    )
}