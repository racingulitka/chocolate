import React, { useState } from 'react'
import styles from './HomePageHero.module.scss'
import rightImage from './assets/rightImage.png'
import leftImage from './assets/leftImage.png'
import geolocation from './assets/geolocation.svg'
import Image from 'next/image'
import Checkbox from '@/components/Checkbox/Checkbox'
import faqIcon from './assets/faq.svg'

export default function HomePageHero() {

    const [isChecked, setChecked] = useState<boolean>(false)
    const [isFaq, setFaq] = useState<boolean>(false)

    const handleCheck = () => {
        setChecked(prev => !prev)
    }

    return (
        <div className={styles.mainWrapper}>
            <div className={styles.wrapper}>
                <div className={styles.leftBlock}>
                    <h2 className={styles.title}>Надежная доставка от 30 минут</h2>
                    <div className={styles.inputContainer}>
                        <div className={styles.geolocation}>
                            <Image src={geolocation} alt='image' layout='fill' />
                        </div>
                        <input type="text" className={styles.input} placeholder='Укажите адрес доставки' />
                        <div className={styles.showButton}>Показать</div>
                    </div>
                    <div className={styles.confirmBlock}>
                        <Checkbox
                            classname={styles.checkboxWrapper}
                            checked={isChecked}
                            setChecked={handleCheck}
                        />
                        <p>Уточнить адрес у получателя</p>
                        <div className={styles.faqContainer} onMouseEnter={()=> setFaq(true)} onMouseLeave={() => setFaq(false)} >
                            <Image src={faqIcon} alt='faq' fill />
                            {
                                isFaq &&
                                <div className={styles.tooltip}>
                                    Мы сами свяжемся с получателем и организуем доставку. После этого вам автоматически придет счёт на доплату за нее.
                                </div>
                            }
                        </div>
                    </div>
                    <div className={styles.additionalText}>
                        Укажите только город, куда хотите отправить подарок, остальное узнаем сами
                    </div>
                </div>
                <div className={styles.rightImage}>
                    <Image src={rightImage} alt='image' layout='fill' />
                </div>
                <div className={styles.leftImage}>
                    <Image src={leftImage} alt='image' layout='fill' />
                </div>
            </div>
        </div>
    )
}