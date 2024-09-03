import React from 'react'
import styles from './Checkbox.module.scss'
import cn from 'classnames'
import check from './assets/check.svg'
import Image from 'next/image'

export default function Checkbox({
    classname,
    checked,
    setChecked,
}:{
    classname?:string,
    checked:boolean,
    setChecked:() => void,
}){
    return(
        <div
            className={cn(styles.wrapper, classname)}
            onClick={() => setChecked()}
        >
            <div className={styles.checkContainer}>
                {
                    checked &&
                    <Image src={check} alt='check' layout='fill' />
                }
            </div>
        </div>
    )
}