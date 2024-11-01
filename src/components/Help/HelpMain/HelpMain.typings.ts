export interface HelpArticle{
    id:number,
    articleTitle:string,
    articleText?:string,
}

export interface HelpArr{
    id:number,
    chapterTitle:string,
    articles?:HelpArticle[],
}

export interface PopularQuestions{
    id:number,
    chapterId:number,
    articleId:number,
}