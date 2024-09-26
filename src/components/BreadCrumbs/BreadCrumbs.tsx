import React, { useState } from 'react'
import styles from './BreadCrumbs.module.scss'
import Image from 'next/image'
import arrowDown from './assets/arrowDown.svg'
import { selectArr } from './BreadCrumbs.config'
import Link from 'next/link'

export default function BreadCrumbs({
    currentPage,
}: {
    currentPage: string,
}) {

    const [isSelectOpen, setSelectOpen] = useState<boolean>(false)

    return (
        <div className={styles.wrapper}>
            <div className={styles.selector}>
                <div className={styles.currentSelect} onClick={() => setSelectOpen(prev => !prev)}>
                    Клубника в шоколаде в Усть-Каменогорске
                    <div className={styles.arrowContainer}>
                        <Image src={arrowDown} alt='arrow' fill />
                    </div>
                </div>
                {
                    isSelectOpen &&
                    <div className={styles.options}>
                        {
                            selectArr.map(item => {
                                return (
                                    <Link href={item.route} className={styles.option} key={item.id}>
                                        {item.title}
                                    </Link>
                                )
                            })
                        }
                    </div>
                }
            </div>
            <div className={styles.currentPage}>- {currentPage}</div>
        </div>
    )
}