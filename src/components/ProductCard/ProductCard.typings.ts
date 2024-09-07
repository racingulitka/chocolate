import { StaticImageData } from "next/image";

export interface ProductCard{
    id:number,
    image:StaticImageData,
    isFavourite:boolean,
    title:string,
    rating:number,
    reviewsNumber:number,
    oldPrice:number,
    currentPrice:number,
}