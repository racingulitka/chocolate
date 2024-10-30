import React, { useState, useEffect } from 'react'
import styles from './CompleteOrder.module.scss'
import Image from 'next/image'
import checkIcon from './assets/checkIcon.svg'
import { orderStages } from './CompleteOrder.config'
import cn from 'classnames'
import OrderStore from './screens/OrderStore/OrderStore'
import OrderGot from './screens/OrderGot/OrderGot'
import OrderPhoto from './screens/OrderPhoto/OrderPhoto'
import OrderDelivery from './screens/OrderDelivery/OrderDelivery'
import NewEventScreen from '../Header/components/AccountMenu/components/MyEvents/NewEventScreen/NewEventScreen';
import { OrderInfo } from './CompleteOrder.typings'
import defaultPhoto from '../HomePage/assets/exampleCardImage.png'

export default function CompleteOrder() {

    const [orderInfo] = useState<OrderInfo>({
        items:['Упаковка “Клубника в шоколаде”'],
        deliveryCost:0,
        to:'Получу сам (-а)',
        when:'Сегодня, время согласовано',
        address:'Усть-Каменогорск, ул. Пушкина, д.4',
        photo:defaultPhoto,
    })

    const stages = [
        {
            id:2,
            component:<OrderGot orderInfo={orderInfo} />
        },
        {
            id:3,
            component:<OrderStore orderInfo={orderInfo} />
        },
        {
            id:4,
            component:<OrderPhoto orderInfo={orderInfo} />
        },
        {
            id:4,
            component:<OrderDelivery orderInfo={orderInfo} />
        },
    ]

    const [activeStage, setActiveStage] = useState<number>(4)
    const [activeScreen, setActiveScreen] = useState<React.ReactNode>(stages[activeStage - 1].component)
    useEffect(() => {
        setActiveScreen(stages[activeStage-1].component)
    }, [activeStage])

    return (
        <div className={styles.wrapper}>
            <div className={styles.mainRectangle}>
                <div className={styles.header}>
                    <div className={styles.order}>
                        <div className={styles.checkIconContainer}>
                            <Image src={checkIcon} alt='icon' fill />
                        </div>
                        <div className={styles.info}>
                            <div className={styles.orderTitle}>Оформление заказа</div>
                            <div className={styles.orderNumber}>№ 11234214</div>
                        </div>
                    </div>
                    {
                        orderStages.map(item => {
                            return (
                                <React.Fragment key={item.id}>
                                    <div className={cn(styles.line, activeStage < item.id && styles.lineUncomplete)}></div>
                                    <div className={styles.stage}>
                                        <div className={styles.iconContainer}>
                                            <item.icon isActive={activeStage >= item.id}/>
                                        </div>
                                        <div className={cn(styles.stageTitle, activeStage < item.id && styles.stageTitleUnactive)}>{item.title}</div>
                                    </div>
                                </React.Fragment>
                            )
                        })
                    }
                </div>
                <div className={styles.screen}>
                    {activeScreen}
                </div>
            </div>
        </div >
    )
}