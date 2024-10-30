import React, { useState, useContext, useEffect } from 'react'
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
import creditCardIcon from './assets/creditCardIcon.svg'
import lockIcon from './assets/lockIcon.svg'
import { formatCreditCardNumber } from '@/utils/formatCreditCardNumber'
import { formatCreditCardExpDate } from '@/utils/formatCreditCardExpDate'
import { formatOnlyDigits } from '@/utils/formatOnlyDigits'
import { GoodsArr } from '../HomePage/GoodsArea/GoodsArea.typings' //temporary
import { goodsArr } from '@/pages'
import CartItem from './CartItem/CartItem'
import { ProductCard } from '../ProductCard/ProductCard.typings'
import cn from 'classnames'
import { context } from '@/pages/_app'
import { CurrencyArr } from '@/components/FooterHeaderSelect/FooterHeaderSelect.typings'
import { currencyArr } from '@/components/FooterHeaderSelect/FooterHeaderSelect.config'
import questionIcon from './assets/questionIcon.svg'
import bonusIcon from './assets/bonusIcon.svg'

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

export default function Order({
    changeScreen,
}:{
    changeScreen:(id:number) => void,
}) {

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

    const [forTime, setForTime] = useState<Date>(new Date())

    const [creditCardData, setCreditCardData] = useState({
        number: '',
        holder: '',
        expDate: '',
        cvv: '',
    })

    const handleCardDataChange = (type: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const data = e.target.value;
        switch (type) {
            case 'number': {
                setCreditCardData((prevData) => ({
                    ...prevData,
                    number: formatCreditCardNumber(data)
                }));
                break
            }
            case 'holder': {
                setCreditCardData((prevData) => ({
                    ...prevData,
                    holder: data.toUpperCase()
                }))
                break
            }
            case 'expDate': {
                setCreditCardData((prevData) => ({
                    ...prevData,
                    expDate: formatCreditCardExpDate(data)
                }))
                break
            }
            case 'cvv': {
                setCreditCardData((prevData) => ({
                    ...prevData,
                    cvv: formatOnlyDigits(data)
                }))
                break
            }
        }
    }

    const [isCardRemember, setCardRemember] = useState<boolean>(false)
    const handleCardRemember = () => {
        setCardRemember(prev => !prev)
    }

    const cardFillExample = goodsArr.filter(item => item.id === 1)[0].goodsCard.filter(item => item.id === 1 || item.id === 2 || item.id === 3 || item.id === 4)
    const [cartFill, setCartFill] = useState<{ good: ProductCard, value: number }[]>([
        {
            good: cardFillExample[0],
            value: 1,
        },
        {
            good: cardFillExample[1],
            value: 1
        },
        {
            good: cardFillExample[2],
            value: 1
        },
        {
            good: cardFillExample[3],
            value: 1
        },
    ])

    const handleChangeCartValue = (index: number, operator: boolean) => {
        setCartFill((prev) =>
            prev.map((item, i) =>
                i === index
                    ? { ...item, value: operator ? item.value + 1 : Math.max(1, item.value - 1) } // Увеличивает или уменьшает значение, но не меньше 1
                    : item
            )
        );
    }

    const { currency, setCurrency } = useContext(context);
    const [poditog, setPoditog] = useState<number>(0)
    useEffect(() => {
        setPoditog(cartFill.reduce((acc, current) => {
            return acc + current.good.currentPrice * current.value
        }, 0))
    }, [cartFill])

    const [deliveryCost, setDeliveryCost] = useState<number>(0)
    const [taxChocolate, setTaxChocolate] = useState<number>(0)


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
                <DeliveryTime
                    forTime={forTime}
                    setForTime={setForTime}
                />
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
                            selectedAddings.some(item => item === 1) &&
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
                    <div className={styles.payWith}>
                        <div className={styles.payWithTitle}>Оплатить с помощью</div>
                        <div className={styles.creditCard}>
                            <div className={styles.creditCardImageContainer}>
                                <Image src={creditCardIcon} alt='icon' fill />
                            </div>
                            <div className={styles.creditCardText}>Кредитная или дебетовая карта</div>
                        </div>
                        <div className={styles.creditCardInfo}>
                            <div className={styles.cardNumber}>
                                <input
                                    type="text"
                                    className={styles.cardNumberInput}
                                    value={creditCardData.number}
                                    onChange={(e) => handleCardDataChange('number', e)}
                                    maxLength={19}
                                    placeholder='0000 0000 0000 0000'
                                />
                                <div className={cn(styles.cardNumberTooltip, creditCardData.number && styles.cardNumberTooltipFill)}>
                                    Номер карты
                                    <div className={styles.lockIconContainer}>
                                        <Image src={lockIcon} alt='icon' fill />
                                    </div>
                                </div>
                            </div>
                            <div className={styles.cardHolder}>
                                <input
                                    type="text"
                                    className={styles.cardHolderInput}
                                    value={creditCardData.holder}
                                    onChange={(e) => handleCardDataChange('holder', e)}
                                    maxLength={30}
                                    placeholder='ALEXANDER PUSHKIN'
                                />
                                <div className={cn(styles.cardHolderTooltip, creditCardData.holder && styles.cardHolderTooltipFill)}>
                                    Имя владельца
                                </div>
                            </div>
                            <div className={styles.bottomInputsBlock}>
                                <div className={styles.cardExpDate}>
                                    <input
                                        type="text"
                                        className={styles.cardExpDateInput}
                                        value={creditCardData.expDate}
                                        onChange={(e) => handleCardDataChange('expDate', e)}
                                        maxLength={7}
                                        placeholder='ММ / ГГ'
                                    />
                                    <div className={cn(styles.cardExpDateTooltip, creditCardData.expDate && styles.cardExpDateTooltipFill)}>
                                        Срок действия
                                    </div>
                                </div>
                                <div className={styles.cardCvv}>
                                    <input
                                        type="text"
                                        className={styles.cardCvvInput}
                                        value={creditCardData.cvv}
                                        onChange={(e) => handleCardDataChange('cvv', e)}
                                        maxLength={3}
                                        placeholder='000'
                                    />
                                    <div className={cn(styles.cardCvvTooltip, creditCardData.cvv && styles.cardCvvTooltipFill)}>
                                        СVV/CVC
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.rememberCard}>
                            <Checkbox
                                checked={isCardRemember}
                                setChecked={() => handleCardRemember()}
                            />
                            Запомнить карту для следующих покупок
                        </div>
                    </div>
                    <div className={styles.freeOrderCancel}>
                        <div className={styles.freeOrderCancelTitle}>Бесплатная отмена заказа</div>
                        <div className={styles.freeOrderCancelText}>
                            <span>2200 ₸</span> На вашей карте будут заморожены и спишутся только после доставки. Вы можете отменить заказ в любое время, пока курьер не назначен на доставку, ― вам вернутся 100% стоимости.
                        </div>
                    </div>
                    <button className={styles.complete} onClick={() => changeScreen(2)}>Complete</button>
                </div>
                <div className={styles.rightContainer}>
                    <div className={styles.rightSide}>
                        <div className={styles.goodsArea}>
                            {
                                cartFill.map((item, index) => {
                                    return (
                                        <CartItem
                                            data={item.good}
                                            value={item.value}
                                            key={index}
                                            index={index}
                                            onChange={handleChangeCartValue}
                                        />
                                    )
                                })
                            }
                        </div>
                        <div className={styles.promoBlock}>Промокод или карта лояльности</div>
                        <div className={styles.detailsBlock}>
                            <div className={styles.detailsBlockTitle}>Детали цены</div>
                            <div className={styles.preSumm}>
                                <div className={styles.preSummTitle}>Подытог</div>
                                <div className={styles.preSummValue}>
                                    {poditog} <span>{currencyArr.find(item => item.id === currency)?.title || 'USD'}</span>
                                </div>
                            </div>
                            <div className={styles.taxChocolate}>
                                <div className={styles.taxChocolateTitleBlock}>
                                    Сбор “В шоколаде”
                                    <div className={styles.questionIconContainer}>
                                        <Image src={questionIcon} alt='icon' fill />
                                    </div>
                                </div>
                                <div className={styles.taxChocolateValue}>0 <span>{currencyArr.find(item => item.id === currency)?.title || 'USD'}</span></div>
                            </div>
                            <div className={styles.deliveryBlock}>
                                <div className={styles.deliveryTitle}>Доставка</div>
                                <div className={styles.deliveryCost}>Уточним</div>
                            </div>
                            <div className={styles.total}>
                                <div className={styles.totalTitle}>Итого</div>
                                <div className={styles.totalValue}>{poditog + taxChocolate + deliveryCost} <span>{currencyArr.find(item => item.id === currency)?.title || 'USD'}</span></div>
                            </div>
                        </div>
                        <div className={styles.bonus}>
                            <div className={styles.bonusTitle}>Вы получите бонусов</div>
                            <div className={styles.bonusValueBlock}>
                                <div className={styles.bonusIcon}>
                                    <Image src={bonusIcon} alt='bonus' fill />
                                </div>
                                <div className={styles.bonusValue}>66</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}