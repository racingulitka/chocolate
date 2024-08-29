import React, {useContext} from 'react'
import styles from './Footer.module.scss'
import logo from './assets/Logo.svg'
import Image from 'next/image'
import { footerCategories } from './Footer.config'
import Link from 'next/link'
// import {context as currency} from '@/pages/_app'
import {context as currencyContext} from '@/pages/_app'

export default function Footer() {

    // const context = useContext(currency)

        // Получаем значение валюты и функцию для изменения из контекста
        const { currency, setCurrency } = useContext(currencyContext);

        // Пример функции для смены валюты
        const switchCurrency = () => {
            const newCurrency = currency === 'RU' ? 'USD' : 'RU';
            setCurrency(newCurrency);
        };

    return (
        <div className={styles.mainWrapper}>
             <div className={styles.wrapper}>
                <div className={styles.topBlock}>
                    <div className={styles.topLeftBlock}>
                        <Link href='/'>
                            <div className={styles.logoContainer}>
                                <Image src={logo} alt='logo' layout='fill' />
                            </div>
                        </Link>
                        <div className={styles.mainInfo}>
                            <p>+7 (999) 999-99-99</p>
                            <p>ул. Пушкина, д.17</p>
                        </div>
                    </div>
                    <div className={styles.topRightBlock}>
                        {
                            footerCategories.map(category => {
                                return (
                                    <div key={category.id} className={styles.category}>
                                        <div className={styles.title}>{category.title}</div>
                                        <div className={styles.links}>
                                            {
                                                category.links.map(link => {
                                                    return (
                                                        <Link href={link.link} key={link.id}>
                                                            <p>{link.title}</p>
                                                        </Link>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className={styles.splitter}></div>
                <div className={styles.bottomBlock}>
                    <div className={styles.bottomLeftBlock}>
                        <div className={styles.logoBottomContainer}>
                            <Image src={logo} alt='logo' layout='fill' />
                        </div>
                        <Link href="#">
                            <p>Пользовательское соглашение</p>
                        </Link>
                        <Link href="#">
                            <p>Политика конфенденциальности</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}