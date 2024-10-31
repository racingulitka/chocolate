export interface HelpArticle{
    id:number,
    articleTitle:string,
}

export interface HelpArr{
    id:number,
    chapterTitle:string,
    articles?:HelpArticle[],
}