import React, {useState, useEffect} from 'react'
import styles from './Order.module.scss'
import { CardType } from './Card/Card.typings'
import Card from './Card/Card'
import defaultImage from './Card/assets/defaultImage.png'
import Checkbox from '../Checkbox/Checkbox'

export default function Order() {

    const [cardsArr] = useState<CardType[]>([
        {
            id:1,
            title:'Открытка',
            image:defaultImage,
        },
        {
            id:2,
            title:'Открытка',
            image:defaultImage,
        },
    ])

    const [selectedAddings, setSelectedAddings] = useState<number[]>([])
    const handleAddingsChange = (id:number) =>{
        const isExist = selectedAddings.includes(id)
        if(isExist){
            setSelectedAddings(selectedAddings.filter(item => item !== id))
        } else {
            setSelectedAddings([...selectedAddings, id])
        }
    }

    useEffect(() => {
        console.log(selectedAddings)
    }, [selectedAddings])

    const [isGetYourself, setGetYourself] = useState<boolean>(false)
    const handleGetYourself = () => {
        setGetYourself(prev => !prev)
    }
    
    return (
        <div className={styles.mainWrapper}>
            <div className={styles.wrapper}>
                <div className={styles.leftSide}>
                    <div className={styles.addings}>
                        <div className={styles.addingsTitle}>Люди добавляют к заказу</div>
                        <div className={styles.addingsCards}>
                            {
                                cardsArr.map(item => {
                                    return(
                                        <Card
                                            key={item.id}
                                            props={item}
                                            onChange={handleAddingsChange}
                                            selectedAddings={selectedAddings}
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className={styles.deliveryDetails}>
                        <div className={styles.deliveryTitle}>Детали доставки</div>
                        <div className={styles.deliveryBlock}>
                            <div className={styles.deliveryBlockLeft}>
                                <div className={styles.deliveryBlockLeftTitle}>Адрес</div>
                                <div className={styles.deliveryBlockLeftDescription}>Усть-Каменогорск, узнаем адрес у получателя</div>
                            </div>
                            <div className={styles.deliveryBlockRight}>Редактировать</div>
                        </div>
                        <div className={styles.deliveryBlock}>
                            <div className={styles.deliveryBlockLeft}>
                                <div className={styles.deliveryBlockLeftTitle}>Время</div>
                                <div className={styles.deliveryBlockLeftDescription}>Узнаем у получателя сегодня</div>
                            </div>
                            <div className={styles.deliveryBlockRight}>Редактировать</div>
                        </div>
                    </div>
                    <div className={styles.getter}>
                        <div className={styles.getterTitle}>Получатель</div>
                        <div className={styles.getterCheckBlock}>
                            <Checkbox
                                checked={isGetYourself}
                                setChecked={handleGetYourself}
                            />
                            Я получу заказ
                        </div>
                        <div className={styles.getterCheckBlock}>
                            <Checkbox
                                checked={!isGetYourself}
                                setChecked={handleGetYourself}
                            />
                            Другой получатель
                        </div>
                    </div>
                </div>
                <div className={styles.rightSide}></div>
            </div>
        </div>
    )
}