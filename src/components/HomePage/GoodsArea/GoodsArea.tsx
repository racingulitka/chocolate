import React from 'react'
import styles from './GoodsArea.module.scss'
import { GoodsArr } from './GoodsArea.typings'
import GoodsBlock from '@/components/GoodsBlock/GoodsBlock'

export default function GoodsArea({
    goodsArr,
    isMobile,
}:{
    goodsArr:GoodsArr[],
    isMobile:boolean,
}){
    return(
        <div className={styles.mainWrapper}>
            {
                goodsArr.map(item => {
                    return(
                        <GoodsBlock key={item.id} props={item} isMobile={isMobile}/>
                    )
                })
            }
        </div>
    )
}