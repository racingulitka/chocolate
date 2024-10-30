import React from 'react'
import styles from '../CartCounter.module.scss'

export default function Plus({
    stroke,
    onPush,
}:{
    stroke:string,
    onPush:(operator:boolean) => void,
}) {
    return (
        <svg onClick={() => onPush(true)} className={styles.operator} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="plus-svgrepo-com 1">
                <path id="Vector" d="M6 12H18M12 6V18" stroke={stroke} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </g>
        </svg>
    )
}