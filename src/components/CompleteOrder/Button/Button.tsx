import React from 'react'
import styles from './Button.module.scss'

export default function Button({
    title,
    func,
}:{
    title:string,
    func:() => void,
}){
    return(
        <button className={styles.wrapper} onClick={() => func()}>
            {title}
        </button>
    )
}