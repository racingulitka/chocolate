import React from 'react'
import styles from '../ProductCardModal.module.scss'

export default function HeartIcon({
    isFavourite,
}:{
    isFavourite:boolean,
}) {

    const fillColor = isFavourite ? 'red' : 'transparent'

    return (
        <svg width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.heartIcon}>
            <g id="Frame 68">
                <path id="Vector" d="M8.38976 3.28549L8.75 3.65977L9.11025 3.28549C10.9509 1.37305 12.9155 1.17911 14.3936 1.85476C15.9033 2.54483 17 4.1802 17 6.12067C17 8.09214 16.1912 9.60954 15.0458 10.8992C14.1055 11.9582 12.9655 12.8369 11.8671 13.6836C11.6077 13.8836 11.3506 14.0817 11.099 14.2801C10.6401 14.6418 10.2211 14.9672 9.81443 15.2048C9.40758 15.4426 9.06057 15.5632 8.75 15.5632C8.43943 15.5632 8.09242 15.4426 7.68557 15.2048C7.27889 14.9672 6.8599 14.6418 6.40106 14.2801C6.14945 14.0817 5.89234 13.8835 5.63291 13.6836C4.53451 12.8369 3.39456 11.9582 2.45417 10.8992C1.30882 9.60954 0.5 8.09214 0.5 6.12067C0.5 4.1802 1.59671 2.54483 3.10635 1.85476C4.58448 1.17911 6.54904 1.37305 8.38976 3.28549Z" stroke="#5898E4" fill={fillColor} />
            </g>
        </svg>
    )
}