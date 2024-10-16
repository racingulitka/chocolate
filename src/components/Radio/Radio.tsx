import React from 'react'
import styles from './Radio.module.scss'
import cn from 'classnames'

export default function Radio({
    isToggled,
}:{
    isToggled:boolean,
}){
    return(
        <div className={cn(styles.wrapper, isToggled && styles.wrapperActive)}>
            <div className={cn(styles.flag, isToggled && styles.flagActive)}></div>
        </div>
    )
}