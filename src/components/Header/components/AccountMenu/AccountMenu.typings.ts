import { StaticImageData } from "next/image";

export interface Account{
    avatar?:StaticImageData,
    name:string,
    email:string,
    phone:string,
}