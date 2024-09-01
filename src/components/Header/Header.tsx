import React from 'react'
import styles from './Header.module.scss'
import GoodsSearch from './components/GoodsSearch/GoodsSearch'
import sideMenuIconSort from './assets/sideMenuIconSort.svg'
import sideMenuIconHuman from './assets/sideMenuIconHuman.svg'
import logo from './assets/Logo.svg'
import Image from 'next/image'
import FooterHeaderSelect from '../FooterHeaderSelect/FooterHeaderSelect'
import { categoriesArr } from './Header.config'
import cn from 'classnames'
import { PageType } from '../PageLayout/PageLayout.typings'
import instagramIcon from './assets/Instagram.png'
import Link from 'next/link'

export default function Header({
    isMobile,
    pageType,
}: {
    isMobile: boolean,
    pageType: PageType,
}) {
    return (
        <header className={styles.mainWrapper}>
            <div className={styles.wrapper}>
                <div className={styles.topBlock}>
                    <div className={styles.logo}>
                        <Image src={logo} alt='logo' layout='fill' />
                    </div>
                    <div className={styles.topRightBlock}>
                        <GoodsSearch />
                        <div className={styles.sideMenuButton}>
                            <div className={styles.sideMenuIconSortContainer}>
                                <Image src={sideMenuIconSort} alt='sortIcon' layout='fill' />
                            </div>
                            <div className={styles.sideMenuIconHumanContainer}>
                                <Image src={sideMenuIconHuman} alt='humanIcon' layout='fill' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.bottomBlock}>
                    <div className={styles.categories}>
                        {
                            categoriesArr.map(category => {
                                return (
                                    <div className={styles.category} key={category.id}>
                                        <div className={styles.categoryIcon}>
                                            <Image src={category.icon} alt='category icon' layout='fill' />
                                        </div>
                                        <div className={cn(styles.categoryTitle)}>{category.title}</div>
                                    </div>
                                )
                            })
                        }
                        {
                            pageType === PageType.main &&
                            <Link href='#'>
                                <div className={styles.instagramButton}>
                                    <div className={styles.instagramIconContainer}>
                                        <Image src={instagramIcon} alt='instagram' layout='fill' />
                                    </div>
                                    <p>Посмотреть Instagram</p>
                                </div>
                            </Link>
                        }
                    </div>
                    <div className={styles.bottomRightBlock}>
                        <FooterHeaderSelect
                            isMobile={isMobile}
                            type='currency'
                            position='header'
                        />
                        <FooterHeaderSelect
                            isMobile={isMobile}
                            type='lang'
                            position='header'
                        />

                    </div>
                </div>
            </div>
        </header>
    )
}