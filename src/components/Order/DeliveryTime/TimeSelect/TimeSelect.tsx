import React, { useState } from 'react'
import styles from './TimeSelect.module.scss'
import arrow from './assets/arrow.svg'
import Image from 'next/image'
import { timeIntervals } from '../DeliveryTime.config'

export default function TimeSelect({
    selectedTime,
    setSelectedTime,
}: {
    selectedTime: number,
    setSelectedTime: React.Dispatch<React.SetStateAction<number>>,
}) {

    const [isOpen, setOpen] = useState<boolean>(false)

    const handleOpenClose = () => {
        setOpen(prev => !prev)
    }

    const handleSelect = (id: number, e: React.MouseEvent) => {
        e.stopPropagation()
        setSelectedTime(id)
        setOpen(false)
    }

    return (
        <div
            className={styles.wrapper}
            onClick={() => handleOpenClose()}
        >
            {timeIntervals.find(item => item.id === selectedTime)?.title}
            <div className={styles.arrowContainer}>
                <Image src={arrow} alt='arrow' fill />
            </div>
            {
                isOpen &&
                <div className={styles.options}>
                    {
                        timeIntervals.map(item => {
                            return (
                                <div
                                    className={styles.option}
                                    key={item.id}
                                    onClick={(e) => handleSelect(item.id, e)}
                                >
                                    {item.title}
                                </div>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}