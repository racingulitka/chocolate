import React, { useState, useRef } from 'react'
import styles from './BreadCrumbs.module.scss'
import Image from 'next/image'
import arrowDown from './assets/arrowDown.svg'
import { selectArr } from './BreadCrumbs.config'
import Link from 'next/link'
import useOnClickOutside from '@/utils/useOnClickOutside';
import cn from 'classnames'

export default function BreadCrumbs({
    currentPage,
    marginTop,
}: {
    currentPage: string,
    marginTop?:number,
}) {

    const [isSelectOpen, setSelectOpen] = useState<boolean>(false)
    const wrapperRef = useRef<HTMLDivElement | null>(null)

    useOnClickOutside(wrapperRef, () => setSelectOpen(false));

    return (
        <div className={styles.wrapper} ref={wrapperRef} style={{marginTop:`${marginTop}px`}}>
            <div className={styles.selector}>
                <div className={styles.currentSelect} onClick={() => setSelectOpen(prev => !prev)}>
                    Клубника в шоколаде в Усть-Каменогорске
                    <div className={cn(styles.arrowContainer, isSelectOpen && styles.arrowContainerOpen)}>
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