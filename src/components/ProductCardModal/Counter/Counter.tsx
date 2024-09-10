import React from 'react'
import styles from './Counter.module.scss'
import cn from 'classnames'

export default function Counter({
    size,
    value,
    onChange,
}:{
    size:130 | 100,
    value:number,
    onChange:(operator:boolean) => void,
}){

    const height = size === 130 ? 50 : 35
    const fontSizeValue = size === 130 ? 20 : 14
    const fontSizeOperator = size === 130 ? 24 : 20

    return(
        <div className={styles.wrapper} style={{width:`${size}px`, height:`${height}px`}}>
            <div className={cn(styles.operator, value <= 1 && styles.operatorInactive)} style={{fontSize:`${fontSizeOperator}px`}} onClick={() => onChange(false)}>-</div>
            <div className={styles.value} style={{fontSize:`${fontSizeValue}px`}}>{value}</div>
            <div className={cn(styles.operator, value >=100 && styles.operatorInactive)} style={{fontSize:`${fontSizeOperator}px`}} onClick={() => onChange(true)}>+</div>
        </div>
    )
}