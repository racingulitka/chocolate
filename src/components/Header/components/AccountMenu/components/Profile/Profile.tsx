import React, { useState, useEffect } from 'react'
import styles from './Profile.module.scss'
import { StaticImageData } from 'next/image'
import Image from 'next/image'
import cameraIcon from './assets/cameraIcon.svg'
import { phoneMask } from '@/utils/phoneMask'

interface ProfileData {
    avatar: StaticImageData | null,
    name: string,
    email: string,
    phone: string,
}

export default function Profile({
    avatar,
    name,
    email,
    phone,
}: {
    avatar: StaticImageData | null,
    name: string,
    email: string,
    phone: string,
}) {

    const [profileData, setProfileData] = useState<ProfileData>({
        avatar,
        name,
        email,
        phone,
    })

    const handleSave = () => {
        console.log(profileData)
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        setProfileData(prev => ({ ...prev, name: value }))
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        setProfileData(prev => ({ ...prev, email: value }))
        if (emailRegex.test(value)) {
            console.log("Корректный email")
        } else {
            console.log("Введите корректный email")
        }
    }

    const handlePhoneChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        setProfileData(prev => ({...prev, phone:phoneMask(value)}))
    }

    useEffect(() => {
        console.log(profileData)
    }, [profileData])

    return (
        <div className={styles.wrapper}>
            <div className={styles.avatarContainer}>
                {
                    avatar ?
                        <Image src={avatar} alt='avatar' objectFit='cover' />
                        :
                        <div className={styles.withoutAvatar}>
                            <div className={styles.cameraContainer}>
                                <Image src={cameraIcon} alt='camera' fill />
                            </div>
                            Добавить фото
                        </div>
                }
            </div>
            <input
                type="text"
                className={styles.input}
                value={profileData.name}
                onChange={(e) => handleNameChange(e)}
            />
            <input
                type="text"
                className={styles.input}
                value={profileData.email}
                onChange={(e) => handleEmailChange(e)}
            />
            <input
                type="text"
                className={styles.input}
                value={profileData.phone}
            />
            <button
                className={styles.button}
                onSubmit={() => handleSave()}
            >
                Сохранить
            </button>
            <div
                className={styles.exit}
                onClick={() => console.log('exit')}
            >
                Выйти из аккаунта
            </div>
        </div>
    )
}