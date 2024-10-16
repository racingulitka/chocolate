import React, {useState} from 'react'
import styles from './AccountMenu.module.scss'
import { motion } from 'framer-motion'
import cross from './assets/cross.svg'
import Image from 'next/image'
import { authnorizedArr, unauthnorizedArr } from './AccountMenu.config'
import Modal from 'react-modal'
import Profile from './components/Profile/Profile'
import { Account } from './AccountMenu.typings'
import { useRouter } from 'next/router'

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

export default function AccountMenu({
    onClose,
}: {
    onClose: React.Dispatch<React.SetStateAction<boolean>>,
}) {

    const router = useRouter()

    const [isAuthnorized] = useState<Account | null>({
        name:'Alexandr',
        email:'alex@mail.ru',
        phone:'+7 999 999-99-99'
    })

    // const [isAuthnorized] = useState<Account | null>(null)

    const [isModalOpen, setModalOpen] = useState<boolean>(false)

    const closeModal = () => {
        setModalOpen(false)
        document.body.style.overflow = 'unset'
    }

    const afterModalOpen = () => {
        console.log('modal open')
    }

    const handleMenuSelect = (menuItem:number) => {
        switch (menuItem) {
            case 1:{
                setModalOpen(true)
                document.body.style.overflow = 'hidden';
                break
            }
            case 4:{
                router.push('/account/moi-sobitiya')
                break
            }
            case 6:{
                router.push('/account/upravlenie-rassilkami')
                break
            }
        }
    }

    return (
        <motion.div
            className={styles.wrapper}
            initial={{ translate: '100%' }}
            animate={{ translate: 0 }}
            exit={{ translate: '100%' }}
        >
            <Modal
                isOpen={isModalOpen}
                onAfterOpen={afterModalOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <Profile
                    avatar={isAuthnorized?.avatar ? isAuthnorized?.avatar : null}
                    name={isAuthnorized ? isAuthnorized.name : ''}
                    email={isAuthnorized ? isAuthnorized.email : ''}
                    phone={isAuthnorized ? isAuthnorized.phone : ''}
                />
            </Modal>
            <div
                className={styles.cross}
                onClick={() => onClose(false)}
            >
                <Image src={cross} alt='exit' fill />
            </div>
            <div className={styles.mainBlock}>
                {
                    (isAuthnorized ? authnorizedArr : unauthnorizedArr).map(item => {
                        return (
                            <div
                                className={styles.menuItem}
                                key={item.id}
                                onClick={() => handleMenuSelect(item.id)}
                            >
                                <div className={styles.iconContainer}>
                                    <item.icon />
                                </div>
                                <div className={styles.menuItemText}>
                                    {item.title}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </motion.div>
    )
}