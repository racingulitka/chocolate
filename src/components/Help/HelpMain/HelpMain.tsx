import React, { useState, useEffect } from 'react';
import styles from './HelpMain.module.scss';
import searchIcon from './assets/searchIcon.svg';
import Image from 'next/image';
import { HelpArr, HelpArticle, PopularQuestions } from './HelpMain.typings';
import cn from 'classnames';
import rateIcon from './assets/rateIcon.png'

export default function HelpMain({
    helpArr,
    setCurrent,
    activeChapter,
    popularQuestions,
}: {
    helpArr: HelpArr[],
    setCurrent: (id: number) => void,
    activeChapter: number,
    popularQuestions:PopularQuestions[],
}) {
    const [chapterTitle, setChapterTitle] = useState<string>('');
    const [articles, setArticles] = useState<HelpArticle[]>([]);
    const [activeArticle, setActiveArticle] = useState<number>(1);
    const [activeArticleTitle, setActiveArticleTitle] = useState<string>('');
    const [activeArticleText, setActiveArticleText] = useState<string>('')
    const [isLike, setLike] = useState<1 | 2 | null>(null)

    useEffect(() => {
        const selectedChapter = helpArr.find(item => item.id === activeChapter);
        setChapterTitle(selectedChapter?.chapterTitle || '');
        setArticles(selectedChapter?.articles || []);
    }, [activeChapter, helpArr]);

    useEffect(() => {
        const selectedArticle = articles.find(item => item.id === activeArticle);
        setActiveArticleTitle(selectedArticle?.articleTitle || '');
        setActiveArticleText(selectedArticle?.articleText || '')
    }, [activeArticle, articles]);

    const handleSelectChapter = (id: number) => {
        setCurrent(id)
        setActiveArticle(1)
    }

    const handleSelectArticle = (id: number) => setActiveArticle(id);

    const handleRate = (id: 1 | 2 | null) => {
        setLike(prev => (prev === id ? null : id));
    };

    useEffect(() => {
        console.log(isLike)
    }, [isLike])

    const handlePopular = (cId:number, aId:number) => {
        setCurrent(cId)
        setActiveArticle(aId)
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.searchBlock}>
                <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="Поиск по вопросам"
                />
                <div className={styles.searchIconContainer}>
                    <Image src={searchIcon} alt="icon" fill />
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.leftSide}>
                    {helpArr.map(chapter => (
                        <div className={styles.chapterBlock} key={chapter.id}>
                            <div
                                className={styles.chapterTitle}
                                onClick={() => handleSelectChapter(chapter.id)}
                            >
                                {chapter.chapterTitle}
                            </div>
                            <div className={styles.chapterArticles}>
                                {chapter.id === activeChapter && articles.map(article => (
                                    <div className={styles.articleBlock} key={article.id}>
                                        <div
                                            className={cn(
                                                styles.articleTitle,
                                                article.id === activeArticle && styles.articleTitleActive
                                            )}
                                            onClick={() => handleSelectArticle(article.id)}
                                        >
                                            {article.articleTitle}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.rightSide}>
                    <div className={styles.rightSideTitle}>{chapterTitle}</div>
                    <div className={styles.rightSideArticleTitle}>{activeArticleTitle}</div>
                    <div className={styles.rightSideArticleText}>{activeArticleText}</div>
                    <div className={styles.rateBlock}>
                        <div className={styles.question}>Вы нашли нужную информацию?</div>
                        <div className={styles.fingers}>
                            {
                                ([1, 2] as const).map((item: 1 | 2) => {
                                    return (
                                        <div className={styles.rate} key={item} onClick={() => handleRate(item)}>
                                            <div className={cn(styles.iconContainer, item === 2 && styles.iconContainerRotated)}>
                                                <Image
                                                    src={rateIcon}
                                                    alt='icon'
                                                    fill
                                                    className={cn(
                                                        item !== isLike && styles.icon,
                                                    )}/>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className={styles.splitter}></div>
                    <div className={styles.popularQuestions}>
                        <div className={styles.popularQuestionsTitle}>Популярные вопросы</div>
                        <div className={styles.pQuestions}>
                            {
                                popularQuestions.map(item => {
                                    const chapter = helpArr.find(chapt => chapt.id === item.chapterId)
                                    let article
                                    if(chapter){
                                        if(chapter.articles){
                                            article = chapter.articles.find(art => art.id === item.articleId)
                                        }
                                    }
                                    return(
                                        <div className={styles.pQuestion} key={item.id} onClick={() => handlePopular(item.chapterId, item.articleId)}>{article?.articleTitle}</div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
