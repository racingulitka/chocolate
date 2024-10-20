import React, { useState, useEffect } from 'react'
import styles from './Collections.module.scss'
import { ProductCard as ProductCardType } from '@/components/ProductCard/ProductCard.typings'
import exampleCardImage from '@/components/HomePage/assets/exampleCardImage.png'
import ProductCard from '@/components/ProductCard/ProductCard'
import Modal from 'react-modal'
import ProductCardModal from '@/components/ProductCardModal/ProductCardModal'
import pencil from './assets/pencil.svg'
import share from './assets/share.svg'
import Image from 'next/image'

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
        borderRadius: '25px',
        zIndex: 52,
    },
    overlay: {
        background: 'rgba(0, 0, 0, 0.61)',
        zIndex: 51,
    }
};

export default function Collections({
    isMobile,
}: {
    isMobile: boolean,
}) {

    const [collection] = useState<ProductCardType[]>([
        {
            id: 1,
            slug: 'strawberryInChocolate8',
            title: 'Упаковка “Клубника в шоколаде”',
            images: [exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage,],
            rating: 4.5,
            reviewsNumber: 124,
            oldPrice: 4400,
            currentPrice: 3300,
            isFavourite: false,
            availableConfirm: new Date('2024-01-01:20:25'),
            type: 'Стереобукеты',
        },
        {
            id: 2,
            slug: 'strawberryInChocolate9',
            title: 'Упаковка “Клубника в шоколаде”',
            images: [exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage,],
            rating: 4.5,
            reviewsNumber: 124,
            oldPrice: 4400,
            currentPrice: 3300,
            isFavourite: false,
            availableConfirm: new Date('2024-01-01:20:25'),
            type: 'Монообукеты',
        },
        {
            id: 3,
            slug: 'strawberryInChocolate10',
            title: 'Упаковка “Клубника в шоколаде”',
            images: [exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage,],
            rating: 4.5,
            reviewsNumber: 124,
            oldPrice: 4400,
            currentPrice: 3300,
            isFavourite: false,
            availableConfirm: new Date('2024-01-01:20:25'),
            type: 'Монообукеты',
        },
        {
            id: 4,
            slug: 'strawberryInChocolate11',
            title: 'Упаковка “Клубника в шоколаде”',
            images: [exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage, exampleCardImage,],
            rating: 4.5,
            reviewsNumber: 124,
            oldPrice: 4400,
            currentPrice: 3300,
            isFavourite: false,
            availableConfirm: new Date('2024-01-01:20:25'),
            type: 'Монообукеты',
        },
    ])

    const [selectedCard, setSelectedCard] = useState<number | null>(null)

    useEffect(() => {
        if (selectedCard) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [selectedCard]);

    return (
        <div className={styles.wrapper}>
            {
                (collection && collection.find(item => item.id === selectedCard) && !isMobile) &&
                <Modal
                    isOpen={!!selectedCard}
                    //onAfterOpen={afterModalOpen}
                    onRequestClose={() => setSelectedCard(null)}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <ProductCardModal isMobile={isMobile} props={collection.find(item => item.id === selectedCard)!} />
                </Modal>
            }
            <div className={styles.leftSide}>
                <div className={styles.city}>
                    Усть каменогорск
                    <div className={styles.pencilContainer}>
                        <Image src={pencil} alt='pencil' fill />
                    </div>
                </div>
                <div className={styles.shareBlock}>
                    Поделиться
                    <div className={styles.shareContainer}>
                        <Image src={share} alt='share' fill />
                    </div>
                </div>
            </div>
            <div className={styles.rightSide}>
                {
                    collection.map(item => {
                        return (
                            <ProductCard
                                key={item.id}
                                isMobile={isMobile}
                                props={item}
                                setSelectedCard={setSelectedCard}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}