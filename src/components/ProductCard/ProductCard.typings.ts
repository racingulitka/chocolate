import { StaticImageData } from "next/image";

export interface ProductCard{
    id:number,
    images:(string | StaticImageData)[],
    isFavourite:boolean,
    title:string,
    rating:number,
    reviewsNumber:number,
    oldPrice:number,
    currentPrice:number,
    dimensions?:[number, number],
    availableConfirm: Date,
}