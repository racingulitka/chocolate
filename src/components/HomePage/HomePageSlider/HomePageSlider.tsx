import React, { useRef, useLayoutEffect, useEffect, useState } from 'react'
import styles from './HomePageSlider.module.scss'
import ProductCard from '@/components/ProductCard/ProductCard'
import exampleCardImage from '../assets/exampleCardImage.png'
import { sliderArr } from './HomePageSlider.config'
import Image from 'next/image'
import arrowRight from './assets/ArrowRight.svg'

export default function HomePageSlider({
    isMobile,
}: {
    isMobile: boolean,
}) {

    const sliderBodyRef = useRef<HTMLDivElement | null>(null)
    const [slideWidth, setSlideWidth] = useState<number | null>(null);
    const [sliderShift, setSliderShift] = useState<number>(0)
    const [stopShift, setStopShift] = useState<number | null>(null)

    useEffect(() => {
        const calculateSlideWidth = () => {
            if (sliderBodyRef.current) {
                const sliderWidth = sliderBodyRef.current.offsetWidth;
                const calculatedWidth = sliderWidth / (isMobile ? 3 : 5) - 10 * (isMobile ? 2 : 4) / (isMobile ? 3 : 5); // Примерное деление на 3 or 5 слайдов
                setSlideWidth(calculatedWidth);
            }
        };

        calculateSlideWidth();

        window.addEventListener('resize', calculateSlideWidth);

        return () => {
            window.removeEventListener('resize', calculateSlideWidth);
        };
    }, []);

    const slideLeft = () => {
        if (slideWidth && sliderShift < 0) setSliderShift(prev => prev + slideWidth + 10)
    }

    const slideRight = () => {
        if (slideWidth) {
            const numberOfSlides = sliderArr.length
            const overflowSlides = numberOfSlides - 5
            const stopShift = overflowSlides * (slideWidth + 10)
            setStopShift(stopShift)
            if (stopShift * -1 < sliderShift) {
                setSliderShift(prev => prev - slideWidth - 10)
            }
        }
    }

    return (
        <div className={styles.mainWrapper}>
            <div className={styles.wrapper}>
                <h1>Клубника в шоколаде в<span> Усть-Каменогорске</span></h1>
                <div className={styles.sliderWrapper} ref={sliderBodyRef} style={{overflowX:isMobile ? 'scroll' : 'visible'}}>
                    <div className={styles.sliderBody} style={{ height: `${slideWidth}px`, width:isMobile ? 'fit-content' : '100%' }}>
                        {
                            sliderArr.map((slide, index) => {
                                const slideOffset = slideWidth ?? 0
                                const gap = index ? 10 * index : 0
                                return (
                                    <div
                                        className={styles.slide}
                                        key={slide.id}
                                        style={{
                                            width: `${slideWidth}px`,
                                            height: `${slideWidth}px`,
                                            left: isMobile? '0px' : `${index * slideOffset + gap + sliderShift}px`,
                                            transition: '0.5s ease-in-out',
                                            position:isMobile ? 'relative' : 'absolute'
                                        }}>
                                        <Image src={slide.image} alt='slide image' fill />
                                    </div>
                                )
                            })
                        }
                    </div>
                    {
                        !isMobile &&
                        <div className={styles.slideButton} style={{ left: '0px', translate: '-50% -50%', rotate: '180deg', opacity: sliderShift >= 0 ? '0.1' : '1' }} onClick={() => slideLeft()}>
                            <Image src={arrowRight} alt='arrowLeft' width={25} />
                        </div>
                    }
                    {
                        !isMobile &&
                        <div className={styles.slideButton} style={{ right: '0px', translate: '50% -50%', opacity: stopShift === null ? '1' : stopShift * -1 < sliderShift ? '1' : '0.1' }} onClick={() => slideRight()}>
                            <Image src={arrowRight} alt='arrow right' width={25} />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}