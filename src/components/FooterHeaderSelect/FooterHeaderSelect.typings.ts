import { StaticImageData } from "next/image"

export interface Props{
    isMobile:boolean,
    type: 'currency' | 'lang',
    position:'footer' | 'header',
}

export interface LangArr{
    id:number,
    short:string,
    icon:StaticImageData,
    title:string,
}
export interface CurrencyArr{
    id:number,
    title:string,
}