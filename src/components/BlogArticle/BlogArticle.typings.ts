import { StaticImageData } from "next/image";

export interface BlogArticle{
    id:number,
    date:Date,
    authorName:string,
    authorAvatar:StaticImageData,
    viewsCount:number,
    title:string,
    
}