import React, { useState, useEffect } from 'react'
import styles from './Order.module.scss'
import { CardType } from './Card/Card.typings'
import Card from './Card/Card'
import defaultImage from './Card/assets/defaultImage.png'
import Checkbox from '../Checkbox/Checkbox'
import edit from './assets/edit.svg'
import Image from 'next/image'
import Modal from 'react-modal'
import MapModal from '../Header/components/MapModal/MapModal'
import DeliveryTime from './DeliveryTime/DeliveryTime'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: 'none',
        padding: 0,
        background: 'transparent',
    },
    overlay: {
        background: 'rgba(0, 0, 0, 0.61)',
        zIndex: 100,
    }
};

export default function Order() {

    const [cardsArr] = useState<CardType[]>([
        {
            id: 1,
            title: 'Открытка',
            image: defaultImage,
        },
        {
            id: 2,
            title: 'Открытка',
            image: defaultImage,
        },
    ])

    const [selectedAddings, setSelectedAddings] = useState<number[]>([])
    const handleAddingsChange = (id: number) => {
        const isExist = selectedAddings.includes(id)
        if (isExist) {
            setSelectedAddings(selectedAddings.filter(item => item !== id))
        } else {
            setSelectedAddings([...selectedAddings, id])
        }
    }

    useEffect(() => {
        console.log(selectedAddings)
    }, [selectedAddings])

    const [isGetYourself, setGetYourself] = useState<boolean>(false)
    const handleGetYourself = () => {
        setGetYourself(prev => !prev)
    }

    const [addingsText, setAddingsText] = useState<string>('')
    const handleAddingsText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setAddingsText(e.currentTarget.value)
    }

    const [isMapModal, setMapModal] = useState<boolean>(false)
    const openMapModal = () => {
        setMapModal(true)
        document.body.style.overflow = 'hidden';
    }

    const closeMapModal = () => {
        setMapModal(false)
        document.body.style.overflow = 'unset'
    }

    const afterMapModalOpen = () => {
        console.log('modal open')
    }

    const [isDelTimeModal, setDelTimeModal] = useState<boolean>(false)
    const openDelTimeModal = () => {
        setDelTimeModal(true)
        document.body.style.overflow = 'hidden';
    }

    const closeDelTimeModal = () => {
        setDelTimeModal(false)
        document.body.style.overflow = 'unset'
    }

    const afterDelTimeModalOpen = () => {
        console.log('modal open')
    }

    return (
        <div className={styles.mainWrapper}>
            <Modal
                isOpen={isMapModal}
                onAfterOpen={afterMapModalOpen}
                onRequestClose={closeMapModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <MapModal />
            </Modal>
            <Modal
                isOpen={isDelTimeModal}
                onAfterOpen={afterDelTimeModalOpen}
                onRequestClose={closeDelTimeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <DeliveryTime />
            </Modal>
            <div className={styles.wrapper}>
                <div className={styles.leftSide}>
                    <div className={styles.addings}>
                        <div className={styles.addingsTitle}>Люди добавляют к заказу</div>
                        <div className={styles.addingsCards}>
                            {
                                cardsArr.map(item => {
                                    return (
                                        <Card
                                            key={item.id}
                                            props={item}
                                            onChange={handleAddingsChange}
                                            selectedAddings={selectedAddings}
                                        />
                                    )
                                })
                            }
                        </div>
                        {
                            selectedAddings.length > 0 &&
                            <div className={styles.addingsTextBlock}>
                                <div className={styles.textHeader}>
                                    <div className={styles.textHeaderTitle}>Напишите текст открытки</div>
                                    <div className={styles.textHeaderRightBlock}>
                                        <div className={styles.signs}>
                                            {addingsText.length}/400
                                        </div>
                                        <div className={styles.editContainer}>
                                            <Image src={edit} alt='edit' fill />
                                        </div>
                                    </div>
                                </div>
                                <textarea
                                    className={styles.addingsTextInput}
                                    placeholder='Текст открытки'
                                    maxLength={400}
                                    value={addingsText}
                                    onChange={(e) => handleAddingsText(e)}
                                />
                            </div>
                        }
                    </div>
                    <div className={styles.deliveryDetails}>
                        <div className={styles.deliveryTitle}>Детали доставки</div>
                        <div className={styles.deliveryBlock}>
                            <div className={styles.deliveryBlockLeft}>
                                <div className={styles.deliveryBlockLeftTitle}>Адрес</div>
                                <div className={styles.deliveryBlockLeftDescription}>Усть-Каменогорск, узнаем адрес у получателя</div>
                            </div>
                            <div
                                className={styles.deliveryBlockRight}
                                onClick={() => openMapModal()}
                            >
                                Редактировать
                            </div>
                        </div>
                        <div className={styles.deliveryBlock}>
                            <div className={styles.deliveryBlockLeft}>
                                <div className={styles.deliveryBlockLeftTitle}>Время</div>
                                <div className={styles.deliveryBlockLeftDescription}>Узнаем у получателя сегодня</div>
                            </div>
                            <div
                                className={styles.deliveryBlockRight}
                                onClick={() => openDelTimeModal()}
                            >
                                Редактировать
                            </div>
                        </div>
                    </div>
                    <div className={styles.getter}>
                        <div className={styles.getterTitle}>Получатель</div>
                        <div className={styles.getterCheckBlock}>
                            <Checkbox
                                checked={isGetYourself}
                                setChecked={handleGetYourself}
                            />
                            Я получу заказ
                        </div>
                        <div className={styles.getterCheckBlock}>
                            <Checkbox
                                checked={!isGetYourself}
                                setChecked={handleGetYourself}
                            />
                            Другой получатель
                        </div>
                    </div>
                </div>
                <div className={styles.rightSide}></div>
            </div>
        </div>
    )
}