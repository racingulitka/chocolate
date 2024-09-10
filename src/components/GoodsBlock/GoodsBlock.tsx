import React, { useState, useEffect } from 'react'
import styles from './GoodsBlock.module.scss'
import { GoodsArr } from '../HomePage/GoodsArea/GoodsArea.typings'
import ProductCard from '../ProductCard/ProductCard'
import arrow from './assets/arrow.svg'
import Image from 'next/image'
import Modal from 'react-modal'
import ProductCardModal from '../ProductCardModal/ProductCardModal'

export default function GoodsBlock({
    props,
    isMobile,
}: {
    props: GoodsArr,
    isMobile: boolean,
}) {

    const [isOpen, setOpen] = useState<boolean>(false)
    const [showMoreRate, setShowMoreRate] = useState<number>(1)
    const arrLength = props.goodsCard.length
    const [selectedCard, setSelectedCard] = useState<number | null>(null)

    const handleShowMore = () => {
        setShowMoreRate(prev => ++prev)
    }

    const handleSeeAll = () => {
        setOpen(true)
    }

    useEffect(() => {
        if (selectedCard) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'unset';
        }
      }, [selectedCard]);

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
            borderRadius:'25px',
            zIndex:52,
        },
        overlay: {
            background: 'rgba(0, 0, 0, 0.61)',
            zIndex:51,
        }
    };

    return (
        <div className={styles.wrapper}>
            {
                selectedCard && props.goodsCard.find(item => item.id === selectedCard) &&
                <Modal
                    isOpen={!!selectedCard}
                    //onAfterOpen={afterModalOpen}
                    onRequestClose={() => setSelectedCard(null)}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <ProductCardModal props={props.goodsCard.find(item => item.id === selectedCard)!} />
                </Modal>
            }
            <div className={styles.titleBlock}>
                {props.title}
                {
                    props.isSeeAll && !isMobile && !isOpen &&
                    <div
                        className={styles.seeAllButton}
                        onClick={() => handleSeeAll()}
                    >
                        Смотреть все
                        <div className={styles.arrowContainer}>
                            <Image src={arrow} alt='see all' fill />
                        </div>
                    </div>
                }
            </div>
            <div className={styles.cardsBlock}>
                {
                    props.goodsCard.map((card, index) => {
                        if (isOpen) {
                            return (
                                <ProductCard key={card.id} props={card} setSelectedCard={setSelectedCard} />
                            )
                        } else if (index < showMoreRate * 6) {
                            return (
                                <ProductCard key={card.id} props={card} setSelectedCard={setSelectedCard} />
                            )
                        }
                    })
                }
                {
                    !props.isSeeAll && arrLength > showMoreRate * 6 &&
                    <div
                        className={styles.showMore}
                        onClick={() => handleShowMore()}
                    >
                        Показать еще
                    </div>
                }
                {
                    props.isSeeAll && isMobile && !isOpen &&
                    <div
                        className={styles.seeAllButton}
                        onClick={() => handleSeeAll()}
                    >
                        Смотреть все
                        <div className={styles.arrowContainer}>
                            <Image src={arrow} alt='see all' fill />
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}