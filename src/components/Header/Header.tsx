import React, { useState, useEffect } from 'react'
import styles from './Header.module.scss'
import GoodsSearch from './components/GoodsSearch/GoodsSearch'
import sideMenuIconSort from './assets/sideMenuIconSort.svg'
import sideMenuIconHuman from './assets/sideMenuIconHuman.svg'
import logo from './assets/Logo.svg'
import Image from 'next/image'
import FooterHeaderSelect from '../FooterHeaderSelect/FooterHeaderSelect'
import { categoriesArr } from './Header.config'
import cn from 'classnames'
import { PageType } from '../PageLayout/PageLayout.typings'
import instagramIcon from './assets/Instagram.png'
import Link from 'next/link'
import arrow from './assets/arrow.svg'
import MapModal from './components/MapModal/MapModal'
import Modal from 'react-modal'
import { motion, AnimatePresence } from 'framer-motion'


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
        zIndex:100,
    }
};

export default function Header({
    isMobile,
    pageType,
}: {
    isMobile: boolean,
    pageType: PageType,
}) {

    const [isModalOpen, setModalOpen] = useState<boolean>(false)
    const [isWindowScrolled, setWindowScrolled] = useState<boolean>(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setWindowScrolled(true)
            } else {
                setWindowScrolled(false)
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const openModal = () => {
        setModalOpen(true)
        document.body.style.overflow = 'hidden';
    }

    const closeModal = () => {
        setModalOpen(false)
    }

    const afterModalOpen = () => {
        console.log('modal open')
    }

    return (
        <header className={cn(styles.mainWrapper, pageType === PageType.main && !isWindowScrolled && !isMobile && styles.mainWrapperStartBackground)}>
            <Modal
                isOpen={isModalOpen}
                onAfterOpen={afterModalOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <MapModal />
            </Modal>
            <div className={styles.wrapper}>
                <div className={cn(styles.topBlock, pageType === PageType.main && !isWindowScrolled && !isMobile && styles.topBlockStartBackground)}>
                    <div className={styles.topLeftBlock}>
                        <div className={styles.hurryUp}>
                            <p>Как можно скорее</p>
                            <div className={styles.arrowContainer}>
                                <Image src={arrow} alt='arrow' fill />
                            </div>
                        </div>
                        <div className={styles.hurryUp} onClick={() => openModal()}>
                            <p>Укажите адрес доставки</p>
                            <div className={styles.arrowContainer}>
                                <Image src={arrow} alt='arrow' fill />
                            </div>
                        </div>
                    </div>
                    {
                        !isMobile &&
                        <div className={styles.logo}>
                            <Image src={logo} alt='logo' layout='fill' />
                        </div>
                    }
                    <div className={styles.topRightBlock}>
                        <GoodsSearch isMobile={isMobile} />
                        <div className={cn(styles.sideMenuButton, pageType === PageType.main && !isWindowScrolled && styles.sideMenuButtonStartBackground)}>
                            <div className={styles.sideMenuIconSortContainer}>
                                <Image src={sideMenuIconSort} alt='sortIcon' layout='fill' />
                            </div>
                            <div className={styles.sideMenuIconHumanContainer}>
                                <Image src={sideMenuIconHuman} alt='humanIcon' layout='fill' />
                            </div>
                        </div>
                    </div>
                </div>
                <AnimatePresence>
                    {
                        (!isWindowScrolled || isMobile) &&
                        <motion.div
                            className={cn(styles.bottomBlock, pageType === PageType.main && !isWindowScrolled && !isMobile && styles.bottomBlockStartBackground)}
                            initial={{translateY:-50, opacity:0, height:0}}
                            animate={{translateY:0, opacity:1, height:'auto'}}
                            transition={{ duration: 0.2, ease: 'easeInOut' }}
                            exit={{translateY:-50, opacity:0, height:0}}
                        >
                            <div className={styles.categories}>
                                {
                                    categoriesArr.map(category => {
                                        return (
                                            <div className={styles.category} key={category.id}>
                                                <div className={styles.categoryIcon}>
                                                    <Image src={category.icon} alt='category icon' layout='fill' />
                                                </div>
                                                <div className={cn(styles.categoryTitle)}>{category.title}</div>
                                            </div>
                                        )
                                    })
                                }
                                {
                                    pageType === PageType.main && !isMobile &&
                                    <Link href='#'>
                                        <div className={styles.instagramButton}>
                                            <div className={styles.instagramIconContainer}>
                                                <Image src={instagramIcon} alt='instagram' layout='fill' />
                                            </div>
                                            <p>Посмотреть Instagram</p>
                                        </div>
                                    </Link>
                                }
                            </div>
                            <div className={styles.bottomRightBlock}>
                                <FooterHeaderSelect
                                    isMobile={isMobile}
                                    type='currency'
                                    position='header'
                                />
                                <FooterHeaderSelect
                                    isMobile={isMobile}
                                    type='lang'
                                    position='header'
                                />

                            </div>
                        </motion.div>
                    }
                </AnimatePresence>
            </div>
        </header>
    )
}