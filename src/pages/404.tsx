import React from 'react'
import styles from '../styles/404.module.scss'
import logo from './assets/404/logo.svg'
import catImg from './assets/404/cat.png'
import Image from 'next/image'
import Link from 'next/link'

export default function page404() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.mainWrapper}>
                <div className={styles.logoWrapper}>
                    <Image src={logo} alt='logo' fill />
                </div>
                <div className={styles.mainBlock}>
                    <div className={styles.catWrapper}>
                        <Image src={catImg} alt='cat image' fill />
                    </div>
                    <div className={styles.rightBlock}>
                        <p className={styles.title}>Произошла ошибка</p>
                        <p className={styles.text}>Возможно, ссылка, по которой вы перешли, не работает или страница была удалена</p>
                        <Link href='/' style={{width:'100%', display:'flex', justifyContent:'center'}}><button className={styles.toTheMain}>Вернуться на главную страницу</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}