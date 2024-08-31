import React, { useState, useContext, useRef } from 'react'
import styles from './FooterHeaderSelect.module.scss'
import arrow from './assets/arrow.svg'
import Image from 'next/image'
import { langArr, currencyArr } from './FooterHeaderSelect.config'
import cn from 'classnames'
import activeSelection from './assets/activeSelection.svg'
import inactiveSelection from './assets/inactiveSelection.svg'
import { Props, LangArr, CurrencyArr } from './FooterHeaderSelect.typings'
import i18n from 'i18next';
import { context } from '@/pages/_app'
import useOnClickOutside from '@/utils/useOnClickOutside'
import { Sheet } from 'react-modal-sheet'

export default function FooterHeaderSelect(props: Props) {

    const ref = useRef<HTMLDivElement>(null)
    const sheetRef = useRef<HTMLDivElement>(null)
    const [isOpen, setOpen] = useState<boolean>(false)
    const options: (LangArr | CurrencyArr)[] = props.type === 'currency' ? currencyArr : langArr
    const [activeLanguage, setActiveLanguage] = useState<number>(1)
    const [isSheetOpen, setSheetOpen] = useState<boolean>(false)

    const { currency, setCurrency } = useContext(context);

    const onChange = (id: number) => {
        if (props.type === 'lang') {
            i18n.changeLanguage(langArr.find(item => item.id === id)?.short)
            setActiveLanguage(id)
        } else {
            const newCurrency = currencyArr.find(item => item.id === id)
            if (newCurrency) {
                setCurrency(newCurrency.id)
            }
        }
        //setSheetOpen(false)
    }

    const closeDropdown = () => {
        setOpen(false)
        setSheetOpen(false)
    }

    useOnClickOutside(props.isMobile ? sheetRef : ref, closeDropdown)

    const onClickWrapper = () => {
        if(props.isMobile){
            setSheetOpen(prev => !prev)
        } else{
            setOpen(prev => !prev)
        }
    }

    const renderOptions = () => (
        options.map(item => (
            <div className={styles.listWrapper} key={item.id} onClick={() => onChange(item.id)}>
                <div className={styles.checkWrapper}>
                    {
                        props.type === 'currency' && item.id === currency ||
                        props.type === 'lang' && item.id === activeLanguage ?
                        <Image src={activeSelection} alt='selection icon' layout='fill' />
                        :
                        <Image src={inactiveSelection} alt='selection icon' layout='fill' />
                    }
                </div>
                {
                    props.type === 'lang' && 'icon' in item &&
                    <div className={styles.iconWrapper}>
                        <Image src={item.icon} alt='item icon' layout='fill' />
                    </div>
                }
                <p className={styles.title}>{item.title}</p>
            </div>
        ))
    )

    return (
        <div
            ref={ref}
            className={styles.wrapper}
            onClick={() => onClickWrapper()}
        >
            <div className={styles.value}>
                {
                    props.type === 'currency' ?
                        <div className={styles.currentValueText}>{currencyArr.find(item => item.id === currency)?.title}</div>
                        :
                        <div className={styles.currentImageContainer}>
                            <Image src={langArr.find(item => item.id === activeLanguage)?.icon} alt='icon' layout='fill' />
                        </div>
                }
                {
                    isOpen &&
                    <div className={cn(styles.selectList, props.position === 'footer' ? styles.selectListFooter : styles.selectListHeader)}>
                        {
                            renderOptions()
                        }
                    </div>
                }
                {
                    <Sheet
                    isOpen={isSheetOpen}
                    onClose={() => setSheetOpen(false)}
                    detent='content-height'
                    >
                        <Sheet.Container ref={sheetRef}>
                        <Sheet.Header>
                        </Sheet.Header>
                        <div className={styles.selectList}>
                        {
                            renderOptions()
                        }
                    </div>
                        </Sheet.Container>
                    </Sheet>
                }
            </div>
            <div className={cn(styles.arrowContainer, isOpen && styles.arrowContainerActive)}>
                <Image src={arrow} alt='arrow' layout='fill' />
            </div>
        </div>
    )
}