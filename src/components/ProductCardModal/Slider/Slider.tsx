import React, { useState, useRef, useEffect } from 'react';
import styles from './Slider.module.scss';
import Image, { StaticImageData } from 'next/image';
//import arrowLeft from './assets/arrowLeft.svg';
import xIcon from './assets/xIcon.svg';
import yIcon from './assets/yIcon.svg';

export default function Slider({
    images,
    dimensions,
    fullScreen,
}: {
    images: (string | StaticImageData)[],
    dimensions: [number, number] | null,
    fullScreen:boolean,
}) {
    const mainImageWidth = fullScreen ? 542+18 : 520;
    const [mainImageShift, setMainImageShift] = useState<number>(0);
    const [startX, setStartX] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [translateX, setTranslateX] = useState<number>(0);
    const heroRef = useRef<HTMLDivElement | null>(null);

    // Для прокрутки блока с иконками
    const iconsRef = useRef<HTMLDivElement | null>(null);
    const [startIconsX, setStartIconsX] = useState<number | null>(null);
    const [scrollLeft, setScrollLeft] = useState<number>(0);
    const [isIconsDragging, setIsIconsDragging] = useState<boolean>(false);

    const onSlideLeft = () => {
        if (mainImageShift > 0) {
            setMainImageShift(prev => prev - 1);
        }
    };

    const onSlideRight = () => {
        if (mainImageShift < images.length - 1) {
            setMainImageShift(prev => prev + 1);
        }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        setStartX(e.clientX);
        setIsDragging(true);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || startX === null) return;

        const currentX = e.clientX;
        const diffX = currentX - startX;
        setTranslateX(diffX);
    };

    const handleMouseUp = (e: React.MouseEvent) => {
        if (startX !== null) {
            const diffX = e.clientX - startX;
            if (diffX > 50) {
                onSlideLeft();
            } else if (diffX < -50) {
                onSlideRight();
            }
        }
        setIsDragging(false);
        setTranslateX(0);
        setStartX(null);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setStartX(e.touches[0].clientX);
        setIsDragging(true);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging || startX === null) return;
        const diffX = e.touches[0].clientX - startX;
        setTranslateX(diffX);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (startX !== null) {
            const diffX = e.changedTouches[0].clientX - startX;
            if (diffX > 50) {
                onSlideLeft();
            } else if (diffX < -50) {
                onSlideRight();
            }
        }
        setIsDragging(false);
        setTranslateX(0);
        setStartX(null);
    };

    // Обработчики для свайпа блока иконок
    const handleIconsMouseDown = (e: React.MouseEvent) => {
        setStartIconsX(e.clientX);
        setScrollLeft(iconsRef.current?.scrollLeft || 0);
        setIsIconsDragging(true);
    };

    const handleIconsMouseMove = (e: React.MouseEvent) => {
        if (!isIconsDragging || !startIconsX || !iconsRef.current) return;

        const currentX = e.clientX;
        const diffX = currentX - startIconsX;
        iconsRef.current.scrollLeft = scrollLeft - diffX;
    };

    const handleIconsMouseUp = () => {
        setIsIconsDragging(false);
        setStartIconsX(null);
    };

    const handleIconsTouchStart = (e: React.TouchEvent) => {
        setStartIconsX(e.touches[0].clientX);
        setScrollLeft(iconsRef.current?.scrollLeft || 0);
        setIsIconsDragging(true);
    };

    const handleIconsTouchMove = (e: React.TouchEvent) => {
        if (!isIconsDragging || !startIconsX || !iconsRef.current) return;

        const diffX = e.touches[0].clientX - startIconsX;
        iconsRef.current.scrollLeft = scrollLeft - diffX;
    };

    const handleIconsTouchEnd = () => {
        setIsIconsDragging(false);
        setStartIconsX(null);
    };

    // Глобальные обработчики для сброса скролла, если курсор покидает окно или отпускается мышь
    useEffect(() => {
        const handleMouseUpGlobal = () => {
            if (isIconsDragging) {
                setIsIconsDragging(false);
                setStartIconsX(null);
            }
        };

        window.addEventListener('mouseup', handleMouseUpGlobal);
        window.addEventListener('mouseleave', handleMouseUpGlobal);

        return () => {
            window.removeEventListener('mouseup', handleMouseUpGlobal);
            window.removeEventListener('mouseleave', handleMouseUpGlobal);
        };
    }, [isIconsDragging]);

    return (
        <div className={styles.wrapper} style={{width:fullScreen ? 542 : 502}}>
            <div
                className={styles.heroBlock}
                style={{height:fullScreen ? 542 : 502, borderRadius:fullScreen ? '15px' : 0}}
                ref={heroRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onDragStart={(e) => e.preventDefault()}
            >
                {
                    images.map((mainImage, index) => {
                        const left = (index - mainImageShift) * mainImageWidth + translateX;
                        return (
                            <div
                                className={styles.mainImageContainer}
                                key={index}
                                style={{
                                    left: `${left}px`,
                                    transition: isDragging ? 'none' : '0.5s',
                                }}
                            >
                                {
                                    typeof (mainImage) === 'string' ?
                                        <video width={fullScreen ? '542' : '502'} controls={false} autoPlay loop>
                                            <source src={mainImage} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                        :
                                        <Image src={mainImage} alt='main image' fill />
                                }
                            </div>
                        );
                    })
                }
                {
                    dimensions &&
                    <div className={styles.dimensions}>
                        {
                            ['x', 'y'].map(dimension => (
                                <div className={styles.dimensionBlock} key={dimension}>
                                    <div className={styles.dImageContainer}>
                                        <Image src={dimension === 'x' ? xIcon : yIcon} alt='dimension' />
                                    </div>
                                    <p className={styles.dText}>{dimension === 'x' ? dimensions[0] : dimensions[1]} см.</p>
                                </div>
                            ))
                        }
                    </div>
                }
            </div>
            <div
                className={styles.slideIconsBlock}
                ref={iconsRef}
                onMouseDown={handleIconsMouseDown}
                onMouseMove={handleIconsMouseMove}
                onMouseUp={handleIconsMouseUp}
                onTouchStart={handleIconsTouchStart}
                onTouchMove={handleIconsTouchMove}
                onTouchEnd={handleIconsTouchEnd}
                onDragStart={(e) => e.preventDefault()}
            >
                <div className={styles.icons}>
                    {
                        images.map((icon, index) => (
                            <div className={styles.iconContainer} key={index} onClick={() => setMainImageShift(index)}>
                                {/* <Image src={icon} alt='icon' fill /> */}
                                {
                                    typeof (icon) === 'string' ?
                                        <video width="70" controls={false}>
                                            <source src={icon} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                        :
                                        <Image src={icon} alt='main image' fill />
                                }
                                {
                                    index !== mainImageShift &&
                                    <div className={styles.filter}></div>
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
