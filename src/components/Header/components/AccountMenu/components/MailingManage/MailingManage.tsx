import React, {useState} from 'react'
import styles from './MailingManage.module.scss'
import { mailingManageArr } from './MailingManage.config'
import Radio from '@/components/Radio/Radio'

interface RadioState{
    [key:number]:{
        [key:number]:boolean
    }
}

export default function MailingManage(){

    const [radioState, setRadioState] = useState<RadioState>({
        1:{
            1:false,
            2:false,
            3:false,
        },
        2:{
            1:false,
            2:false,
            3:false,
        },
        3:{
            1:false,
            2:false,
        },
        4:{
            1:false,
            2:false,
        },
        5:{
            1:false,
            2:false,
        },
        6:{
            1:false,
        },
        7:{
            1:false,
        },
        8:{
            1:false,
            2:false,
        },
        9:{
            1:false,
        },
        10:{
            1:false,
            2:false,
        },
        11:{
            1:false,
            2:false,
        },
    })

    const handleSwitch = (categoryId:number, subcategoryId:number) => {
        const newState = {...radioState}
        newState[categoryId][subcategoryId] = newState[categoryId][subcategoryId] ? false : true
        setRadioState(newState)
    }

    return(
        <div className={styles.wrapper}>
            <div className={styles.title}>
            Настройки электронной рассылки
            </div>
            <div className={styles.subtitle}>
            Вы можете выбрать, какие рассылки хотите получать.<br></br>Просто нажмите на переключатель напротив.
            </div>
            <div className={styles.categoriesBlock}>
                {
                    mailingManageArr.map(item => {
                        return(
                            <div className={styles.categoryBlock} key={item.id}>
                                <div className={styles.categoryTitle}>{item.title}</div>
                                <div className={styles.categoryDescription}>{item.description}</div>
                                {
                                    item.flags.map(subItem => {
                                        return(
                                            <div className={styles.radioBlock} key={subItem.id}>
                                                {subItem.title}
                                                <div className={styles.radioWrapper} onClick={() => handleSwitch(item.id, subItem.id)}>
                                                    <Radio isToggled={radioState[item.id][subItem.id]} />
                                                    {radioState[item.id][subItem.id] ? 'Подписан(а)' : 'Вы отписаны'}
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}