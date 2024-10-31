import React, {useState, useEffect} from 'react'
import styles from './HelpMain.module.scss'
import searchIcon from './assets/searchIcon.svg'
import Image from 'next/image'
import { HelpArr, HelpArticle } from './HelpMain.typings'
import cn from 'classnames'

export default function HelpMain({
    helpArr,
    setCurrent,
    activeChapter,
}:{
    helpArr:HelpArr[],
    setCurrent:(id:number) => void,
    activeChapter:number,
}){

    const [activeArticle, setActiveArticle] = useState<number>(1)
    const [articles, setArticles] = useState<HelpArticle[] | null>(null)

    const handleSelectChapter = (id:number) => {
        setCurrent(id)
    }
    const handleSelectArticle = (id:number) => {
        setActiveArticle(id)
    }
    
    useEffect(() => {
        const articles = helpArr.find(item => item.id === activeChapter)?.articles
        if(articles){
            setArticles(articles)
        } else{
            setArticles(null)
        }
    }, [activeChapter])

    return(
        <div className={styles.wrapper}>
            <div className={styles.searchBlock}>
                <input
                    type="text"
                    className={styles.searchInput}
                    placeholder='Поиск по вопросам'
                />
                <div className={styles.searchIconContainer}>
                    <Image src={searchIcon} alt='icon' fill />
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.leftSide}>
                    {
                        helpArr.map(chapter => {
                            return(
                                <div className={styles.chapterBlock} key={chapter.id}>
                                    <div
                                        className={styles.chapterTitle}
                                        onClick={() => handleSelectChapter(chapter.id)}
                                    >
                                        {chapter.chapterTitle}
                                        </div>
                                    <div className={styles.chapterArticles}>
                                        {
                                            chapter.id === activeChapter && articles &&
                                            articles.map(article => {
                                                return(
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
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className={styles.rightSide}>

                </div>
            </div>
        </div>
    )
}