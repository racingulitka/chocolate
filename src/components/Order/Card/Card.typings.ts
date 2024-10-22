import { StaticImageData } from "next/image";

export interface CardType{
    id:number,
    image:StaticImageData,
    title:string,
    price?:number,
}