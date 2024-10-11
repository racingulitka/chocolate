import React, { useState } from 'react'
import styles from './MapModal.module.scss'
import closeIcon from './assets/closeIcon.svg'
import geoIcon from './assets/geoIcon.svg'
import Image from 'next/image'
import questionIcon from './assets/questionIcon.svg'
import Checkbox from '@/components/Checkbox/Checkbox'

export default function MapModal() {

    const [value, setValue] = useState<string>('')
    const [isChecked, setChecked] = useState<boolean>(false)

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        setValue(value)
    }

    const handleResetValue = () => {
        setValue('')
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.titleBlock}>
                <h2 className={styles.title}>Укажите адрес доставки на карте</h2>
                <p className={styles.subtitle}>Покажем вам магазины, чтобы заказать доставку</p>
            </div>
            <div className={styles.inputBlock}>
                <div className={styles.inputWrapper}>
                    <input
                        type="text"
                        className={styles.input}
                        value={value}
                        onChange={(e) => handleInput(e)}
                    />
                    <div className={styles.geoIconWrapper}>
                        <Image src={geoIcon} alt='geo' fill />
                    </div>
                    <div className={styles.inputHint}>Укажите адрес доставки</div>
                    {
                        value !== '' &&
                        <div
                            className={styles.closeIconWrapper}
                            onClick={() => handleResetValue()}
                        >
                            <Image src={closeIcon} alt='close' fill />
                        </div>
                    }
                </div>
                <button className={styles.button}>Привезти сюда</button>
            </div>
            <div className={styles.checkboxBlock}>
                <div className={styles.checkboxBlockTop}>
                    <Checkbox
                        classname={styles.checkbox}
                        checked={isChecked}
                        setChecked={() => setChecked(prev => !prev)}
                    />
                    <p className={styles.checkboxDescription}>Уточнить адрес у получателя </p>
                    <div className={styles.questionIconWrapper}>
                        <Image src={questionIcon} alt='clickme' fill />
                    </div>
                </div>
                <div className={styles.hint}>Укажите только город, куда хотите отправить подарок, остальное узнаем сами</div>
            </div>
            <div className={styles.mapBlock}></div>
        </div>
    )
}