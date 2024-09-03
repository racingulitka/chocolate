import { StaticImageData } from "next/image";

export interface Props{
    image:StaticImageData,
    isFavourite:boolean,
    title:string,
    rating:number,
    reviewsNumber:number,
    oldPrice:number,
    currentPrice:number,
}