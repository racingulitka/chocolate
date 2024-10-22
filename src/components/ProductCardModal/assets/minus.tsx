import React from 'react'
import styles from '../Counter/Counter.module.scss'

export default function Minus({
    stroke,
    onPush,
}:{
    stroke:string,
    onPush:(operator:boolean) => void,
}) {
    return (
        <svg onClick={() => onPush(false)} className={styles.operator} width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="minus-svgrepo-com 1">
                <path id="Vector" d="M6 12H18" stroke={stroke} stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
            </g>
        </svg>
    )
}
