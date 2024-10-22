import React from 'react'
import styles from './Counter.module.scss'
import Plus from '../assets/plus'
import Minus from '../assets/minus'

export default function Counter({
    value,
    onChange,
}:{
    value:number,
    onChange:(operator:boolean) => void,
}){

    return(
        <div className={styles.wrapper}>
            <Minus stroke={value <= 1 ? '#AAA' : '#111'} onPush={onChange}/>
            <div className={styles.value}>{value}</div>
            <Plus stroke={value >=100 ? '#AAA' : '#111'} onPush={onChange} />
        </div>
    )
}