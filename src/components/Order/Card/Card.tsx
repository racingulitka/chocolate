import React, {useState, useEffect} from 'react'
import styles from './Card.module.scss'
import { CardType } from './Card.typings'
import Image from 'next/image'
import Checkbox from '@/components/Checkbox/Checkbox'

export default function Card({
    props,
    onChange,
    selectedAddings,
}:{
    props:CardType,
    onChange:(id:number) => void,
    selectedAddings:number[]
}){

    const [isChecked, setChecked] = useState<boolean>(false)

    useEffect(() => {
        setChecked(selectedAddings.includes(props.id))
    }, [selectedAddings])

    const onCheck = () => {
        onChange(props.id)
    }

    return(
        <div className={styles.wrapper} onClick={() => onCheck()}>
            <div className={styles.imageContainer}>
                <Image src={props.image} alt='image' fill />
            </div>
            <div className={styles.info}>
                <div className={styles.title}>{props.title}</div>
                <div className={styles.bottomBlock}>
                    {
                        props.price ?
                        <span>{props.price}</span>
                        :
                        <span>Бесплатно</span>
                    }
                    <Checkbox
                        checked={isChecked}
                        setChecked={() => onCheck()}
                    />
                </div>
            </div>
        </div>
    )
}