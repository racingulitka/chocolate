import React, { useState, useEffect } from 'react'
import styles from './SideMenu.module.scss'
import crossIcon from './assets/crossIcon.svg'
import arrowIcon from './assets/arrowIcon.svg'
import Image from 'next/image'
import cn from 'classnames'
import {motion} from 'framer-motion'
export default function SideMenu({
    onClose,
}: {
    onClose: React.Dispatch<React.SetStateAction<boolean>>
}) {

    const sideMenuData = {
        flowersAndGifts: [
            {
                id: 1,
                title: 'Клубника в шоколаде',
                subcategory: [
                    {
                        id: 1,
                        title: 'Клубничные боксы',
                    },
                    {
                        id: 2,
                        title: 'Шоколадные наборы',
                    },
                ]
            },
            {
                id: 2,
                title: 'Фрукты в шоколаде',
                subcategory: [

                ]
            },
            {
                id: 3,
                title: 'Шоколадные цветы',
                subcategory: [

                ]
            }
        ]
    }

    const [activeCategory, setActiveCategory] = useState<number>(1)
    const activeCategoryTitle = sideMenuData.flowersAndGifts.find(item => item.id === activeCategory)?.title
    const subcategoryArr = sideMenuData.flowersAndGifts.find(item => item.id === activeCategory)?.subcategory

    return (
        <motion.div
            className={styles.wrapper}
            initial={{translate:'-100%'}}
            animate={{translate:0}}
            exit={{translate:'-100%'}}
        >
            <div className={styles.side}>
                <div className={styles.closeWrapper} onClick={() => onClose(false)}>
                    <Image src={crossIcon} alt='close' fill />
                </div>
                <div className={styles.mainTitle}>Цветы и подарки</div>
                <div className={styles.options}>
                    {
                        sideMenuData.flowersAndGifts.map(item => {
                            return (
                                <div
                                    className={cn(styles.option, item.id === activeCategory && styles.optionActive)}
                                    key={item.id}
                                    onMouseEnter={() => setActiveCategory(item.id)}
                                >
                                    {item.title}
                                    {
                                        item.id === activeCategory &&
                                        <div className={styles.arrowContainer}>
                                            <Image src={arrowIcon} alt='arrow left' fill />
                                        </div>
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className={styles.side}>
                <div className={styles.mainTitle}>
                    {activeCategoryTitle}
                </div>
                <div className={styles.options}>
                    {
                        subcategoryArr?.map(item => {
                            return(
                                <div className={styles.option} key={item.id}>
                                    {item.title}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </motion.div>
    )
}