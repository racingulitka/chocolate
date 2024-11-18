import React, { useState } from 'react'
import styles from './AddEvent.module.scss'
import cross from './assets/cross.svg'
import Image from 'next/image'
import { inputArr } from './AddEvent.config'
import cn from 'classnames'
import { phoneMask } from '@/utils/phoneMask'
import { EventType } from '../MyEvents.typings'
import { Inputs, ModalType } from './AddEvent.typings'
import { Event } from '../MyEvents.typings'
import arrowLeft from '../assets/arrowLeft.svg'

export default function AddEvent({
    onClose,
    selectedDate,
    modalType,
    selectedEvent,
    isMobile,
}: {
    onClose: () => void,
    selectedDate: Date | null,
    modalType: ModalType | null,
    selectedEvent: Event | null,
    isMobile: boolean,
}) {

    const getSelectedDate = (date: Date | null) => {
        if (date === null) {
            return ''
        } else {
            const add = date.getMonth() < 9 ? '0' : ''
            return `${date.getDate()}/${add}${date.getMonth() + 1}`
        }
    }

    const [isSelectOpen, setSelectOpen] = useState<boolean>(false)
    const [inputValues, setInputValues] = useState<Inputs>(
        {
            type: selectedEvent ? selectedEvent.type : null,
            date: selectedEvent ? getSelectedDate(selectedEvent.date) : getSelectedDate(selectedDate),
            person: selectedEvent ? selectedEvent.person : '',
            phone: selectedEvent ? selectedEvent.phone : '',
            city: selectedEvent ? selectedEvent.city : '',
            address: selectedEvent ? selectedEvent.address : ''
        }
    )

    const handleInputClick = (id: number) => {
        if (id === 1) {
            setSelectOpen(true)
        }
    }

    const handleSelect = (type: EventType, e: React.MouseEvent) => {
        e.stopPropagation()
        setInputValues(prev => ({ ...prev, type }))
        setSelectOpen(false)
    }

    const maskDateInput = (value: string) => {
        // Удаляем все символы, кроме цифр
        let sanitizedValue = value.replace(/\D/g, '');

        // Если длина строки меньше или равна 2, это день
        if (sanitizedValue.length <= 2) {
            return sanitizedValue;
        }

        // Если длина больше 2, разделяем на день и месяц
        let day = sanitizedValue.slice(0, 2);
        let month = sanitizedValue.slice(2, 4);

        // Проверяем корректность дня (не больше 31)
        if (parseInt(day) > 31) {
            day = '31';
        }

        // Проверяем корректность месяца (не больше 12)
        if (month && parseInt(month) > 12) {
            month = '12';
        }

        // Возвращаем строку в формате "ДД/ММ", если месяц уже введен
        return month ? `${day}/${month}` : day;
    };

    const handleInputDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const maskedValue = maskDateInput(e.target.value);
        setInputValues(prev => ({ ...prev, date: maskedValue }));
    }

    const getValue = (id: number) => {
        switch (id) {
            case 1: {
                return inputValues.type ?? ''
                break
            }
            case 2: {
                return inputValues.date
                break
            }
            case 3: {
                return inputValues.person
                break
            }
            case 4: {
                return inputValues.phone
                break
            }
            case 5: {
                return inputValues.city
                break
            }
            case 6: {
                return inputValues.address
                break
            }
        }
    }

    const handleChange = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
        switch (id) {
            case 2: {
                handleInputDate(e)
                break
            }
            case 3: {
                setInputValues(prev => ({ ...prev, person: e.target.value }))
                break
            }
            case 4: {
                setInputValues(prev => ({ ...prev, phone: phoneMask(e.target.value) }))
                break
            }
            case 5: {
                setInputValues(prev => ({ ...prev, city: e.target.value }))
                break
            }
            case 6: {
                setInputValues(prev => ({ ...prev, address: e.target.value }))
                break
            }
        }
    }

    const handleSave = () => {
        console.log('save')
        onClose()
    }

    const handleDelete = () => {
        console.log('delete')
        onClose()
    }

    return (
        <div className={styles.wrapper}>
            {
                !isMobile &&
                <div className={styles.exitContainer} onClick={() => onClose()}>
                    <Image src={cross} alt='exit' fill />
                </div>
            }
            {
                !isMobile &&
                <div className={styles.title}>Ваше событие</div>

            }
            {
                isMobile &&
                <div className={styles.mobileNav}>
                    Информация о событии
                    <div
                        className={styles.arrowContainer}
                        onClick={() => onClose()}
                    >
                        <Image src={arrowLeft} alt='arrow' fill />
                    </div>
                </div>
            }
            <div className={styles.inputBlocks}>
                {
                    inputArr.map(item => {
                        return (
                            <div className={styles.inputWrapper} key={item.id} onClick={() => handleInputClick(item.id)}>
                                <div className={styles.text}>{item.text}</div>
                                <input
                                    type="text"
                                    className={cn(styles.input, item.text && styles.inputWithText)}
                                    placeholder={item.placeholder ?? ''}
                                    value={String(getValue(item.id))}
                                    onChange={(e) => handleChange(item.id, e)}
                                />
                                {
                                    isSelectOpen && item.id === 1 &&
                                    <div className={styles.selects}>
                                        {
                                            Object.entries(EventType).map((item, index) => {
                                                return (
                                                    <div
                                                        className={styles.select}
                                                        key={index}
                                                        onClick={(e) => handleSelect(item[1], e)}
                                                    >
                                                        {item[1]}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                }
                            </div>
                        )
                    })
                }
            </div>
            <div className={styles.buttonBlock}>
                <button className={styles.save} onClick={() => handleSave()}>
                    Сохранить
                </button>
                {
                    modalType === ModalType.edit &&
                    <button className={cn(styles.save, styles.saveDelete)} onClick={() => handleDelete()}>
                        Удалить
                    </button>
                }
            </div>
        </div>
    )
}